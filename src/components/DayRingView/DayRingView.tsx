import React, { useMemo } from "react";
import { useActivities } from "../../context/ActivityContext";
import ActivityRing, { RingItem } from "../ActivityRing/ActivityRing";

export default function DayRingView() {
    const { state } = useActivities();
    const selectedDate = state.selectedDate;

    const items: RingItem[] = useMemo(() => {
        return state.items
            .filter((a) => a.date === selectedDate)
            .map((a) => ({
                id: a.id,
                label: a.category?.trim() ? `${a.name} (${a.category})` : a.name,
                minutes: a.durationMinutes,
            }));
    }, [state.items, selectedDate]);

    return (
        <div
            style={{
                display: "grid",
                justifyItems: "center",
                paddingBottom: 24,
            }}
        >
            <ActivityRing
                items={items}
                goalMinutes={420}
                title={`Activities • ${selectedDate}`}
            />
        </div>
    );
}
