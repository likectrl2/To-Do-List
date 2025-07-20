import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Project, Task } from "../../../../types"
import styles from "./ProjectCard.module.css"
import TaskCard from "./TaskCard"
import Checkbox from "../../../common/Checkbox";
import { faBars, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


export default function ProjectCard({className, displayData, self}
    : {className: string, displayData: Task[], self: Project}) {
        const [ expend, setExpend ] = useState(true);

        function toggleExpend() {
            setExpend(!expend);
        }

        return (
            <div
                className={`${className} ${styles.projectCard} ${self.status === "completed" ? styles.completed : ''}`}
            >
                <div className={styles.level1}>
                    <Checkbox
                        className={styles.checkbox}
                        type="checkbox"
                        checked={self.status === 'completed'}
                        title="项目会在所有子任务完成后自动完成"
                    />
                    <input
                        type="text"
                        className={styles.title}
                        defaultValue={self.title}
                    />
                </div>
                <div className={styles.level2}>
                    <div
                        className={styles.expendButton}
                        onClick={toggleExpend}
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
                                                className={`${styles.taskCard} ${styles.bottomBorder}`}
                                                key={t.id}
                                                displayData={t}
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