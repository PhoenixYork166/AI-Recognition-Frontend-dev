import React from 'react';
import './AgeRecognition.css';

const AgeRecognition = ( { imageUrl, age, age_hidden } ) => {

    return age_hidden ? (
    <h2>&nbsp;</h2>
    ) : ( 
        <div className="age-container">
            <div className='age-subcontainer'>
                <div id='age-number'>
                    <h3>Age: {age}</h3>
                </div>
                <div className='age-image'>
                   <img
                    // id='face-image' is used for DOM manipulation
                    // cannot be edited
                    id='face-image'
                    src={imageUrl}
                    alt="Ooops...It seems the entered URL is BROKEN...Please enter a working URL starting with 'https' in .jpg format"
                   /> 
                </div>
            </div>
        </div>
    )
}
export default AgeRecognition

