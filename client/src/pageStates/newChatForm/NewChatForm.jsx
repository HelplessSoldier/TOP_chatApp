import "./NewChatForm.css";

export default function NewChatForm({ setPageState }) {
  const instanceTypes = ["public", "friends", "friendsPlus", "invite", "invitePlus"]
  const handleChatSubmit = (e) => {
    e.preventDefault();
    console.log(e.data);
  };

  return (
    <div className="newChatFormRoot">
      <h2>New Chat</h2>
      <form className="newChatForm" onSubmit={handleChatSubmit}>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" />
        <label htmlFor="instanceType">Type: </label>
        <select htmlFor="instanceType" id="instanceType">
          {instanceTypes.map((type) => {
            return (
              <option key={type} value={type}>{type}</option>
            )
          })}
        </select>
      </form>
    </div>
  );
}
