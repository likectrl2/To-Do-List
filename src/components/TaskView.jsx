import styles from "../css/TaskView.module.css"
import Toolsbar from './Toolbar.jsx'
import TaskContainer from './TaskContainer.jsx'
import { TOOL_ITEMS } from "../config/tool.js"

function TaskView({className, changeFocus, focusTaskId}) {
  return (
    <div className={`${className} ${styles.taskView}`}>
      <Toolsbar className={styles.toolsbar} toolItems={TOOL_ITEMS}/>
      <TaskContainer className={styles.taskContainer} changeFocus={changeFocus} focusTaskId={focusTaskId}/>
    </div>
  )
}

export default TaskView;