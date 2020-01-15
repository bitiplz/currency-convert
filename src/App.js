import React from "react";
import AppProvider from "./providers/AppProvider";
import Converter from "./components/Converter";
import ConverterWheel from "./components/ring/ConverterWheel";
import TopBar from "./components/TopBar";
import History from "./components/history/History";
import UserContent from "./components/shared/UserContent";
import GoogleLoginButton from "./components/GoogleLoginButton";
import "./app.css";

function App() {

  return (
    <AppProvider>
      <TopBar title="Currency Wheel" middleSection={<Converter />}>
        <GoogleLoginButton />
      </TopBar>

      <UserContent>
        <History />
      </UserContent>

      <ConverterWheel />
    </AppProvider>
  );
}

export default App;