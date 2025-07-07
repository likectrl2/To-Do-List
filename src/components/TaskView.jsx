function TaskView({tasks, deleteTask}) {
  return (
    <div className='task-view'>
      {tasks.map(singleTask => (
        <div className='task-card' key={singleTask.id}>
          <div>{singleTask.name_}</div>
          <button className='task-delete' onClick={() => deleteTask(singleTask.id)}>删除任务</button>
        </div>
      ))}
    </div>
  )
}

export default TaskView;