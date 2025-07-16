import styles from "../css/TaskContainer.module.css"
import TaskCard from './TaskCard.jsx'

function TaskContainer({className, tasks}) {
    return (
        <div className={`${className} ${styles.taskContainer}`}
        >
            {
                tasks.map(
                    task => {
                        return (
                            <TaskCard className={styles.taskCard} key={task.id} task={task}/>
                        )
                    }
                )
            }
        </div>
    )
}

export default TaskContainer;