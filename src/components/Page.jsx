import styles from '../css/Page.module.css'
import Dashboard from './DashBoard';
import TaskManager from './TaskManager';

function Page({className, currentPage}) {
  let content;

  switch(currentPage) {
    case 0:
      content = <Dashboard />;
      break;
    case 1:
      content = <TaskManager />;
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