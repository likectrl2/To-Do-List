import { faFile, faFilter, faLayerGroup, faPlus } from "@fortawesome/free-solid-svg-icons"
import styles from "./Toolbar.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAppContext } from "../../../../contexts/AppEntriesContext"
import React, { useState } from "react";

export default function Toolbar({className, setFocusEntryId, onSearch}
    : {className: string, setFocusEntryId: React.Dispatch<React.SetStateAction<string>>, onSearch: React.Dispatch<React.SetStateAction<string>>}) {
        const { createEntry } = useAppContext();
        
        const [addOpen, setAddOpen] = useState(false);

        const toggleAddOpen = () => {
            setAddOpen(!addOpen);
        }

        return (
            <div
                className={`${className} ${styles.toolbar}`}
            >
                <div className={styles.buttonFrame}>
                    <div className={styles.button}>
                        <FontAwesomeIcon icon={faFilter}/> 
                    </div>
                </div>
                <input
                    type="text" 
                    className={styles.searchFrame}
                    onChange={(e) => onSearch(e.target.value)}
                />
                <div className={styles.buttonFrame}>
                    <div
                        className={`${styles.button} ${addOpen ? styles.isOpen : ''}`}
                        onClick={toggleAddOpen}
                    >
                        <FontAwesomeIcon icon={faPlus}/> 
                    </div>
                    {
                        addOpen &&
                        <div className={styles.addMenu}>
                            <div 
                                className={styles.addMenuOption}
                                onClick={() => { setFocusEntryId(createEntry("Task").id); toggleAddOpen() }}
                            >
                                <div className={styles.icon}>
                                    <FontAwesomeIcon icon={faFile}/> 
                                </div>
                                <div className={styles.title}>{"新建任务"}</div>
                            </div>
                            <div className={styles.line}/>
                            <div 
                                className={styles.addMenuOption}
                                onClick={() => { setFocusEntryId(createEntry("Project").id); toggleAddOpen() }}
                            >
                                <div className={styles.icon}>
                                    <FontAwesomeIcon icon={faLayerGroup}/> 
                                </div>
                                    <div className={styles.title}>{"新建项目"}
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
}