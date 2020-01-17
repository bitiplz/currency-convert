import React from "react";
import "./app.css";
import AppProvider from "./providers/AppProvider";
import ThemeProvider from "./providers/ThemeProvider";
import Converter from "./components/Converter";
import ConverterWheel from "./components/ring/ConverterWheel";
import TopBar from "./components/TopBar";
import History from "./components/history/History";
import GoogleLoginButton from "./components/GoogleLoginButton";
import ThemeSelector from "./components/shared/ThemeSelector";
import WheelSelect, {WheelButton} from "./components/ring/WheelSelect";



export default function() {
  return (
    <AppProvider>
      <ThemeProvider>

        <TopBar>
          <GoogleLoginButton />
        </TopBar>

        <div style={{ display:'flex' }}>
          <Converter/>
          <ThemeSelector/>
          <History/>
        </div>
        
        <ConverterWheel size={620} />
     
      </ThemeProvider>
    </AppProvider>
  );
}
