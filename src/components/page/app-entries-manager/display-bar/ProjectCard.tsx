import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Project, Task } from "../../../../types"
import styles from "./ProjectCard.module.css"
import TaskCard from "./TaskCard"
import Checkbox from "../../../common/Checkbox";
import { faBars, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useAppContext } from "../../../../contexts/AppEntriesContext";


export default function ProjectCard({className, displayData, self, focusToolSet}
    : {className: string, displayData: Task[], self: Project, focusToolSet: [string, React.Dispatch<React.SetStateAction<string>>]}) {
        const [ expend, setExpend ] = useState(true);
        const [focusEntryId, setFocusEntryId] = focusToolSet;
        const { toggleStatus, isProjectDone } = useAppContext();

        function toggleExpend() {
            setExpend(!expend);
        }

        return (
            <div
                className={`${className} ${styles.projectCard} ${self.status === "completed" ? styles.completed : ''} ${focusEntryId === self.id ? styles.focus : ''}`}
                onClick={() => setFocusEntryId(self.id)}
            >
                <div className={styles.level1}>
                    <Checkbox
                        className={styles.checkbox}
                        type="checkbox"
                        checked={self.status === 'completed'}
                        onClick={() => isProjectDone(self.id) && toggleStatus(self.id)}
                        title="项目只能在所有任务完成后完成"
                    />
                    <p className={styles.title}>
                        {self.title}
                    </p>
                </div>
                <div className={styles.level2}>
                    <div
                        className={styles.expendButton}
                        onClick={e => {
                            e.stopPropagation();
                            toggleExpend();
                        }}
                    >
                        {
                            expend ? <FontAwesomeIcon icon={faBars}/> : <FontAwesomeIcon icon={faCaretUp}/> 
                        }
                    </div>
                </div>
                {
                    !expend &&
                        <div className={styles.level3}>
                            {
                                displayData.map(
                                    t => {
                                        return (
                                            <TaskCard
                                                className={`${styles.taskCard}`}
                                                isInProject={true}
                                                key={t.id}
                                                displayData={t}
                                                focusToolSet={focusToolSet}
                                            />
                                        )
                                    }
                                )
                            }
                        </div>
                }
            </div>
        )
}