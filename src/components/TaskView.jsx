import styles from "../css/TaskView.module.css"
import Toolsbar from './Toolbar.jsx'
import TaskContainer from './TaskContainer.jsx'
import { TOOL_ITEMS } from "../config/tool.js"
import { useState } from "react"
import { useTasks } from "../contexts/TaskContext.jsx"
import _ from 'lodash' 

function TaskView({className, changeFocus, focusTaskId}) {
  const { tasks } = useTasks();
  const [searchInput, setSearchInput] = useState();
  
  function sort(tasks, searchInput) {
    let filterTasks = _.cloneDeep(tasks);
    filterTasks = sortByText(filterTasks, searchInput);
    return filterTasks;
  }

  function sortByText(tasks, searchInput) {
    if (!searchInput) {
      return tasks;
    }
    else {
      const lowerCaseQuery = searchInput.toLowerCase();
      return tasks.filter(task =>
      task.title.toLowerCase().includes(lowerCaseQuery))
    }
  }

  const filterTasks = sort(tasks, searchInput);

  return (
    <div className={`${className} ${styles.taskView}`}>
      <Toolsbar
        className={styles.toolsbar}
        toolItems={TOOL_ITEMS}
        searchInput={searchInput}
        handleChange={setSearchInput}
      />
      <TaskContainer
        className={styles.taskContainer}
        changeFocus={changeFocus}
        focusTaskId={focusTaskId}
        tasks={filterTasks}
      />
    </div>
  )
}

export default TaskView;