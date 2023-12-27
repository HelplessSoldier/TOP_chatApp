import './SideBar.css';

export default function SideBar() {
  return (
    <div className='sideBarContainer'>
      <div className='sideBarChats'>
        <h2 className='sidebarHeader'>Chats</h2>
        <hr />
      </div>
      <div className='sideBarFriends'>
        <h2 className='sidebarHeader'>Friends</h2>
        <hr />
      </div>
    </div >
  )
}
