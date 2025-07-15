import styles from './css/App.module.css';

import { useState } from 'react';

import Sidebar from './components/Sidebar';
import Page from './components/Page';

import { APP_NAV_ITEMS } from './config/navigation';

function App() {
  const [currentPage, setCurrentPage] = useState(APP_NAV_ITEMS[0].id);

  return (
    <div className={styles.app}>
      <Sidebar className={styles.sidebar} currentPage={currentPage} onClick={setCurrentPage} navItem={APP_NAV_ITEMS} />
      <Page className={styles.page} currentPage={currentPage} />
    </div>
  )
}

export default App;