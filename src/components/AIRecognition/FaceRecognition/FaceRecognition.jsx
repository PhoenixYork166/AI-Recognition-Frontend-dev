import Loading from '../../Loading/Loading';
import React, { useState, useEffect } from 'react';
import './FaceRecognition.scss';
import axios from 'axios';

// Utility functions
import blobToBase64 from '../../../util/blobToBase64';

const FaceRecognition = ( { user, input, imageUrl, box, celebrityName, face_hidden } ) => {
    const [imageBlob, setImageBlob] = useState(''); // Blob { size: Number, type: String, userId: undefined }
    const [resData, setResData] = useState('');

    // Keep monitoring Blob fetched from axios.get(imageUrl, { responseType: 'blob' })
    useEffect(() => {
        const fetchImage = async() => {
          const fetchUrl = input;
    
          try {
            const response = await axios.get(fetchUrl, { responseType: 'blob' });
            console.log(`\nReceived metadata blob response:`, response, `\n`);
    
            const reader = new FileReader();
            reader.onloadend = () => {
              // useState() to store this.state.imageBlob: response.data
              setImageBlob(reader.result);
            };
            reader.readAsDataURL(response.data);
            setResData(response.data);
            console.log(`\nresponse.data:\n$`, response.data, `\n`);
          } catch (err) {
            console.error(`\nFailed to get 'blob' via axios.get(${fetchUrl}\nError: ${err}\n`);
          }
        };
        fetchImage();
    }, [input]); // State management array[] to listen on imageUrl

    return face_hidden ? (
    <h2>&nbsp;</h2>
    ) : ( 
    <React.Fragment>
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
    </React.Fragment>
    )
}
export default FaceRecognition;
// From App.js:
// calculateFaceLocation()
// return {
//     topRow: clarifaiFace.top_row * height,
//     leftCol: clarifaiFace.left_col * width, 
//     bottomRow: height - (clarifaiFace.bottom_row * height),
//     rightCol: width - (clarifaiFace.right_col * width),
//   }
