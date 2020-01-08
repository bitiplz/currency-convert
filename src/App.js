import React, { useState } from 'react';
import Login from './components/Login';
import Converter from './components/Converter';
import WheelSelect from './components/WheelSelect';
import './app.css';

function App() {

  const [user, setUser] = useState( null );

  return (
    <div className="section">
      <Login user={ user } onLogin={ setUser } />
      <Converter user={ user } />
    </div>
  );
}

export default App;
