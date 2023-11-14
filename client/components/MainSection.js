import React from 'react';
import '../App.css';
import {Button} from './Button';
import './MainSection.css';

function MainSection() {
  return (
    <div className='hero-container'>
        <video src='/videos/video-3.mp4' autoPlay muted />
        <h1>UW SCHEDULE BUILDER</h1>
        <div className='hero-btns'>
            <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large' link="/datacollection">
                GET STARTED
            </Button>
        </div>
    </div>
  );
}

export default MainSection