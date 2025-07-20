import styles from "./Page.module.css"
import PAGE_CONFIG from "../../configs/Page";

export default function Page({className, focusPage}: {className: string, focusPage: number}) {
    return (
        <div
            className={`${className}`}
        >
            {
                PAGE_CONFIG.map(
                    configItem => {
                        if(configItem.id === focusPage) {
                            return (
                                <configItem.pageComponent className={styles.pageItem} key={configItem.id}/>
                            )
                        }
                        
                    }
                )
            }
        </div>
    )
}