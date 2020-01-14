import React from "react";
import { AppProvider } from "./providers/AppProvider";
import Converter, { SaveSelection } from "./components/Converter";
import ConverterWheel from "./components/ring/ConverterWheel";
import TopBar from "./components/TopBar";
import History from "./components/history/History";
import UserContent from "./components/shared/UserContent";
import GoogleLoginButton from "./components/GoogleLoginButton";
import styled from "styled-components";
import "./app.css";

import CenterDisplay from './components/ring/CenterDisplay';

function App() {

  return (
    <AppProvider>
      <TopBar title="Currency Wheel" middleSection={<Converter />}>
        <GoogleLoginButton />
      </TopBar>

      <UserContent>
        <TopBar>
          <SaveSelection />
        </TopBar>
        <History />
      </UserContent>

      <ConverterWheel />
    </AppProvider>
  );
}

export default App;

const Marker = styled.div`
  height: 0;
  width: 0;
  padding: 2px;
  border-radius: 50%;
  background-color: blue;
`;



/*
<ConverterWheel />

*/
