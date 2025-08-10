import React from "react";
import ActivityForm from "./components/ActivityForm/ActivityForm";
import ActivityList from "./components/ActivityList/ActivityList";
import DayRingView from "./components/DayRingView/DayRingView";
import DateFilter from "./components/DateFilter/DateFilter";

function App() {
  return (
    <div className="container">
      <header style={{ marginBottom: 18 }}>
        <h1 style={{ margin: 0, fontSize: "1.6rem" }}>Activity Tracker</h1>
        <p style={{ color: "var(--muted)", margin: "6px 0 0" }}>
          Log your activities and keep an eye on your time.
        </p>
         <DateFilter />
      </header>

      {/* Top: make the ring the hero */}
      <section
        style={{
          display: "grid",
          justifyItems: "center",
          marginBottom: 32, // just margin here
        }}
      >
        <DayRingView />
      </section>

      {/* Below: form + list */}
      <main className="grid" style={{ alignItems: "start" }}>
        <aside style={{ display: "grid", gap: 16 }}>
          <ActivityForm />
        </aside>

        <section>
          <ActivityList />
        </section>
      </main>
    </div>
  );
}

export default App;
