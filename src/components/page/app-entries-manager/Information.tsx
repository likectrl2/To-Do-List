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

    const projectOfEntry = () => {
        if(entryToShow.type === "Task")
        {
            return projects.find(p => p.id === entryToShow.projectId);
        }
        return null;
    }

    if(entryToShow.type === 'Task') return (
        <div className={`${className} ${styles.container}`}>
            <div className={styles.level1}>
                <Checkbox
                    className={styles.checkbox}
                    checked={entryToShow.status === 'completed'}
                />
                <div className={styles.titleFrame}>
                    {
                        entryToShow.status === 'completed' ||
                            <div className={styles.status}>{entryToShow.status}</div>
                    }
                    <input
                        type="text"
                        className={styles.title}
                        value={entryToShow.title}
                    />
                    <div className={styles.createdAt}>
                        {Date.call(entryToShow.createdAt)}
                    </div>
                </div>
                <div
                    className={styles.projectOfEntry}
                >
                    {
                        projectOfEntry()?.title || '未指定'
                    }
                </div>
            </div>
            <textarea
                    className={styles.description}
                    defaultValue={entryToShow.description} 
            />
            <div
                className={styles.level3}
            >
                <div
                    className={styles.timeArea}
                >
                </div>
                <div
                    className={styles.level3Right}
                >
                    <div
                        className={styles.level3RightUp}
                    >
                        <div className={styles.tagContextFrame}>
                            {
                                entryToShow.context.map(
                                    c => {
                                        return (
                                            <div
                                                className={styles.tagContext}
                                                key={c}
                                            >
                                                {c}
                                            </div>
                                        )
                                    }
                                )
                            }
                        </div>
                        <div 
                            className={styles.tagContextFrame}
                        >
                            {
                                entryToShow.tags.map(
                                    c => {
                                        return (
                                            <div
                                                className={styles.tagContext}
                                                key={c}
                                            >
                                                {c}
                                            </div>
                                        )
                                    }
                                )
                            }
                        </div>
                    </div>
                    <div
                        className={styles.level3RightBottom}
                    >
                        <div className={styles.urgencyImportance} />
                        <div className={styles.otherInforArea}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}