import React, { useState } from "react";
import "../../App.css";
import AboutSection from "../AboutSection";
import AboutSectionNew from "../AboutSectionNew";
import UserForm from "../UserForm";

// This is the parent component, UserForm is the child component. I want to return the fetched data from 
// UserForm and pass it into the About component as a prop. 
//I can then return the data from this component to its parent component (App.js), from where I can pass it into
// the calendar prop to render on the calendar. 

function About({setFetchedData}) { 

  const [data, setData] = useState('');

  const childToParent = (childData) => {
    setData(childData);
    setFetchedData(childData);
  };

  return (
    <>
      <UserForm childToParent={childToParent} />
      <div>

      </div>
    </>
  );
}

export default About;
