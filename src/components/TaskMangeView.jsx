import { useState } from "react";
import TaskInformation from "./TaskInformation";

function TaskManageView({tasks, changeTaskCompletion}) {
    const [taskFocus, setTaskFocus] = useState(0);

    return (
        <div>
            <div className='task-manage-view'>
                <div className='task-manage-view-title'>
                    <img className='task-add' src="https://media.prts.wiki/4/4d/%E7%AB%8B%E7%BB%98_%E5%8F%B8%E9%9C%86%E6%83%8A%E8%9B%B0_2.png"></img>
                </div>
                {tasks.map(singleTask => (
                    <div className='task-card' key={singleTask.id} onClick={singleTask => setTaskFocus(singleTask.id)}>
                        <input type='checkbox' className='task-change-completion' onClick={() => changeTaskCompletion(singleTask.id)}></input>
                        <div className='task-name'>{singleTask.name_}</div>
                    </div>
                ))}
            </div> 
            <TaskInformation task={tasks.find(task => task.id === taskFocus)}/>
        </div>       
    )
}

export default TaskManageView;