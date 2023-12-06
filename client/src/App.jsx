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

function App() {
  return (
    <div className='mainRoot'>
      <Header />
      <SideBar />
      <SignUp />
    </div>
  )
}

export default App
