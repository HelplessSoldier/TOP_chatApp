import { useState } from "react";
import "./App.css";
import Header from "./globalPartials/Header";
import SignUp from "./pageStates/signup/SignUp";
import SideBar from "./globalPartials/SideBar";
import LogIn from "./pageStates/login/LogIn";
import Chat from "./pageStates/chat/Chat";
import Account from "./pageStates/account/Account";
import SearchResultsView from "./globalPartials/headerComps/SearchResultsView";
import NewChatForm from "./pageStates/newChatForm/NewChatForm.jsx";

function App() {
  const [pageState, setPageState] = useState("Chat");
  const [userObject, setUserObject] = useState(null);
  const [socket, setSocket] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  return (
    <div className="mainRoot">
      <Header
        setPageState={setPageState}
        userObject={userObject}
        setUserObject={setUserObject}
        socket={socket}
        setSearchResults={setSearchResults}
      />
      {searchResults && (
        <SearchResultsView
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          userObject={userObject}
          socket={socket}
        />
      )}
      <SideBar
        userObject={userObject}
        setPageState={setPageState}
        socket={socket}
      />
      {getPage(pageState, setPageState, userObject, setUserObject, socket, setSocket)}
    </div>
  );
}

function getPage(pageState, setPageState, userObject, setUserObject, socket, setSocket) {
  switch (pageState) {
    case "LogIn":
      return <LogIn setPageState={setPageState} />;
    case "SignUp":
      return <SignUp setPageState={setPageState} />;
    case "Chat":
      return (
        <Chat
          setPageState={setPageState}
          setUserObject={setUserObject}
          socket={socket}
          setSocket={setSocket}
          userObject={userObject}
        />
      );
    case "Account":
      return (
        <Account
          setPageState={setPageState}
          socket={socket}
          setSocket={setSocket}
        />
      );
    case "NewChat":
      return <NewChatForm setPageState={setPageState} />;
    default:
      return null;
  }
}

export default App;
