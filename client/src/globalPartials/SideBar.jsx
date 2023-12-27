import './SideBar.css';

export default function SideBar() {
  return (
    <div className='sideBarContainer'>
      <div className='sideBarChats'>
        <h2 className='sidebarHeader'>CHATS</h2>
        <hr />
      </div>
      <div className='sideBarFriends'>
        <h2 className='sidebarHeader'>FRIENDS</h2>
        <hr />
      </div>
    </div >
  )
}
