import type { Task } from "../../types"
import Button from "../common/Button";
import InputCheckbox from "../common/InputCheckbox";
import InputText from "../common/InputText"
import TextArea from "../common/TextArea";
import styles from "./TaskInformationCard.module.css"

interface TaskCardProp {
    className: string;
    task: Task;
    onTitleChange: (newTitle: string) => void;
    onToggleCompletion: () => void;
    onDescriptionChange: (newDescription: string) => void;
    deleteTask: (taskIdToDelete: string) => void;
}

export default function TaskCard({className, task, onTitleChange, onToggleCompletion, onDescriptionChange, deleteTask}: TaskCardProp) {
    return (
        <div
            className={`${styles.frame} ${className}`}
        >
            <div className={styles.basicInformation}>
                <InputCheckbox                                  /*完成情况*/ 
                    className={styles.checkbox}
                    checked={task.isCompleted}
                    onChange={onToggleCompletion}
                />   
                <InputText                                      /*任务标题*/
                    className={styles.title}
                    value={task.title}
                    onChange={(e) => onTitleChange(e.target.value)}
                />
            </div>
            <TextArea                                           /*任务描述*/
                className={styles.description}
                value={task.description}
                onChange={(e) => onDescriptionChange(e.target.value)}
            />         
            <div
                className={styles.deleteButtonFrame}
            >
                <Button                                         /*删除任务*/
                    className={styles.deleteButton}
                    onClick={() => deleteTask(task.id)}
                    text="DELETE"
                />
            </div>
        </div>
    )
}