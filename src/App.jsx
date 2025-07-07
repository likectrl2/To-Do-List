import { useState } from 'react';
import './App.css';

import Sidebar from './components/Sidebar.jsx';
import Page from './components/Page.jsx';

function App() {
  const [page, setPage] = useState(0);
  const [tasks, setTasks] = useState([]);

  const pageIcon = [
    "https://media.prts.wiki/3/3b/%E8%83%BD%E5%A4%A9%E4%BD%BF%E7%B2%BE%E4%BA%8C%E7%AB%8B%E7%BB%98A.png",
    "https://media.prts.wiki/0/0a/%E7%AB%8B%E7%BB%98_%E6%98%9F%E7%86%8A_2.png"
  ]

  function handleInputText(inputText) {
    const newTask = { name_: inputText, id: Date.now() };
    setTasks(tasks => [...tasks, newTask]);
  }

  function onSubmit(inputText) {
    handleInputText(inputText);
  }

  function deleteTask(id) {
    setTasks(tasks => tasks.filter(task => task.id !== id));
  }

  return (
    <div className='app'>
      <Sidebar pageIcon={pageIcon} setPage={setPage} />  {/*左导航栏*/}
      <Page page={page} tasks={tasks} deleteTask={deleteTask} onSubmit={onSubmit}/>  {/*页面*/}
    </div>
  )
}



export default App;