import styles from "./Toolbar.module.css"

export default function Toolbar({className}: {className: string}) {
    return (
        <div
            className={`${className} ${styles.toolbar}`}
        >
        </div>
    )
}