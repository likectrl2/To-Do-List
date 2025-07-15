import { useState } from "react";
import _ from "lodash";
import {v4 as uuidv4} from "uuid";


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
        if (!options || typeof options.title !== 'string' || options.title.trim() === '') {  //检查是否有title
            console.error("addTask requires an object with a 'title' property.");
            return;
        }

        const defaults = {  //任务的默认值
            description: '',
            isCompleted: false,
            schedule: null,
            environment: null,
            isCollaborative: false,
            type: 'default',
            taskStatus: "active",
            deadline: null,
            importance: 5,
            urgency: 5,
            createdAt: Date.now(),
        };

        const newTask = {
            ...defaults,      
            ...options,       
            id: uuidv4(),      
            title: options.title.trim(),
        };

        setTasks(prevTasks => [...prevTasks, newTask]);
    }

    function deleteTask(id) {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }

    function setTaskStatus(id, newStatus) {
        if (['active', 'completed', 'canceled'].includes(newStatus)) {
            const updates = { 
                status: newStatus,
                completedAt: newStatus === 'completed' ? Date.now() : null 
            };
            updateTask(id, updates);
        } else {
            console.warn(`Invalid status: ${newStatus}`);
        }
    }

    function changeDescription(id, description) {
        updateTask(id, { description: description });
    }

    function changeSchedule(id, schedule) {
        // 这里 schedule 应该是一个符合我们约定的对象或 null
        updateTask(id, { schedule: schedule });
    }


    function changeDeadline(id, deadline) {
        // deadline 可以是一个时间戳，或者 null
        updateTask(id, { deadline: deadline });
    }

    function changeImportance(id, importance) {
        // 可以加一些范围校验
        if (importance >= 1 && importance <= 10) {
            updateTask(id, { importance: importance });
        }
    }

    function changeUrgency(id, urgency) {
        if (urgency >= 1 && urgency <= 10) {
            updateTask(id, { urgency: urgency });
        }
    }

    function changeType(id, type) {
        updateTask(id, { type: type });
    }

    return {
            tasks,
            addTask,
            deleteTask,
            setTaskStatus,
            changeDescription,
            changeSchedule,
            changeDeadline,
            changeImportance,
            changeUrgency,
            changeType,
        };
}

export default useTask;