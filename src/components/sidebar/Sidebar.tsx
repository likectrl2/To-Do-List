import style from './Sidebar.module.css'
import SIDEBAR_CONFIG from '../../configs/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type React from 'react'

export default function Sidebar(
    {className, focusPage, handleClick}
    : {className: string, focusPage: number, handleClick: React.Dispatch<React.SetStateAction<number>>}) {
    
    return (
        <div className={`${className} ${style.sidebar}`}>
            {
                SIDEBAR_CONFIG.map(
                    configItem => {
                        return (
                            <div
                                className={`${style.sidebarNav} ${focusPage === configItem.id ? style.focus : ''}`}
                                key={configItem.id}
                                title={configItem.title}
                                onClick={() => handleClick(configItem.id)}
                            >
                                <FontAwesomeIcon icon={configItem.icon}/>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}