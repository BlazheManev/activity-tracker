import { Activity, ActivityId, ActivityInput } from "../models/activity";
import { API_BASE_URL } from "../config";

async function http<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText}${msg ? ` - ${msg}` : ""}`);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export async function list(date?: string): Promise<Activity[]> {
  const url = new URL(`${API_BASE_URL}/api/activities`);
  if (date) url.searchParams.set("date", date);
  return http<Activity[]>(url.toString());
}

export async function create(input: ActivityInput): Promise<Activity> {
  return http<Activity>(`${API_BASE_URL}/api/activities`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function update(
  id: ActivityId,
  changes: Partial<ActivityInput>
): Promise<Activity> {
  return http<Activity>(`${API_BASE_URL}/api/activities/${id}`, {
    method: "PUT",
    body: JSON.stringify(changes),
  });
}

export async function remove(id: ActivityId): Promise<void> {
  await http<void>(`${API_BASE_URL}/api/activities/${id}`, {
    method: "DELETE",
  });
}


export async function clear(): Promise<void> {
  const items = await list();
  await Promise.all(items.map((a) => remove(a.id)));
}

export const activityService = { list, create, update, remove, clear };
