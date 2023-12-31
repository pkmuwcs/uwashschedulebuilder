import React, { useState, useEffect } from "react";
import "../App.css";
import "./MainSection.css";
import {useForm, SubmitHandler, Controller} from 'react-hook-form';


//import { CContainer } from '@coreui/react';

function AboutSectionNew() {
  // we need the following values: year, quarter, y/n update database.
  // also: set of classes, the amount of which the user can easily update

  const [userData, setUserData] = useState({
    resetDatabase: "",
    year: "",
    quarter: "",
  });

  const [errorMessage, setErrorMessage] = useState('');

  const [userSLNs, setUserSLNs] = useState([{}]);
  const [returnedClasses, setReturnedClasses] = useState({});

  const handleResetChange = (e) => {
    setUserData({...userData, resetDatabase:e.target.value})
  };

  const handleYearChange = (e) => {
    setUserData({...userData, year:e.target.value})
  };

  const handleQuarterChange = (e) => {
    setUserData({...userData, quarter:e.target.value})
  }

  const handleClassChange = (e, index) => {
    const list = [...userSLNs];
    list[index] = e.target.value;
    setUserSLNs(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...userSLNs];
    list.splice(index, 1);
    setUserSLNs(list);
  };

  const handleAddClick = () => {
    const list = [...userSLNs, {SLN: ""}];
    setUserSLNs(list);
  };

  const sendDataToBackend = () => {
    fetch("http://127.0.0.1:5000/api", {
      method: "POST",
      headers: {
        //'Accept': 'application/json, text/plain, */*',
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "POST",
      },
      body: JSON.stringify({
        year: userData.year,
        quarter: userData.quarter,
        reset: userData.resetDatabase,
        classes: userSLNs,
      }),
    })
      .then((response) => response.json())
      .then((data) => {

        setReturnedClasses(data);

        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage(
          "There was an error in your input! Please input your information correctly! " +
            error
        );
      });
  };

  // put in the elements in SLN list, see if you can add and subtract
  return (
    <div className="first-div">
        <div>
              <input
                type="text"
                placeholder="reset data?"
                value={userData.resetDatabase}
                onChange={handleResetChange}
              />
              <input
                type="text"
                placeholder="enter year!"
                value={userData.year}
                onChange={handleYearChange}
              />
              <input
                type="text"
                placeholder="enter quarter!"
                value={userData.quarter}
                onChange={handleQuarterChange}
              />
              <button onClick={sendDataToBackend}>Send Data</button>
              <p>{errorMessage}</p>
              <p>{userData.year}</p>
              <p>{userData.quarter}</p>
            </div>
      {userSLNs.map((x, i) => {
        return (
          <div>
            <div className="map-div-1">
              <label>CLass SLN</label>
              <input
                type="text"
                name="SLN"
                placeholder="Enter course SLN"
                onChange={(e) => handleClassChange(e, i)}
              />
            </div>
            <div>
              {userSLNs.length !== 1 && (
                <button
                  className="first-button"
                  onClick={() => handleRemoveClick(i)}
                >
                  Remove
                </button>
              )}
              {userSLNs.length - 1 === i && (
                <button className="second-button" onClick={handleAddClick}>
                  Add Class
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AboutSectionNew;
