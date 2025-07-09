import InputChatFrame from './InputChatFrame'
import TaskView from './TaskView'
import TaskManageView from './TaskMangeView';

function Page({ page, tasks, deleteTask, onSubmit, changeTaskCompletion}) {
  const pageList = [
    (
      <div>  {/*小组件容器*/}
        <TaskView tasks={tasks} deleteTask={deleteTask} changeTaskCompletion={changeTaskCompletion} /> {/*任务总览框*/}
        <InputChatFrame onSubmit={onSubmit} />  {/*输入框*/}
      </div>
    ),
    (
      <div>
        <TaskManageView tasks={tasks} changeTaskCompletion={changeTaskCompletion} ></TaskManageView>
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