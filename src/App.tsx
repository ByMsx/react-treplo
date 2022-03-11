import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import { setOnUpdate, getColumns } from './helpers/data.service';
import Popup from './components/Popup';

function App() {
  const [columns, setColumns] = useState(getColumns());
  setOnUpdate(setColumns);

  return (
    <div className="App">
      <Dashboard columns={columns} />
      <Popup />
    </div>
  );
}

export default App;
