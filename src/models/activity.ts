export type ActivityId = string;

export interface Activity {
  id: ActivityId;
  name: string;
  description?: string;
  category?: string;
  /** ISO date string "2025-08-10" */
  date: string;
  durationMinutes: number;
}

export interface ActivityInput {
  name: string;
  description?: string;
  category?: string;
  date: string;
  durationMinutes: number;
}
