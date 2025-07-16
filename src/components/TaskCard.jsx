import styles from "../css/TaskCard.module.css"

function TaskCard({className, task, changeFocus, focusTaskId}) {
    return (
        <div className={`${className} ${styles.taskCard} ${focusTaskId === task.id ? styles.focus : ''}`} onClick={() => changeFocus(task.id)}>
            <div className={styles.title}>{task.title}</div>
        </div>
    )
}

export default TaskCard;