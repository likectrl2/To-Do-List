function TaskView({tasks, deleteTask, changeTaskCompletion}) {
  return (
    <div className='task-view'>
      {tasks.map(singleTask => {
        if(singleTask.completion === false)
        {
          return (
            <div className='task-card' key={singleTask.id}>
              <input type='checkbox' className='task-change-completion' onClick={() => changeTaskCompletion(singleTask.id)}></input>
              <div className='task-name'>{singleTask.name_}</div>
              <button className='task-delete' onClick={() => deleteTask(singleTask.id)}>删除任务</button>
            </div>
          )
        }
      })}
    </div>
  )
}

export default TaskView;