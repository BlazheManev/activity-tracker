import React from "react";
import ActivityForm from "./components/ActivityForm/ActivityForm";
import ActivityList from "./components/ActivityList/ActivityList";

function App() {
  return (
    <div style={{ maxWidth: 980, margin: "40px auto", padding: 16 }}>
      <header style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Activity Tracker</h1>
        <p style={{ color: "#6b7280", margin: "4px 0 0" }}>
          Track your free-time activities with a simple form and list.
        </p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 16 }}>
        <ActivityForm />
        <ActivityList />
      </div>
    </div>
  );
}

export default App;
