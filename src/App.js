
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import GroupPage from "./pages/GroupPage";
import BroadcastPage from "./pages/BroadcastPage";
import DemoPage from "./pages/DemoPage";
import DocsPage from "./pages/DocsPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/group" element={<GroupPage />} />
            <Route path="/broadcast" element={<BroadcastPage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/docs" element={<DocsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
