import React from 'react';
import './FaceRecognition.css';
import classes from './FaceRecognition.module.css';

const FaceRecognition = ( { imageUrl, box, celebrityName, face_hidden } ) => {

    const bounding_box = document.querySelector('#root > div > div.center.ma > div > div.bounding-box');

    return face_hidden ? (
    <h2></h2>
    ) : ( 
        <div className="center ma">
            <div className='absolute mt2'>
                <div >
                   <img
                    // id='face-image' is used for DOM manipulation
                    // cannot be edited
                    id='face-image'
                    src={imageUrl}
                    alt="Ooops...It seems the entered URL is BROKEN...Please enter a working URL starting with 'https' in .jpg format"
                   /> 
                </div>
               
                <div 
                  className='bounding-box'
                  style={{
                   top: box.topRow,
                   right: box.rightCol,
                   bottom: box.bottomRow,
                   left: box.leftCol,
                    }}
                >
                {/* Create a button to show Celebrity name && 
                allow users to google search it for comparison 
                on a new browser window*/}
                <div className='celebrity-name-outer'>
                    <button 
                     className=
                     {celebrityName ? `${classes.celebrityName}`:`${classes.invisible}`}
                     onClick={() => 
                        window.open(`https://www.google.com/search?q=${celebrityName}`, '_blank')}
                    >
                    {celebrityName}
                    </button>
                </div>
                </div>
            </div>
            
        </div>
    )
}
export default FaceRecognition
// From App.js:
// calculateFaceLocation()
// return {
//     topRow: clarifaiFace.top_row * height,
//     leftCol: clarifaiFace.left_col * width, 
//     bottomRow: height - (clarifaiFace.bottom_row * height),
//     rightCol: width - (clarifaiFace.right_col * width),
//   }
