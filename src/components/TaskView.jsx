function TaskView({tasks, deleteTask, changeTaskCompleted}) {
  return (
    <div className='task-view'>
      {tasks.map(singleTask => {
        if(singleTask.isCompleted === false){
          return (
            <div className='task-card' key={singleTask.id}>
              <input 
                type='checkbox'
                className='task-change-completion'
                onClick={() => changeTaskCompleted(singleTask.id)}
                checked={singleTask.isCompleted}
              />
              <div className='task-name'>
                {singleTask.name_}
              </div>
              <img 
                className='task-delete' 
                src="https://media.prts.wiki/b/b7/%E7%AB%8B%E7%BB%98_%E8%8E%AB%E6%96%AF%E6%8F%90%E9%A9%AC_skin2.png" 
                onClick={() => deleteTask(singleTask.id)} 
              />
            </div>
          )
        }
      })}
    </div>
  )
}

export default TaskView;