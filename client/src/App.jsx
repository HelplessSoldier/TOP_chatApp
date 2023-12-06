import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css'
import Header from './globalPartials/Header';
import SignUp from './pageStates/signup/SignUp';

function App() {
  return (
    <>
      <Header />
      <SignUp />
    </>
  )
}

export default App
