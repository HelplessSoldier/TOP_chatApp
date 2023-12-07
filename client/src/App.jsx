import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css'
import Header from './globalPartials/Header';
import SignUp from './pageStates/signup/SignUp';
import SideBar from './globalPartials/SideBar';
import LogIn from './pageStates/login/LogIn';

function App() {
  return (
    <div className='mainRoot'>
      <Header />
      <SideBar />
      <LogIn />
    </div>
  )
}

export default App
