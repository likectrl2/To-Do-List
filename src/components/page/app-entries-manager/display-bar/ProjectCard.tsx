import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppContext } from "../../../../context/AppEntriesContext"
import type { Project, Task } from "../../../../types"
import styles from "./ProjectCard.module.css"
import TaskCard from "./TaskCard"
import { faList } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Checkbox from "../../../common/Checkbox";

export default function ProjectCard({className, displayData, self}: {className: string, displayData: Task[], self: Project}) {
    const { toggleEntryCompletion } = useAppContext();
    const [ expend, setExpend ] = useState(true);

    function toggleExpend() {
        setExpend(!expend);
    }

    return (
        <div
            className={`${className} ${styles.projectCard}`}
        >
            <div className={styles.level1}>
                <Checkbox
                    className={styles.checkbox}
                    type="checkbox"
                    onClick={() => toggleEntryCompletion(self.id, "Project")}
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
                    <FontAwesomeIcon icon={faList}/>
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
                                            className={styles.taskCard}
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