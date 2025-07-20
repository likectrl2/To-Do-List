import { useEffect, useState } from "react";
import { useAppContext } from "../../../../context/AppEntriesContext"
import styles from "./DisplayBar.module.css"
import Toolbar from "./Toolbar"
import type { ProjectWithTask, Task } from "../../../../types";
import CardDisplay from "./CardDisplay";

export default function DisplayBar({className, focusToolSet}
    : {className: string, focusToolSet: [string, React.Dispatch<React.SetStateAction<string>>]}) {
        const { tasks, projects, addProject, addTask, updateTask } = useAppContext();

        
        const [isInitialized, setIsInitialized] = useState(false);
        useEffect(() => {
            // 5. 设置执行条件：只有当数据为空，且从未初始化过时，才执行
            if (tasks.length === 0 && projects.length === 0 && !isInitialized) {
                
                console.log("🚀 Initializing test data...");

                // --- 开始创建我们的测试场景 ---

                // a. 创建一个项目
                const project1 = addProject({ 
                    title: "欧洲旅行计划",
                    description: "为期12天的意大利深度游，专注于罗马和佛罗伦萨。"
                });

                const task1 = addTask({ 
                    title: "预定往返罗马的机票",
                    projectId: project1.id, // 💥 直接使用上一步返回的project的id
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
                    status: 'completed', // 我们可以直接在创建时覆盖状态
                });

                const task4 = addTask({ title: "去健身房完成一次腿部训练" });
                
                updateTask(task1.id, { description: "已更新：优先考虑阿联酋航空。" });

                setIsInitialized(true);

                console.log("✅ Test data initialization complete.");
            }
        }, [
            // 7. 依赖项数组：把所有在effect内部用到的、来自外部的变量都放进来
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