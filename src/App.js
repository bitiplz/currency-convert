import React, { useState } from 'react';
import Login from './components/Login';
import Converter from './components/Converter';
import TopBar from './components/TopBar';
import './app.css';

function App() {

  const [user, setUser] = useState( null );

  return (
    <div className="section">
      <TopBar auth title='Currency Wheel' >
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>Log In</button>
      </TopBar>
      <Login user={ user } onLogin={ setUser } />
      <Converter user={ user } />
    </div>
  );
}

export default App;
