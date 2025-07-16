import styles from "../css/TaskContainer.module.css"
import TaskCard from './TaskCard.jsx'
import { useTasks } from "../contexts/TaskContext.jsx";

function TaskContainer({className, changeFocus, focusTaskId}) {
  const { tasks } = useTasks();

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