import React from 'react';
import { selectUsername } from '../state/user/selectors';
import './App.css';
import Dashboard from './components/Dashboard';
import Popup from './components/Popup';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import WelcomePopup from './components/welcome-popup';
import { showPopup } from '../state/popup/reducer';

function App() {
  const userName = useAppSelector(selectUsername);
  const dispatch = useAppDispatch();

  if (!userName) {
    dispatch(showPopup({
      component: WelcomePopup,
    }));
  }

  return (
    <div className="App">
      <Dashboard />
      <Popup />
    </div>
  );
}

export default App;
