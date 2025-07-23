import { faPlus } from "@fortawesome/free-solid-svg-icons"
import styles from "./Toolbar.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAppContext } from "../../../../contexts/AppEntriesContext"

export default function Toolbar({className, setFocusEntryId}
    : {className: string, setFocusEntryId: React.Dispatch<React.SetStateAction<string>>}) {
        const { createEntry } = useAppContext();
        
        return (
            <div
                className={`${className} ${styles.toolbar}`}
            >
                <div className={styles.placeHolder}/>
                <div
                            className={styles.addButton}
                            onClick={() => { setFocusEntryId(createEntry("Task").id) }}
                >
                            <FontAwesomeIcon icon={faPlus}/> 
                </div>
                <div
                            className={styles.addButton}
                            onClick={() => { setFocusEntryId(createEntry("Project").id) }}
                >
                            <FontAwesomeIcon icon={faPlus}/> 
                </div>
            </div>
        )
}