import { useState } from 'react';
import styles from '../css/Sidebar.module.css';
import SidebarNavItem from "./SidebarNavItem";

export default function Sidebar({ className, currentPage, onClick, navItem}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  return(
    <div
      className={`${className} ${styles.sidebar} ${isExpanded ? styles.expanded : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
                isSidebarExpanded={isExpanded} 
              />
            );
          }
        )
      }
    </div>
  )
}