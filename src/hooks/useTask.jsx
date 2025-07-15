import { useState } from "react";
import _ from "lodash";

function useTask() {
    const [tasks, setTasks] = useState([]);

    function Task(name_, description, importance = 5, urgency = 5) {
        this.name_ = name_;
        this.id = Date.now();
        this.description = description;
        this.isCompleted = false;
        this.importance = importance;
        this.urgency = urgency;
    }

    function addTask(name_) {
        setTasks(tasks.concat([new Task(name_)]));
    }

    function deleteTask(id) {
        setTasks(tasks => tasks.filter(task => task.id !== id));
    }

    function changeTaskCompleted(id) {
        setTasks(tasks => tasks.map(task => {
            return(task.id === id ? {...task, isCompleted: !task.isCompleted} : task)
        }))
    }

    function changeTaskDescription(id, description) {
        setTasks(tasks => tasks.map(task => {
            return(task.id === id ? {...task, description: description} : task)
        }))
    }

    function setUrgency(id, urgency) {
        setTasks(tasks => tasks.map(task => {
            return(task.id === id ? {...task, urgency: urgency} : task)
        }))
    }
    function setImportance(id, importance) {
        setTasks(tasks => tasks.map(task => {
            return(task.id === id ? {...task, importance: importance} : task)
        }))
    }

    return [tasks, addTask, deleteTask, changeTaskCompleted, changeTaskDescription, setUrgency, setImportance];
}

export default useTask;