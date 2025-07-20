import { useAppContext } from "../../../../contexts/AppEntriesContext"
import type { Task } from "../../../../types"
import Checkbox from "../../../common/Checkbox";
import styles from "./TaskCard.module.css"

export default function TaskCard({className, displayData, focusToolSet}
    : {className: string, displayData: Task, focusToolSet: [string, React.Dispatch<React.SetStateAction<string>>]}) {
        const { toggleEntryCompletion } = useAppContext();
        const [focusEntryId, setFocusEntryId] = focusToolSet;

        function isCompeleted() {
            return displayData.status === "completed";
        }

        return (
            <div
                className={`${className} ${styles.taskCard} ${isCompeleted() ? styles.completed : ''} ${displayData.id === focusEntryId ? styles.focus : ''}`}
                onClick={(e) => {
                    e.stopPropagation();
                    setFocusEntryId(displayData.id)
                }}
            >
                <div className={styles.level1}>
                    <Checkbox
                        type="checkbox"
                        className={`${styles.checkbox} ${isCompeleted() ? styles.completed : ''}`}
                        checked={isCompeleted()}
                        onClick={() => toggleEntryCompletion(displayData.id)}
                    />
                    <input
                        type="text"
                        className={styles.title}
                        defaultValue={displayData.title}
                    />
                </div>
                <div className={styles.level2}></div>
            </div>
        )
}