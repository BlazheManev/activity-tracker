import React, { useMemo, useState } from "react";
import { useActivities } from "../../context/ActivityContext";
import ActivityItem from "../ActivityItem/ActivityItem";
import styles from "./ActivityList.module.css";

export default function ActivityList() {
    const { state } = useActivities();
    const [query, setQuery] = useState("");

    const filtered = useMemo(() => {
        const q = query.toLowerCase();
        const byDate = state.items.filter((a) => a.date === state.selectedDate);
        if (!q) return byDate;
        return byDate.filter((a) =>
            [a.name, a.description ?? "", a.category ?? ""]
                .join(" ")
                .toLowerCase()
                .includes(q)
        );
    }, [state.items, query, state.selectedDate]);

    if (state.loading) return <p>Loading…</p>;
    if (filtered.length === 0) return (
        <div className={styles.empty}>
            <input
                className={styles.search}
                placeholder="Search activities…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <p>No activities found.</p>
        </div>
    );

    return (
        <div className={styles.wrap}>
            <div className={styles.toolbar}>
                <input
                    className={styles.search}
                    placeholder="Search activities…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <span className={styles.count}>{filtered.length} items</span>
            </div>
            <div className={styles.list}>
                {filtered.map((it) => (
                    <ActivityItem key={it.id} item={it} />
                ))}
            </div>
        </div>
    );
}
