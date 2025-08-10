import React from "react";
import ActivityForm from "./components/ActivityForm/ActivityForm";
import ActivityList from "./components/ActivityList/ActivityList";

function App() {
  return (
    <div className="container">
      <header style={{ marginBottom: 18 }}>
        <h1 style={{ margin: 0, fontSize: "1.6rem" }}>Activity Tracker</h1>
        <p style={{ color: "var(--muted)", margin: "6px 0 0" }}>
          Log your activities and keep an eye on your time.
        </p>
      </header>

      <div className="grid">
        <ActivityForm />
        <ActivityList />
      </div>
    </div>
  );
}

export default App;
