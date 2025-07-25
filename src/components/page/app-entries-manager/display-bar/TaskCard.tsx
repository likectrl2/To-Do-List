import { useAppContext } from "../../../../contexts/AppEntriesContext"
import type { Task } from "../../../../types"
import Checkbox from "../../../common/Checkbox";
import styles from "./TaskCard.module.css"

export default function TaskCard({className, displayData, focusToolSet, isInProject}
    : { className: string, displayData: Task,
        focusToolSet: [string, React.Dispatch<React.SetStateAction<string>>]
        isInProject?: boolean;
    }) {
        const { toggleStatus } = useAppContext();
        const [focusEntryId, setFocusEntryId] = focusToolSet;

        function isCompeleted() {
            return displayData.status === "completed";
        }

        return (
            <div
                className={`${className} ${styles.taskCard} ${isCompeleted() ? styles.completed : ''} ${displayData.id === focusEntryId ? styles.focus : ''} ${isInProject ? styles.inProject : ''}`}
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
                        onChange={() => toggleStatus(displayData.id)}
                    />
                    <p className={styles.title}>
                        {displayData.title}
                    </p>
                </div>
                <div className={styles.level2}></div>
            </div>
        )
}