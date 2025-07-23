import { useState } from "react";
import styles from "./AppEntriesManager.module.css"
import DisplayBar from "./display-bar/DisplayBar";
import Information from "./Information";
import { v4 } from "uuid";

export default function AppEntriesManager({className}: {className: string}) {
    const [focusEntryId, setFocusEntryId] = useState<string>(v4())
    
    return (
        <div
            className={`${className} ${styles.manager}`}
        >
            <DisplayBar className={styles.displayBar} focusToolSet={[focusEntryId, setFocusEntryId]}/>
            <Information className={styles.information} focusEntryId={focusEntryId}/>
        </div>
    )
}