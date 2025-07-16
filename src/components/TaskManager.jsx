import styles from "../css/TaskManager.module.css"
import { useTasks } from "../contexts/TaskContext"
import TaskView from "./TaskView";

function TaskManager({className}) {
    const { tasks, addTask, deleteTask } = useTasks();

    return (
        <div className={`${className} ${styles.TaskManager}`}>
            <TaskView className={styles.taskView} tasks={tasks} addTask={addTask} deleteTask={deleteTask} />
        </div>
    )
}

export default TaskManager;