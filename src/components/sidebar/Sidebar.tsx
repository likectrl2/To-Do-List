import style from './Sidebar.module.css'
import SIDEBAR_CONFIG from '../../configs/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Sidebar({className}: {className: string}) {
    return (
        <div className={`${className} ${style.sidebar}`}>
            {
                SIDEBAR_CONFIG.map(
                    configItem => {
                        return (
                            <div
                                className={style.sidebarNav}
                                key={configItem.id}
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