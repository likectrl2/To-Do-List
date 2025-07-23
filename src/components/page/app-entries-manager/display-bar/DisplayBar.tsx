import { useEffect, useState } from "react";
import { useAppContext } from "../../../../contexts/AppEntriesContext";
import styles from "./DisplayBar.module.css";
import Toolbar from "./Toolbar";
import type { ProjectWithTask, Task } from "../../../../types";
import CardDisplay from "./CardDisplay";

export default function DisplayBar({ className, focusToolSet }: { className: string, focusToolSet: [string, React.Dispatch<React.SetStateAction<string>>] }) {
    const { entries } = useAppContext();

    const tasks = entries.tasks;
    const projects = entries.projects;

    const [displayData, setDisplayData] = useState<{ projectsWithTasks: ProjectWithTask[], unassignedTasks: Task[] }>({
        projectsWithTasks: [],
        unassignedTasks: []
    });

    useEffect(() => {
        const tasksCopy = [...tasks];

        const tasksMap = new Map<string, Task>();
        tasksCopy.forEach(task => tasksMap.set(task.id, task));

        const projectsWithTasks: ProjectWithTask[] = projects.map(project => {
            const childTasks = project.taskIds
                .map(taskId => tasksMap.get(taskId))
                .filter((task): task is Task => !!task);

            return {
                ...project,
                tasks: childTasks,
            };
        });

        const unassignedTasks = tasksCopy.filter(task => !task.projectId);

        setDisplayData({
            projectsWithTasks,
            unassignedTasks
        });
    }, [tasks, projects]);

    return (
        <div
            className={`${className} ${styles.displayBar}`}
        >
            <Toolbar 
                className={styles.toolbar}
                setFocusEntryId={focusToolSet[1]}
            />
            <CardDisplay
                className={styles.cardDisplay}
                displayData={displayData}
                focusToolSet={focusToolSet}
            />
        </div>
    );
}