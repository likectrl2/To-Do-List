import styles from "../css/TaskCardr.module.css"

function TaskCard({className, task}) {
    return (
        <div className={`${className} ${styles.taskCard}`}>
            <div className={styles.title}>{task.title}</div>
        </div>
    )
}

export default TaskCard;