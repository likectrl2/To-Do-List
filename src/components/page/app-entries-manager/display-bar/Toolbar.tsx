import { faPlus } from "@fortawesome/free-solid-svg-icons"
import styles from "./Toolbar.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAppContext } from "../../../../contexts/AppEntriesContext"

export default function Toolbar({className}: {className: string}) {
    const { addTask, addProject } = useAppContext();
    
    return (
        <div
            className={`${className} ${styles.toolbar}`}
        >
            <div className={styles.placeHolder}/>
            <div
                        className={styles.addButton}
                        onClick={() => addTask()}
            >
                        <FontAwesomeIcon icon={faPlus}/> 
            </div>
            <div
                        className={styles.addButton}
                        onClick={() => addProject()}
            >
                        <FontAwesomeIcon icon={faPlus}/> 
            </div>
        </div>
    )
}