import './App.css';
import { useState } from 'react';
import { useRef } from 'react';

function App() {
  var [page, setPage] = useState(0);

  function handleInputText(inputText) {
      console.log(inputText)
  }

  function onSubmit(inputText) {
      handleInputText(inputText);
  }

  const pageList = [
    (<div className='page'>
          <InputChatFrame onSubmit={onSubmit} />  {/*输入框*/}
          <div>  {/*小组件容器*/}
            <TaskView className='task-view' /> {/*任务总览框*/}
          </div>
    </div>)
  ] 

  return (
    <div className='background'>
      <div>
        <Sidebar setPage={setPage}/>  {/*导航边栏*/}
        {pageList[page]}
      </div>
    </div>
  )
}

function InputChatFrame({onSubmit}) {
  var inputRef = useRef(null);

  function handleClick() {
    if (inputRef.current.value.trim() !== '') {
        onSubmit(inputRef.current.value);
        inputRef.current.value = '';
    }
  }

  return (
    <div className='input-chat-frame'>
      <textarea 
        name="input" 
        id="input"
        ref={inputRef}
      >
      </textarea>
      <button onClick={handleClick}>{'>'}</button>
    </div>
  )
}

function Sidebar({setPage}) {
  const pageIcon = [
    "https://media.prts.wiki/3/3b/%E8%83%BD%E5%A4%A9%E4%BD%BF%E7%B2%BE%E4%BA%8C%E7%AB%8B%E7%BB%98A.png",
    "https://media.prts.wiki/0/0a/%E7%AB%8B%E7%BB%98_%E6%98%9F%E7%86%8A_2.png"
  ]

  return(
    <div className='sidebar'>
      <div>
        <img onClick={() => setPage(0)} src={pageIcon[0]} alt="概览" /><br />
        <img onClick={() => setPage(1)} src={pageIcon[1]} alt="任务安排" /><br />
      </div>
    </div>
  )
}

function TaskView() {

}


export default App