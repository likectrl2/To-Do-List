import { useEffect, useState } from "react";
import { useAppContext } from "../../../../contexts/AppEntriesContext";
import styles from "./DisplayBar.module.css";
import Toolbar from "./Toolbar";
import type { ProjectWithTask, Task } from "../../../../types";
import CardDisplay from "./CardDisplay";
import { filterEntriesBySearch } from "../../../../hooks/useSearch";

export default function DisplayBar({ className, focusToolSet }: { className: string, focusToolSet: [string, React.Dispatch<React.SetStateAction<string>>] }) {
    const { entries } = useAppContext();
    const [search, setSearch] = useState("");

    const [displayData, setDisplayData] = useState<{ projectsWithTasks: ProjectWithTask[], unassignedTasks: Task[] }>({
        projectsWithTasks: [],
        unassignedTasks: []
    });

    

    useEffect(() => {
        const filter = filterEntriesBySearch(entries, search);
        const tasksCopy = filter.tasks;
        const projectsCopy = filter.projects;

        const tasksMap = new Map<string, Task>();
        tasksCopy.forEach(task => tasksMap.set(task.id, task));

        const projectsWithTasks: ProjectWithTask[] = projectsCopy.map(project => {
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
    }, [entries, search]);

    return (
        <div
            className={`${className} ${styles.displayBar}`}
        >
            <Toolbar 
                className={styles.toolbar}
                setFocusEntryId={focusToolSet[1]}
                onSearch={setSearch}
            />
            <CardDisplay
                className={styles.cardDisplay}
                displayData={displayData}
                focusToolSet={focusToolSet}
            />
        </div>
    );
}