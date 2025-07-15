import InputChatFrame from './InputChatFrame'
import TaskView from './TaskView'
import TaskManage from './TaskManage';

function Page({ page, tasks, deleteTask, onSubmit, changeTaskCompleted, changeTaskDescription, setUrgency, setImportance}) {
  const pageList = [
    (
      <div>  {/*小组件容器*/}
        <TaskView 
          tasks={tasks}
          deleteTask={deleteTask}
          changeTaskCompleted={changeTaskCompleted}
        /> {/*任务总览框*/}
        <InputChatFrame onSubmit={onSubmit} />  {/*输入框*/}
      </div>
    ),
    (
      <div>
        <TaskManage 
          tasks={tasks} 
          changeTaskCompleted={changeTaskCompleted} 
          changeTaskDescription={changeTaskDescription}
          setUrgency={setUrgency}
          setImportance={setImportance}
        />
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