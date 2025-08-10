// src/services/activityService.ts
import { Activity, ActivityId, ActivityInput } from "../model/activity";

const STORAGE_KEY = "activity-tracker:activities";

const uuid = () =>
  (window.crypto as any)?.randomUUID
    ? (window.crypto as any).randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36);

function load(): Activity[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Activity[]) : [];
  } catch {
    return [];
  }
}

function save(items: Activity[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

let db: Activity[] = load();

function sortByDateDesc(a: Activity, b: Activity) {
  return b.date.localeCompare(a.date);
}

export async function list(): Promise<Activity[]> {
  return [...db].sort(sortByDateDesc);
}

export async function create(input: ActivityInput): Promise<Activity> {
  const item: Activity = { id: uuid(), ...input };
  db = [...db, item];
  save(db);
  return item;
}

export async function update(
  id: ActivityId,
  changes: Partial<ActivityInput>
): Promise<Activity> {
  let updated!: Activity;
  db = db.map((it) => {
    if (it.id !== id) return it;
    updated = { ...it, ...changes };
    return updated;
  });
  save(db);
  return updated;
}

export async function remove(id: ActivityId): Promise<void> {
  db = db.filter((it) => it.id !== id);
  save(db);
}

export async function clear(): Promise<void> {
  db = [];
  save(db);
}

export const activityService = { list, create, update, remove, clear };
