import styles from "../css/TaskInformation.module.css"
import { STATUS_ITEMS } from "../config/taskStatus.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTasks } from "../contexts/TaskContext.jsx"

function TaskInformation({className, focusTask}) {
  const { setTaskStatus } = useTasks();

  if(!focusTask) return <div/>

  return (
    <div className={`${className} ${styles.taskInformation}`}
    >
      <div className={styles.taskStatusArea}>
        {
          Object.keys(STATUS_ITEMS).map(
            statusKey => {
              return (
                <button
                  className={`${styles.statusButton} ${focusTask.taskStatus === statusKey ? styles.isStatus : ''}`}
                  key={statusKey}
                  title={STATUS_ITEMS[statusKey].title}
                  onClick={() => setTaskStatus(focusTask.id, statusKey)}
                >
                  <FontAwesomeIcon icon={STATUS_ITEMS[statusKey].icon}/>
                </button>
              )
            }
          )
        }
      </div>
      <input className={styles.taskTitle} type="text"></input>
    </div>
  )
}

export default TaskInformation;