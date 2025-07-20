import type { ProjectWithTask, Task } from "../../../../types"
import styles from "./CardDisplay.module.css"
import ProjectCard from "./ProjectCard"
import TaskCard from "./TaskCard"

export default function CardDisplay({className, displayData, focusToolSet}
    : {className: string, displayData: {projectsWithTasks: ProjectWithTask[], unassignedTasks: Task[]}, focusToolSet: [string, React.Dispatch<React.SetStateAction<string>>]}) {
        return (
            <div
                className={`${className} ${styles.cardDisplay}`}
            >
                {
                    displayData.projectsWithTasks.map(
                        p => {
                            return (
                                <ProjectCard
                                    className={styles.projectCard}
                                    key={p.id}
                                    self={p}
                                    displayData={p.tasks}
                                    focusToolSet={focusToolSet}
                                />
                            )
                        }
                    )
                }
                {
                    displayData.unassignedTasks.map(
                        t => {
                            return (
                                <TaskCard 
                                    className={styles.taskCard}
                                    key={t.id}
                                    displayData={t}
                                    focusToolSet={focusToolSet}
                                />
                            )
                        }
                    )
                }
            </div>
        )
}