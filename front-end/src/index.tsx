import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { NativeBaseProvider } from "native-base";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./contexts/auth-context/";
import { VoteContextProvider } from "./contexts";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <VoteContextProvider>
        <NativeBaseProvider>
          <Router>
            <App />
          </Router>
        </NativeBaseProvider>
      </VoteContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
