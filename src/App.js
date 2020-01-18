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

import Demo from "./demo/Demo";


export default function() {
  return (
    <AppProvider>
      <ThemeProvider>


        <Demo>

          
          <ThemeSelector/>
          <TopBar><GoogleLoginButton /></TopBar>
          <Converter/>
          <History/>
          <ConverterWheel size={700} />

        </Demo>


      </ThemeProvider>
    </AppProvider>
  );
}

/*

<Demo comp={  } ></Demo>

*/