import styles from "../css/TaskInformation.module.css"

function TaskInformation({className, focusTask}) {
  return (
    <div className={`${className} ${styles.taskInformation}`}
    >
      {focusTask && <div>{focusTask.id}</div>}
    </div>
  )
}

export default TaskInformation;