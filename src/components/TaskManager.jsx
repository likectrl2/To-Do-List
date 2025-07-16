import styles from "../css/TaskManager.module.css"

import TaskView from "./TaskView";

function TaskManager({className}) {
    return (
        <div className={`${className} ${styles.TaskManager}`}>
            <TaskView className={styles.taskView} />
        </div>
    )
}

export default TaskManager;