import React from 'react';
import './AgeRecognition.css';

const AgeRecognition = ( { imageUrl, age, age_hidden } ) => {

    return age_hidden ? (
    <h2></h2>
    ) : ( 
        <div className="center ma">
            <div className='absolute mt2' id='age-container'>
                <div id='age-number'>
                    <h3>Age: {age}</h3>
                    {/* [0].age.name */}
                </div>
                <div>
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

