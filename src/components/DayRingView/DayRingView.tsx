import React, { useMemo } from "react";
import { useActivities } from "../../context/ActivityContext";
import ActivityRing, { RingItem } from "../ActivityRing/ActivityRing";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function DayRingView() {
  const { state } = useActivities();
  const selectedDate = todayISO();

  const items: RingItem[] = useMemo(() => {
    return state.items
      .filter((a) => a.date === selectedDate)
      .map((a) => ({
        id: a.id,
        label: a.category?.trim() ? `${a.name} (${a.category})` : a.name,
        minutes: a.durationMinutes,
      }));
  }, [state.items, selectedDate]);

  return (
    <div
      style={{
        display: "grid",
        justifyItems: "center",
        paddingBottom: 24, // bottom spacing here
      }}
    >
      <ActivityRing
        items={items}
        goalMinutes={420}
        title={`Activities • ${selectedDate}`}
      />
    </div>
  );
}
