import styles from '../css/SidebarNavItem.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SidebarNavItem({className, icon, label, isActive, onClick, isSidebarExpanded}) {
  return (
    <div
      className={`${className} ${styles.navItem} ${isActive ? styles.active : ''}`}
      onClick={onClick}
    >
        <FontAwesomeIcon className={styles.icon} icon={icon} />
        {isSidebarExpanded && <div className={styles.text}>{label}</div>}
    </div>
  )
}