import { useState } from "react";

function TaskManage({tasks, changeTaskCompleted}) {
    const [focus, setFocus] = useState(-1);

    return (
        <div className='task-manage'>
            <div className='task-manage-view'>
                {
                    tasks.map(singleTask => {
                        return (
                            <div className={`task-card${singleTask.isCompleted ? '-completed' : ''}`} key={singleTask.id} onClick={() => {setFocus(singleTask.id); console.log(singleTask.id)}}>
                                <input type='checkbox' className='task-change-completion' onClick={() => changeTaskCompleted(singleTask.id)} checked={singleTask.isCompleted}></input>
                                <div className='task-name'>{singleTask.name_}</div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='task-information'>
                {
                    tasks.map(singleTask => {
                        if(singleTask.id === focus) {
                            return (
                                <div key={singleTask.id}>
                                    <div>{singleTask.name_}</div>
                                    <div>{singleTask.description}</div>
                                    <input type='checkbox' className='task-change-completion' onClick={() => changeTaskCompleted(singleTask.id)} checked={singleTask.isCompleted}></input>
                                    <div></div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}

export default TaskManage;