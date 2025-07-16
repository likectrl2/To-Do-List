import styles from "../css/TaskManager.module.css"
import TaskView from "./TaskView.jsx";
import TaskInformation from "./TaskInformation.jsx"

function TaskManager({className}) {

    return (
        <div className={`${className} ${styles.taskManager}`}>
            <TaskView className={styles.taskView} />
            <TaskInformation className={styles.taskInformation} />
        </div>
    )
}

export default TaskManager;