import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../css/Toolbar.module.css"
import { useTasks } from "../contexts/TaskContext"

function Toolbar({className, toolItems, searchInput, handleChange}) {
  const { addTask } = useTasks();

  return (
    <div className={`${className} ${styles.toolbar}`}
    >
      <FontAwesomeIcon className={styles.sortTask} key={toolItems[1].id} icon={toolItems[1].icon} />
      <input
        type="text"
        className={styles.sortByTitle}
        placeholder="输入以筛选"
        value={searchInput}
        onChange={e => handleChange(e.target.value)}
      />
      <FontAwesomeIcon 
        className={styles.addTask}
        key={toolItems[0].id}
        icon={toolItems[0].icon}
        onClick={addTask}
      />
    </div>
  )
}

export default Toolbar;