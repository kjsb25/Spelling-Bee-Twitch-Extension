import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { ChromeMessage, Sender } from "./types";

import "./App.css";

export const App = () => {
  const [url, setUrl] = useState<string>("");
  const [responseFromContent, setResponseFromContent] = useState<string>("");


  /**
   * Get current URL
   */
  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };

    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const out = tabs[0].url ? tabs[0].url : "";
        setUrl(out);
      });
  }, []);

  const sendMessage = (messageString: string) => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: messageString,
    };

    const queryInfo: chrome.tabs.QueryInfo = {
      active: true,
      currentWindow: true,
    };

    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const currentTabId = tabs[0].id;
        if(currentTabId !== undefined){
          chrome.tabs.sendMessage(currentTabId, message, (response) => {
            setResponseFromContent(response);
          });
        }
        
      });
  };

  const sendTestMessage = () =>{
    sendMessage("Hello from React")
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>URL:</p>
        <p>{url}</p>
        <button onClick={sendTestMessage}>SEND MESSAGE</button>
        <p>Response from content:</p>
        <p>{responseFromContent}</p>
      </header>
    </div>
  );
};

export default App