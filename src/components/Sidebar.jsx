import styles from '../css/Sidebar.module.css'

import SidebarNavItem from "./SidebarNavItem"

export default function Sidebar({className, currentPage, onClick, navItem}) {
  return(
    <div className={`${className} ${styles.sidebar}`}>
      {
        navItem.map(
          item => {
            return (
              <SidebarNavItem
                className={styles.navItem}
                key={item.id}
                icon={item.icon}
                label={item.label}
                isActive={currentPage === item.id}
                onClick={() => onClick(item.id)}
              />
            )
            
          }
        )
      }
    </div>
  )
}