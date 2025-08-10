import React from "react";
import { Activity } from "../../models/activity";
import { useActivities } from "../../context/ActivityContext";
import styles from "./ActivityItem.module.css";

type Props = { item: Activity };

export default function ActivityItem({ item }: Props) {
  const { deleteActivity } = useActivities();

  return (
    <div className={styles.card}>
      <div className={styles.main}>
        <div className={styles.titleRow}>
          <strong className={styles.name}>{item.name}</strong>
          <span className={styles.meta}>
            {item.date} • {item.durationMinutes} min
          </span>
        </div>
        {item.description && <p className={styles.desc}>{item.description}</p>}
      </div>

      <div className={styles.side}>
        {item.category && <span className={styles.badge}>{item.category}</span>}
        <button className={styles.danger} onClick={() => deleteActivity(item.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
