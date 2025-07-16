import styles from "../css/TaskContainer.module.css"
import TaskCard from './TaskCard.jsx'

function TaskContainer({className, changeFocus, focusTaskId, tasks}) {
  return (
    <div className={`${className} ${styles.taskContainer}`}
      >
        {
          tasks.map(
            task => {
              return (
                <TaskCard className={styles.taskCard} key={task.id} task={task} changeFocus={changeFocus} focusTaskId={focusTaskId} />
              )
            }
          )
        }
    </div>
  )
}

export default TaskContainer;