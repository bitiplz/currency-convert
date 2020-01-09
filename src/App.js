import React from 'react';
import {AppProvider} from './components/AppProvider';
import Converter from './components/Converter';
import TopBar from './components/TopBar';
import GoogleLoginButton from './components/GoogleLoginButton'; 
import './app.css';

function App() {

  return (
    <AppProvider>
      <TopBar auth title='Currency Wheel' >
        <Converter />  
        <GoogleLoginButton/>
      </TopBar>
      <Converter />
    </AppProvider>
  );
}

export default App;
