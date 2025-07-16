import styles from "../css/TaskInformation.module.css"

function TaskInformation({className}) {
  return (
    <div className={`${className} ${styles.taskInformation}`}
    >
      <div>Test</div>
    </div>
  )
}

export default TaskInformation;