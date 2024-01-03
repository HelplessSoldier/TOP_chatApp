import "./NewChatForm.css";

export default function NewChatForm({ setPageState }) {
  const instanceTypes = [
    "public",
    "friends",
    "friendsPlus",
    "invite",
    "invitePlus",
  ];

  const handleChatSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <div className="newChatFormRoot">
      <form className="newChatForm" onSubmit={handleChatSubmit}>
        <h2>New Chat</h2>
        <div className="labelInputPairContainer">
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" />
        </div>
        <div className="labelInputPairContainer">
          <label htmlFor="instanceType">Type: </label>
          <select htmlFor="instanceType" id="instanceType">
            {instanceTypes.map((type) => {
              return (
                <option key={type} value={type}>
                  {type}
                </option>
              );
            })}
          </select>
        </div>
        <button type="submit" className="formButton formButtonOverride">
          Create
        </button>
      </form>
    </div>
  );
}
