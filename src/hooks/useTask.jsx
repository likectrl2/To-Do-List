import { useState } from "react";
import _ from "lodash";

function useTask() {
    const [tasks, setTasks] = useState([]);

    function Task(name_, description, importance = 0, urgency = 0) {
    this.name_ = name_;
    this.id = Date.now();
    this.description = description;
    this.isCompleted = false;
    this.importance = importance;
    this.urgency = urgency;
}

    function addTask(name_, description) {
        setTasks(tasks.concat([new Task(name_, description)]));
    }

    function deleteTask(id) {
        setTasks(tasks => tasks.filter(task => task.id !== id));
    }

    function changeTaskCompleted(id) {
        setTasks(tasks => tasks.map(task => {
            return(task.id === id ? {...task, isCompleted: !task.isCompleted} : task)
        }))
    }

    return [tasks, addTask, deleteTask, changeTaskCompleted];
}

export default useTask;