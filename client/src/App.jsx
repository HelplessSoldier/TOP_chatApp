import { useState } from "react";
import "./App.css";
import Header from "./globalPartials/Header";
import SignUp from "./pageStates/signup/SignUp";
import SideBar from "./globalPartials/SideBar";
import LogIn from "./pageStates/login/LogIn";
import Chat from "./pageStates/chat/Chat";

function App() {
  const [pageState, setPageState] = useState("Chat");
  const [userObject, setUserObject] = useState(null);

  return (
    <div className="mainRoot">
      <Header
        setPageState={setPageState}
        userObject={userObject}
        setUserObject={setUserObject}
      />
      <SideBar />
      {getPage(pageState, setPageState, setUserObject)}
    </div>
  );
}

function getPage(pageState, setPageState, setUserObject) {
  switch (pageState) {
    case "LogIn":
      return <LogIn setPageState={setPageState} />;
    case "SignUp":
      return <SignUp setPageState={setPageState} />;
    case "Chat":
      return <Chat setPageState={setPageState} setUserObject={setUserObject} />;
    default:
      return null;
  }
}

export default App;
