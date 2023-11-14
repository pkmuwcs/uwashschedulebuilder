import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Navbar from "./components/Navbar";
import CalendarSection from "./components/CalendarSection";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function App() {
  const [fetchedData, setFetchedData] = useState("");

  const setData = (passedData) => {
    setFetchedData(passedData);
  };

  const nodeRef = React.useRef(null);
  return (
    <>
      <Router>
        <Navbar />
        <TransitionGroup>
          <CSSTransition nodeRef={nodeRef} appear={true} timeout={300} classNames="fade">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/datacollection"
                element={<About setFetchedData={setFetchedData} />}
              />
              <Route
                path="/calendar"
                element={<CalendarSection userData={fetchedData} />}
              />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </Router>
    </>
  );
}

export default App;
