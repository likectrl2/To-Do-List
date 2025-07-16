import styles from '../css/Page.module.css'
import Dashboard from './DashBoard';
import TaskManager from './TaskManager';

function Page({className, currentPage}) {
  let content;

  switch(currentPage) {
    case 0:
      content = <Dashboard className={styles.pageContent}/>;
      break;
    case 1:
      content = <TaskManager className={styles.pageContent}/>;
      break;
    default:
      content = <div>Page not found.</div>;
  }
  
  return (
    <div className={`${className} ${styles.page}`}>
      {content}
    </div>
  )
}

export default Page;