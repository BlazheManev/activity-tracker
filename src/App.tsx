import React from "react";
import { useActivities } from "./context/ActivityContext";

function App() {
  const { state, addActivity, clearAll } = useActivities();

  const addDemo = async () => {
    const today = new Date().toISOString().slice(0, 10);
    await addActivity({
      name: "Reading",
      description: "Read 20 pages",
      category: "Books",
      date: today,
      durationMinutes: 30,
    });
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 16 }}>
      <h1>Activity Tracker (mock data)</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={addDemo}>Add demo activity</button>
        <button onClick={clearAll}>Clear all</button>
      </div>

      {state.loading && <p>Loading…</p>}
      {state.error && <p style={{ color: "red" }}>{state.error}</p>}

      {!state.loading && state.items.length === 0 && <p>No activities yet.</p>}

      <ul>
        {state.items.map((a) => (
          <li key={a.id}>
            <strong>{a.name}</strong> — {a.date} — {a.durationMinutes} min
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
