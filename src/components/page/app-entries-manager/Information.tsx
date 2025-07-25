import { useEffect, useState } from "react";
import { useAppContext } from "../../../contexts/AppEntriesContext";
import type { AppEntry } from "../../../types";
import Checkbox from '../../common/Checkbox';
import styles from "./Information.module.css"

export default function Information({ className, focusEntryId }: { className: string, focusEntryId: string | null }) {
    const { entries, deleteEntry, toggleStatus, changeEntry, changeRelation } = useAppContext();
    const [projectsOpen, setProjectsOpen] = useState(false)

    const toggleProjectsOpen = () => {
        setProjectsOpen(!projectsOpen)
    }

    const tasks = entries.tasks;
    const projects = entries.projects;

    const show: AppEntry | undefined = tasks.find(t => t.id === focusEntryId) || projects.find(p => p.id === focusEntryId);

    useEffect(
        () => {
            setProjectsOpen(false)
        }, [show]
    )

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
                    onChange={(e) => changeEntry(show.id, { title: e.target.value })}
                >
                </input>
                { show.type === "Task" && <div className={styles.line}/> }
                {
                    show.type === "Task" && 
                    <div
                        className={`${styles.belongProject} ${projectsOpen ? styles.isOpen : ''}`}
                        onClick={toggleProjectsOpen}
                    >
                        {show.projectId ? projects.find(p => p.id === show.projectId)!.title : "未指定"}
                        {
                            projectsOpen && 
                            <div 
                                className={styles.projectsFrame}
                            >
                                <div
                                    className={styles.projectToBeChose}
                                    key={null}
                                    onClick={() => { changeRelation(show.id, null) }}
                                >
                                    未指定
                                </div>
                                {
                                    projects.map(
                                        p => {
                                            return (
                                                <div
                                                    className={styles.projectToBeChose}
                                                    key={p.id}
                                                    onClick={() => { changeRelation(show.id, p.id) }}
                                                >
                                                    {p.title}
                                                </div>
                                            )
                                        }
                                    )
                                }
                            </div>
                        }
                    </div>
                       
                }
            </section>
            <textarea 
                className={styles.description}
                onChange={(e) => changeEntry(show.id, { description: e.target.value })}
                value={show.description}
                placeholder="输入任务描述"
            />
            <button className={styles.deleteButton} onClick={() => deleteEntry(show.id)}>Delete</button>
        </div>
    )
}