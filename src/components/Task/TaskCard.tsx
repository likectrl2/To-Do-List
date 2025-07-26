import type { Task } from "../../types"
import InputCheckbox from "../common/InputCheckbox";
import InputText from "../common/InputText"
import TextArea from "../common/TextArea";
import styles from "./TaskCard.module.css"

interface TaskCardProp {
    className: string;
    task: Task;
    onTitleChange: (newTitle: string) => void;
    onToggleCompletion: () => void;
    onDescriptionChange: (newDescription: string) => void;
}

export default function TaskCard({className, task, onTitleChange, onToggleCompletion, onDescriptionChange}: TaskCardProp) {
    return (
        <div
            className={`${styles.card} ${className}`}
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
        </div>
    )
}