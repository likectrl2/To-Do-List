import styles from "../css/TaskView.module.css"
import Toolsbar from './Toolbar.jsx'
import TaskContainer from './TaskContainer.jsx'
import { TOOL_ITEMS } from "../config/tool.js"

function TaskView({className}) {
  return (
    <div className={`${className} ${styles.taskView}`}>
      <Toolsbar className={styles.toolsbar} toolItems={TOOL_ITEMS}/>
      <TaskContainer className={styles.taskContainer}/>
    </div>
  )
}

export default TaskView;