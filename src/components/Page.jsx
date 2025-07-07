/* eslint-disable react-refresh/only-export-components */

import InputChatFrame from './InputChatFrame'
import TaskView from './TaskView'

function Page({ page, tasks, deleteTask, onSubmit }) {
  const pageList = [
    (
      <div>  {/*小组件容器*/}
        <TaskView tasks={tasks} deleteTask={deleteTask} /> {/*任务总览框*/}
        <InputChatFrame onSubmit={onSubmit} />  {/*输入框*/}
      </div>
    )
  ];

  return (
    <div className='page'>
      {pageList[page]}
    </div>
  );
}

export default Page;