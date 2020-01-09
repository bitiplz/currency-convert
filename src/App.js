import React from 'react';
import {AppProvider} from './components/AppProvider';
import Converter, {SaveSelection} from './components/Converter';
import ConverterWheel from './components/ConverterWheel';
import TopBar from './components/TopBar';
import History from './components/History';
import UserContent from './components/UserContent';
import GoogleLoginButton from './components/GoogleLoginButton'; 
import './app.css';

function App() {

  return (
    <AppProvider>
      
      <TopBar title='Currency Wheel' middleSection={ <Converter/> }>
        <GoogleLoginButton/>
      </TopBar>
      
      <UserContent>
        <TopBar>
          <SaveSelection/>
        </TopBar>
        <History/>
      </UserContent>

      <ConverterWheel/>

    </AppProvider>
  );
}

export default App;
