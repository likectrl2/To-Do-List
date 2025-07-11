/* eslint-disable react-refresh/only-export-components */

function Sidebar({pageIcon, setPage}) {
  return(
    <div className='sidebar'>
        <img onClick={() => setPage(0)} src={pageIcon[0]} alt="概览" /><br />
        <img onClick={() => setPage(1)} src={pageIcon[1]} alt="任务安排" /><br />
    </div>
  )
}

export default Sidebar;