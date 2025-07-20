import { useAppContext } from "../../../../context/AppEntriesContext"
import type { Task } from "../../../../types"
import Checkbox from "../../../common/Checkbox";
import styles from "./TaskCard.module.css"

export default function TaskCard({className, displayData}: {className: string, displayData: Task}) {
    const { toggleEntryCompletion } = useAppContext();

    function isCompeleted() {
        return displayData.status === "completed";
    }

    return (
        <div
            className={`${className} ${styles.taskCard} ${isCompeleted() ? styles.completed : ''}`}
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