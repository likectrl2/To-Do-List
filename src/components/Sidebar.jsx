import { useState, useRef, useEffect } from 'react';
import styles from '../css/Sidebar.module.css';
import SidebarNavItem from "./SidebarNavItem";

export default function Sidebar({ className, currentPage, onClick, navItem}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hoverTimeRef = useRef(null);
  
  const EXPAND_DELAY = 300;  //展开延时

  const handleMouseEnter = () => {
    if (hoverTimeRef.current) {
      clearTimeout(hoverTimeRef.current);
    }
    hoverTimeRef.current = setTimeout(() => {
      setIsExpanded(true);
    }, EXPAND_DELAY);
  };

  const handleMouseLeave = () => {
    if (hoverTimeRef.current) {
      clearTimeout(hoverTimeRef.current);
      hoverTimeRef.current = null;
    }
    setIsExpanded(false);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeRef.current) {
        clearTimeout(hoverTimeRef.current);
      }
    };
  }, []);

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