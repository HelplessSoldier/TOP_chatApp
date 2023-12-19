import { useState } from "react";
import "./App.css";
import Header from "./globalPartials/Header";
import SignUp from "./pageStates/signup/SignUp";
import SideBar from "./globalPartials/SideBar";
import LogIn from "./pageStates/login/LogIn";

function App() {
  const [pageState, setPageState] = useState("LogIn");

  return (
    <div className="mainRoot">
      <Header />
      <SideBar />
      {getPage(pageState, setPageState)}
    </div>
  );
}

function getPage(pageState, setPageState) {
  switch (pageState) {
    case "LogIn":
      return <LogIn setPageState={setPageState} />;
    case "SignUp":
      return <SignUp setPageState={setPageState} />;
    default:
      return null;
  }
}

export default App;
