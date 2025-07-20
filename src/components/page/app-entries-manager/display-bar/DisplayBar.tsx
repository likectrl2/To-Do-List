/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef } from "react";
import { useAppContext } from "../../../../contexts/AppEntriesContext"
import styles from "./DisplayBar.module.css"
import Toolbar from "./Toolbar"
import type { ProjectWithTask, Task } from "../../../../types";
import CardDisplay from "./CardDisplay";

export default function DisplayBar({className, focusToolSet}
    : {className: string, focusToolSet: [string, React.Dispatch<React.SetStateAction<string>>]}) {
        const { tasks, projects, addProject, addTask, updateTask } = useAppContext();

        
        const initialized = useRef(false);
        useEffect(() => {
            if (tasks.length === 0 && projects.length === 0 && !initialized.current) {
                initialized.current = true; 

                const project1 = addProject({ 
                    title: "欧洲旅行计划",
                    description: "为期12天的意大利深度游,专注于罗马和佛罗伦萨。"
                });

                const task1 = addTask({ 
                    title: "预定往返罗马的机票",
                    projectId: project1.id,
                    importance: 5,
                    urgency: 5,
                });

                const task2 = addTask({
                    title: "研究并预定佛罗伦萨的住宿",
                    projectId: project1.id,
                    description: "优先考虑靠近市中心的青旅或Airbnb。",
                    urgency: 4,
                });

                const project2 = addProject({ title: "D.W.Y.L. App开发" });
                const task3 = addTask({
                    title: "完成数据核心层的重构",
                    projectId: project2.id,
                });

                const task4 = addTask({ title: "去健身房完成一次腿部训练" });
                
                updateTask(task1.id, { description: "已更新：优先考虑阿联酋航空。" });
            }
        }, [
            tasks, 
            projects,
            addProject, 
            addTask, 
            updateTask
        ]);


        function associateTasksWithProjects() {
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

            console.log("--- Data Association Debug ---");
    console.log("Projects with their tasks:", projectsWithTasks);
    console.log("Unassigned tasks ONLY:", unassignedTasks);
    const allRenderedTaskIds = [
        ...projectsWithTasks.flatMap(p => p.tasks.map(t => t.id)),
        ...unassignedTasks.map(t => t.id)
    ];
    const uniqueTaskIds = new Set(allRenderedTaskIds);
    if (allRenderedTaskIds.length !== uniqueTaskIds.size) {
        console.error("💥💥💥 BUG DETECTED: Task duplication is happening HERE in data processing!");
    } else {
        console.log("✅ Data processing is correct. No duplicates found.");
    }

            return { projectsWithTasks, unassignedTasks };
        }


        return (
            <div
                className={`${className} ${styles.displayBar}`}
            >
                <Toolbar className={styles.toolbar}/>
                <CardDisplay 
                    className={styles.cardDisplay}
                    displayData={associateTasksWithProjects()} 
                    focusToolSet={focusToolSet}
                />
            </div>
        )
}