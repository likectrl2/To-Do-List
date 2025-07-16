import { useState } from "react";
import _ from "lodash";
import {v4 as uuidv4} from "uuid";

function extractNumberFromTitle(title) {
    const match = title.match(/^新建任务 \((\d+)\)$/);  // 正则表达式匹配“新建任务 (数字)”的模式
    if (match && match[1]) {
        return parseInt(match[1], 10); // 提取数字并转换为整数
    }
    return 0; // 如果不匹配或者没有数字，就认为是序号 0 (即没有括号的版本)
}

function useTask() {
    const [tasks, setTasks] = useState([]);

     const updateTask = (taskId, updates) => {  //用于改动特定id任务的辅助函数
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, ...updates } : task
            )
        );
    };

    function addTask(options) {
        const baseTitle = options && options.title ? options.title.trim() : '新建任务';  //默认title为新建任务(n)

        let finalTitle = baseTitle;

        if (baseTitle === '新建任务') {
            let maxNumber = 0;
            tasks.forEach(task => {
                if (task.title.startsWith('新建任务')) {
                    const currentNumber = extractNumberFromTitle(task.title);
                    if (currentNumber > maxNumber) {
                        maxNumber = currentNumber;
                    }
                }
            });
            if (maxNumber > 0 || tasks.some(task => task.title === '新建任务')) {
                finalTitle = `新建任务 (${maxNumber + 1})`;
            } else {
                finalTitle = '新建任务';
            }
        }

        if (finalTitle === '') { 
            console.error("Task title cannot be empty.");
            return;
        }

        const defaults = {  //任务的默认值
            description: '',
            importance: 5,
            urgency: 5,
            schedule: null,
            type: 'default',
            environment: [], // 默认为空数组
            isCollaborative: false,
            taskStatus: "active",
            completedAt: null,
            dependOn: [],
        };

        const newTask = {
            ...defaults,      
            ...options,       
            id: uuidv4(),     
            createdAt: Date.now(), 
            title: finalTitle,
        };

        setTasks(prevTasks => [...prevTasks, newTask]);
    }

    function deleteTask(id) {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }

    function setTaskStatus(id, newStatus) {
        if (['active', 'completed', 'canceled'].includes(newStatus)) {
            const updates = { 
                taskStatus: newStatus,
                completedAt: newStatus === 'completed' ? Date.now() : null 
            };
            updateTask(id, updates);
        } else {
            console.warn(`Invalid status: ${newStatus}`);
        }
    }

    const changeDescription = (taskId, description) => updateTask(taskId, { description });
    const changeImportance = (taskId, importance) => updateTask(taskId, { importance });
    const changeUrgency = (taskId, urgency) => updateTask(taskId, { urgency });
    const changeSchedule = (taskId, schedule) => updateTask(taskId, { schedule });
    const changeType = (taskId, type) => updateTask(taskId, { type });
    const changeEnvironment = (taskId, environment) => updateTask(taskId, { environment });
    const toggleCollaborative = (taskId) => {
        const taskToUpdate = tasks.find(task => task.id === taskId);
        if (taskToUpdate) {
            updateTask(taskId, { isCollaborative: !taskToUpdate.isCollaborative });
        }
    };

    return {
        tasks,
        addTask,
        deleteTask,
        setTaskStatus,
        changeDescription,
        changeImportance,
        changeUrgency,
        changeSchedule,
        changeType,
        changeEnvironment,
        toggleCollaborative,
        };
}

export default useTask;