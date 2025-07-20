/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useAppContext } from "../../../../contexts/AppEntriesContext"
import styles from "./DisplayBar.module.css"
import Toolbar from "./Toolbar"
import type { ProjectWithTask, Task } from "../../../../types";
import CardDisplay from "./CardDisplay";

export default function DisplayBar({className, focusToolSet}
    : {className: string, focusToolSet: [string, React.Dispatch<React.SetStateAction<string>>]}) {
        const { tasks, projects, addProject, addTask, updateTask } = useAppContext();

        
        const [isInitialized, setIsInitialized] = useState(false);
        useEffect(() => {
            if (tasks.length === 0 && projects.length === 0 && !isInitialized) {
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

                setIsInitialized(true);
            }
        }, [
            tasks, 
            projects, 
            isInitialized, 
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