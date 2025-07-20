import { useState } from 'react'
import style from './App.module.css'
import Page from './components/page/Page'
import Sidebar from './components/sidebar/Sidebar'

function App() {
  const [focusPage, setFocusPage] = useState(0);

  return (
    <div className={style.app}>
      <Sidebar className={style.sidebar} focusPage={focusPage} handleClick={setFocusPage}/>
      <Page className={style.page} focusPage={focusPage}/>
    </div>
  )
}

export default App