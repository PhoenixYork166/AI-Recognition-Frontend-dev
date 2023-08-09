import React from 'react';
import './FaceRecognition.scss';

const FaceRecognition = ( { imageUrl, box, celebrityName, face_hidden } ) => {

    return face_hidden ? (
    <h2>&nbsp;</h2>
    ) : ( 
        <div className="face-recognition">
            <div className="container">
                <div className="image-box">
                   <img
                    // id='face-image' is used for DOM manipulation
                    // cannot be edited
                    id='face-image'
                    style={{
                        marginTop: '5vh'
                    }}
                    src={imageUrl}
                    alt="Ooops...It seems the entered URL is BROKEN...Please enter a working URL starting with 'https' in .jpg format"
                   /> 
                </div>
               
                <div 
                  className={celebrityName ? "bounding-box" : ""}
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
                <div className="celebrity-container">
                    <button 
                     className=
                     {celebrityName ? "celebrity-name": "invisible"}
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
