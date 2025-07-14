/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from "react";

function TaskManage({tasks, changeTaskCompleted, changeTaskDescription}) {
    const [focus, setFocus] = useState(-1);

    const descriptionRef = useRef(null);

    function changeDescription(singleTask) {
        changeTaskDescription(singleTask.id, descriptionRef.current.value);
        descriptionRef.current.style.height = 'auto';
        descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
    }

    useEffect(() => {
        const focusTask = tasks.find(t => t.id === focus);
        if (descriptionRef.current && focusTask) {
            changeDescription(focusTask);
        }
    }, [focus, tasks]);

    return (
        <div className='task-manage'>
            <div className='task-manage-view'>
                {
                    tasks.map(singleTask => {
                        return (
                            <div className={`task-card${singleTask.isCompleted ? '-completed' : ''}`} key={singleTask.id} onClick={() => {setFocus(singleTask.id);}}>
                                <input type='checkbox' className='task-change-completion' onChange={() => changeTaskCompleted(singleTask.id)} checked={singleTask.isCompleted}></input>
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
                                    <div className="task-name">{singleTask.name_}</div>
                                    <textarea className="task-description" onChange={() => changeDescription(singleTask)} ref={descriptionRef} placeholder="任务描述" defaultValue={singleTask.description}/>
                                    <div className="task-urgency-importance" ></div>
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