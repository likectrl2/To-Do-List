/* eslint-disable react-hooks/exhaustive-deps */
import {useState} from "react";

function TaskManage({tasks, changeTaskCompleted, changeTaskDescription, setUrgency, setImportance}) {
    const [focus, setFocus] = useState(-1);

    function changeDescription(e, singleTask) {
        changeTaskDescription(singleTask.id, e.currentTarget.value);
        e.currentTarget.style.height = 'auto';
        e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
    }

    function handlePoint(e, singleTask) {
        const rect = e.currentTarget.getBoundingClientRect();
        const urgency = Math.round((e.clientX - rect.left)/rect.width * 10);
        const importance = Math.round((rect.bottom - e.clientY)/rect.height * 10);
        setUrgency(singleTask.id, urgency);
        setImportance(singleTask.id, importance);
        console.log("urgency: " + urgency + "\nimportance: " + importance);
    }

    return (
        <div className='task-manage'>
            <div className='task-manage-view'>
                {
                    tasks.map(singleTask => {
                        return (
                            <div 
                                className={`task-card${singleTask.isCompleted ? '-completed' : ''}`}
                                key={singleTask.id}
                                onClick={() => {setFocus(singleTask.id);}}
                            >
                                <input
                                    type='checkbox'
                                    className='task-change-completion'
                                    onChange={() => changeTaskCompleted(singleTask.id)}
                                    checked={singleTask.isCompleted}
                                />
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
                                    <textarea
                                        className="task-description"
                                        onChange={(e) => changeDescription(e, singleTask)}
                                        
                                        placeholder="任务描述"
                                        value={singleTask.description}
                                    />
                                    <div className="task-urgency-importance" onClick={(e) => handlePoint(e, singleTask)}>
                                        <div className='x-axis'></div>
                                        <div className='y-axis'></div>
                                        <div 
                                            className='task-point' 
                                            style={{ 
                                                left: `${singleTask.urgency * 10}%`, 
                                                bottom: `${singleTask.importance * 10}%`
                                            }}
                                        />
                                    </div>
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