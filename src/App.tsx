import { useState } from 'react'
import style from './App.module.css'
import Page from './components/Page'
import Sidebar from './components/sidebar/Sidebar'

function App() {
  const [focusPage, setFocusPage] = useState(0);

  return (
    <div className={style.app}>
      <Sidebar className={style.sidebar} focusPage={focusPage} handleClick={setFocusPage}/>
      <Page className={style.page}/>
    </div>
  )
}

export default App