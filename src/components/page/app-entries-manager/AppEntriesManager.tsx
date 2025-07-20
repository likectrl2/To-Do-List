import styles from "./AppEntriesManager.module.css"
import DisplayBar from "./display-bar/DisplayBar";
import Information from "./Information";

export default function AppEntriesManager({className}: {className: string}) {
    return (
        <div
            className={`${className} ${styles.manager}`}
        >
            <DisplayBar className={styles.displayBar}/>
            <Information className={styles.information}/>
        </div>
    )
}