import { useRef } from "react";
import { useAppContext } from "../../../contexts/AppEntriesContext";
import type { AppEntry } from "../../../types";
import Checkbox from '../../common/Checkbox';
import styles from "./Information.module.css"

export default function Information({ className, focusEntryId }: { className: string, focusEntryId: string | null }) {
    const { entries, deleteEntry, toggleStatus, changeEntry } = useAppContext();

    const tasks = entries.tasks;
    const projects = entries.projects;

    const show: AppEntry | undefined = tasks.find(t => t.id === focusEntryId) || projects.find(p => p.id === focusEntryId);

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    if(!show)
    {
        return (
            <div className={styles.emptyItem}>
                左侧选择以查看详细信息
            </div>
        )
    }

    return (
        <div className={`${className} ${styles.information}`}
        >
            <section className={styles.mainInfo}>
                <Checkbox 
                    className={styles.checkbox}
                    checked={show.status === 'completed'}
                    onChange={() => toggleStatus(show.id)}
                />
                <input
                    value={show.title}
                    className={styles.title}
                    ref={titleRef}
                    onChange={(e) => changeEntry(show.id, { title: e.target.value })}
                >
                </input>
                
            </section>
            <textarea 
                className={styles.description}
                ref={descriptionRef}
                onChange={(e) => changeEntry(show.id, { description: e.target.value })}
                value={show.description}
                placeholder="输入任务描述"
            />
            <button className={styles.deleteButton} onClick={() => deleteEntry(show.id)}>Delete</button>
        </div>
    )
}