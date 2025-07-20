import style from './App.module.css'
import Page from './components/Page'
import Sidebar from './components/sidebar/Sidebar'

function App() {

  return (
    <div className={style.app}>
      <Sidebar className={style.sidebar}/>
      <Page className={style.page}/>
    </div>
  )
}

export default App