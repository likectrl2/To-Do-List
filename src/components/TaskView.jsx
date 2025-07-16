import styles from "../css/TaskView.module.css"
import Toolsbar from './Toolbar.jsx'
import TaskContainer from './TaskContainer.jsx'
import { TOOL_ITEMS } from "../config/tool.js"

function TaskView({className, tasks, addTask}) {
  return (
    <div className={`${className} ${styles.taskView}`}>
      <Toolsbar className={styles.toolsbar} toolItems={TOOL_ITEMS} onClick={addTask}/>
      <TaskContainer className={styles.taskContainer} tasks={tasks}/>
    </div>
  )
}

export default TaskView;