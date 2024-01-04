import './AccountSections.css';
import './OwnedChats.css';

export default function OwnedChats({ ownedChats }) {
  console.log(ownedChats);
  return (
    <div className='accountSectionContainer'>
      <h2 className='accountSectionHeader'>Owned Chats</h2>
      <hr />
    </div>
  )
}
