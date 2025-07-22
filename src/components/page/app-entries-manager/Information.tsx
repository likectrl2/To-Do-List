import { useRef } from "react";
import { useAppContext } from "../../../contexts/AppEntriesContext";
import type { AppEntries, ProjectUpdateOption, TaskUpdateOption } from "../../../types";
import Checkbox from '../../common/Checkbox';
import styles from "./Information.module.css"

export default function Information({ className, focusEntryId }: { className: string, focusEntryId: string | null }) {
    const { tasks, projects, toggleEntryCompletion, updateProject, updateTask, deleteProject, deleteTask } = useAppContext();

    const show: AppEntries | undefined = tasks.find(t => t.id === focusEntryId) || projects.find(p => p.id === focusEntryId);

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    function deleteItem(show: AppEntries) {
        if(show.type === "Task") deleteTask(show.id);
        else deleteProject(show.id);
    }

    if(!show)
    {
        return (
            <div className={styles.emptyItem}>
                左侧选择以查看详细信息
            </div>
        )
    }

    const handleChange = (field: "title" | "description", value: string) => {
        const payload = { [field]: value } as TaskUpdateOption | ProjectUpdateOption;
        if (show.type === "Task") updateTask(show.id, payload);
        else updateProject(show.id, payload);
    };

    return (
        <div className={`${className} ${styles.information}`}
        >
            <section className={styles.mainInfo}>
                <Checkbox 
                    className={styles.checkbox}
                    checked={show.status === 'completed'}
                    onChange={() => toggleEntryCompletion(show.id)}
                />
                <input
                    value={show.title}
                    className={styles.title}
                    ref={titleRef}
                    onChange={(e) => handleChange("title", e.target.value)}
                >
                </input>
                
            </section>
            <textarea 
                className={styles.description}
                ref={descriptionRef}
                onChange={(e) => handleChange("description", e.target.value)}
                value={show.description}
                placeholder="输入任务描述"
            />
            <button className={styles.deleteButton} onClick={() => deleteItem(show)}>Delete</button>
        </div>
    )
}