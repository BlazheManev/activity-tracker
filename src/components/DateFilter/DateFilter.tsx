import React from "react";
import { useActivities } from "../../context/ActivityContext";
import styles from "./DateFilter.module.css";

export default function DateFilter() {
  const { state, setSelectedDate } = useActivities();

  return (
    <div className={styles.wrap}>
      <label>
        <span>Select Day:</span>
        <input
          type="date"
          value={state.selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </label>
    </div>
  );
}
