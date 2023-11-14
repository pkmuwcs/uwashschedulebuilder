import React, { useState, useEffect } from "react";
import "../App.css";
//import { Button } from "./Button";
import "./MainSection.css";

function AboutSection() {
  const [userInput, setUserInput] = useState('');
  const [value, setValue] = useState('');

  const [schoolYear, setSchoolYear] = useState('');
  const [schoolQuarter, setSchoolQuarter] = useState('');
  const [classes, setClasses] = useState({});
  
  const [returnedYear, setReturnedYear] = useState('')
  const [returnedQuarter, setReturnedQuarter] = useState('')

  const [returnedClasses, setReturnedClasses] = useState({})

  // this is what each class will be made up of
  const [SLN, setSLN] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [location, setLocation] = useState('')




  const [errorMessage, setErrorMessage] = useState('');



  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleYearChange = (e) => {
    setSchoolYear(e.target.value);
  }

  const handleQuarterChange = (e) => {
    setSchoolQuarter(e.target.value);
  }

  const handleClassesChange = (e) => {
    setClasses(e.target.value);
  }

  const addItem = () => {
    const newItem = {
      SLN, 
      startTime,
      endTime,
      location
    };

    setReturnedClasses([...returnedClasses, newItem])
  };


  const sendDataToBackend = () => {
    fetch("http://127.0.0.1:5000/api", {
      method: "POST",
      headers: {
        //'Accept': 'application/json, text/plain, */*',
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "POST"
      },
      body: JSON.stringify({ userInput, schoolQuarter, schoolYear, classes }),
    }) 
      .then(response => response.json())
      .then((data) => {
        setReturnedYear(data[0][12])
        setReturnedQuarter(data[0][11])
        setReturnedClasses(data)
        
        setErrorMessage("")
      })
      .catch(error => {
        setErrorMessage("There was an error in your input! Please input your information correctly! " + error)
      });
  };

  useEffect(() => {
    sendDataToBackend()
  }, [])

  return (
    <>
      <div>
        <input type="text" value={userInput} onChange={handleInputChange} />
        <input type="text" value={schoolYear} onChange={handleYearChange} />
        <input type="text" value={schoolQuarter} onChange={handleQuarterChange} />
        <input type="text" value={classes} onChange={handleClassesChange} />
        <button onClick={sendDataToBackend}>Send Data</button>
        <p>{errorMessage}</p>
        <p>{returnedYear}</p>
        <p>{returnedQuarter}</p>

        
      </div>
    </>
  );
}

export default AboutSection;
