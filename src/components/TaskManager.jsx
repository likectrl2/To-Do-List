import styles from "../css/TaskManager.module.css"
import TaskView from "./TaskView.jsx";
import TaskInformation from "./TaskInformation.jsx"
import { useState } from "react";
import { useTasks } from "../contexts/TaskContext.jsx";

function TaskManager({className}) {
    const [focusTaskId, setFocusTaskId] = useState(null);
    const { tasks } = useTasks();

    const focusTask = tasks.find(task => task.id === focusTaskId);

    return (
        <div className={`${className} ${styles.taskManager}`}>
            <TaskView className={styles.taskView} changeFocus={setFocusTaskId} focusTaskId={focusTaskId}/>
            <TaskInformation className={styles.taskInformation} focusTask={focusTask}/>
        </div>
    )
}

export default TaskManager;