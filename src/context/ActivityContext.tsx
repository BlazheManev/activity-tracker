import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { activityService } from "../services/activityService";
import { Activity, ActivityId, ActivityInput } from "../models/activity";

type State = {
  items: Activity[];
  loading: boolean;
  error?: string;
  selectedDate: string;
};

type Ctx = {
  state: State;
  refresh: () => Promise<void>;
  addActivity: (input: ActivityInput) => Promise<Activity>;
  updateActivity: (id: ActivityId, changes: Partial<ActivityInput>) => Promise<Activity>;
  deleteActivity: (id: ActivityId) => Promise<void>;
  clearAll: () => Promise<void>;
  setSelectedDate: (date: string) => void;
};

const ActivityContext = createContext<Ctx | undefined>(undefined);

type Action =
  | { type: "SET_ITEMS"; payload: Activity[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload?: string };

function reducer(state: State, action: Action | { type: "SET_DATE"; payload: string }): State {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.payload, loading: false, error: undefined };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_DATE":
      return { ...state, selectedDate: action.payload };
    default:
      return state;
  }
}

export const ActivityProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    items: [],
    loading: true,
    selectedDate: new Date().toISOString().slice(0, 10), // today by default
  });

  const refresh = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const items = await activityService.list();
      dispatch({ type: "SET_ITEMS", payload: items });
    } catch (e: any) {
      dispatch({ type: "SET_ERROR", payload: e?.message ?? "Failed to load" });
    }
  }, []);

  const setSelectedDate = (date: string) => {
    dispatch({ type: "SET_DATE", payload: date });
  };

  const addActivity = useCallback(async (input: ActivityInput) => {
    const created = await activityService.create(input);
    await refresh();
    return created;
  }, [refresh]);

  const updateActivity = useCallback(
    async (id: ActivityId, changes: Partial<ActivityInput>) => {
      const upd = await activityService.update(id, changes);
      await refresh();
      return upd;
    },
    [refresh]
  );

  const deleteActivity = useCallback(async (id: ActivityId) => {
    await activityService.remove(id);
    await refresh();
  }, [refresh]);

  const clearAll = useCallback(async () => {
    await activityService.clear();
    await refresh();
  }, [refresh]);

  useEffect(() => {
    refresh();
  }, [refresh]);


  const value = useMemo<Ctx>(
    () => ({
      state,
      refresh,
      addActivity,
      updateActivity,
      deleteActivity,
      clearAll,
      setSelectedDate,
    }),
    [state, refresh, addActivity, updateActivity, deleteActivity, clearAll]
  );

  return <ActivityContext.Provider value={value}>{children}</ActivityContext.Provider>;
};

export function useActivities() {
  const ctx = useContext(ActivityContext);
  if (!ctx) throw new Error("useActivities must be used within ActivityProvider");
  return ctx;
}
