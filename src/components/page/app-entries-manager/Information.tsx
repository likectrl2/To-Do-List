import React from "react";
import { useAppContext } from "../../../contexts/AppEntriesContext";
import Checkbox from "../../common/Checkbox";
import styles from "./Information.module.css";

export default function Information({ className, focusEntryId }: { className: string, focusEntryId: string | null }) {
    const { tasks, projects } = useAppContext();

    const entryToShow = focusEntryId
        ? tasks.find(t => t.id === focusEntryId) || projects.find(p => p.id === focusEntryId)
            : null;

    if (!entryToShow) {
        return (
            <div className={`${className} ${styles.placeholder}`}>
                <p>请从左侧选择一个项目或任务以查看其详细信息。</p>
            </div>
        );
    }

    return (
        <div className={`${className}`}>
            <div className={styles.level1}>
                <Checkbox
                    className={styles.checkbox}
                    checked={entryToShow.status === 'completed'}
                    disabled={entryToShow.type === 'Project'}
                />
                <input
                    type="text"
                    className={styles.title}
                    value={entryToShow.title}
                />
            </div>
        </div>
    );
}