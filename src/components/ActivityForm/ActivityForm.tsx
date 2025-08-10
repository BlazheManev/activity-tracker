import React, { useMemo, useState } from "react";
import { useActivities } from "../../context/ActivityContext";
import { ActivityInput } from "../../models/activity";
import styles from "./ActivityForm.module.css";

const emptyForm = (): ActivityInput => ({
    name: "",
    description: "",
    category: "",
    date: new Date().toISOString().slice(0, 10),
    durationMinutes: 30,
});

export default function ActivityForm() {
    const { addActivity } = useActivities();
    const [form, setForm] = useState<ActivityInput>(emptyForm());
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const errors = useMemo(() => {
        const e: Partial<Record<keyof ActivityInput, string>> = {};
        if (!form.name.trim()) e.name = "Name is required.";
        if (!form.date) e.date = "Date is required.";
        if (!Number.isFinite(form.durationMinutes) || form.durationMinutes <= 0) {
            e.durationMinutes = "Duration must be a positive number.";
        }
        return e;
    }, [form]);

    const isValid = Object.keys(errors).length === 0;

    const hasError = (k: keyof ActivityInput) => touched[k] && errors[k];

    const onChange =
        (k: keyof ActivityInput) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                const v = e.target.value;
                setForm((prev) => ({
                    ...prev,
                    [k]: k === "durationMinutes" ? Number(v) : v,
                }));
            };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({
            name: true,
            date: true,
            durationMinutes: true,
            description: !!form.description,
            category: !!form.category,
        });
        if (!isValid) return;
        await addActivity(form);
        setForm(emptyForm());
        setTouched({});
    };

    return (
        <div style={{ paddingBottom: 24 }}>
            <form className={styles.form} onSubmit={onSubmit} noValidate>
                <h2 className={styles.title}>Add Activity</h2>

                <label className={styles.field}>
                    <span>Name *</span>
                    <input
                        type="text"
                        value={form.name}
                        onChange={onChange("name")}
                        onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                        aria-invalid={!!hasError("name")}
                    />
                    {hasError("name") && <em className={styles.error}>{errors.name}</em>}
                </label>

                <label className={styles.field}>
                    <span>Description</span>
                    <textarea
                        rows={3}
                        value={form.description}
                        onChange={onChange("description")}
                    />
                </label>

                <label className={styles.field}>
                    <span>Category</span>
                    <input
                        type="text"
                        value={form.category}
                        onChange={onChange("category")}
                    />
                </label>

                <div className={styles.row}>
                    <label className={styles.field}>
                        <span>Date *</span>
                        <input
                            type="date"
                            value={form.date}
                            onChange={onChange("date")}
                            onBlur={() => setTouched((t) => ({ ...t, date: true }))}
                            aria-invalid={!!hasError("date")}
                        />
                        {hasError("date") && (
                            <em className={styles.error}>{errors.date}</em>
                        )}
                    </label>

                    <label className={styles.field}>
                        <span>Duration (min) *</span>
                        <input
                            type="number"
                            min={1}
                            value={form.durationMinutes}
                            onChange={onChange("durationMinutes")}
                            onBlur={() =>
                                setTouched((t) => ({ ...t, durationMinutes: true }))
                            }
                            aria-invalid={!!hasError("durationMinutes")}
                        />
                        {hasError("durationMinutes") && (
                            <em className={styles.error}>{errors.durationMinutes}</em>
                        )}
                    </label>
                </div>

                <div className={styles.actions}>
                    <button
                        type="submit"
                        className={`${styles.btn} ${styles.primary}`}
                        disabled={!isValid}
                        aria-disabled={!isValid}
                    >
                        Add
                    </button>

                    <button
                        type="button"
                        className={`${styles.btn} ${styles.ghost}`}
                        onClick={() => {
                            setForm(emptyForm());
                            setTouched({});
                        }}
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
}
