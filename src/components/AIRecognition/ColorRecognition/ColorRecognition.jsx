import React from 'react';
import './ColorRecognition.css';
import ColorDetails from './ColorDetails';

const ColorRecognition = ( { 
    name, 
    imageUrl, 
    color_props, 
    color_hidden,
} ) => {
    return color_hidden ? (
    <h2></h2>
    ) : (
        <div className="color-container" id="color-container">
            <div className='color-image__modal-container'>
                <div className='color-image'> 
                    <img 
                        src={imageUrl}
                        alt="Ooops...It seems the entered URL is BROKEN...Please enter a working URL starting with 'https' in .jpg format"
                    />
                </div>
                <div className='modal-window'>
                    <h1 class='modal-window--inner'>
                        The selected raw hex value has been copied!
                    </h1>
                </div>
            </div>
                
            <div id='detailBtn'>                
                <div id="color-details">
                    <ColorDetails color_props={color_props} />        
                </div>
            </div>
        </div>
    )
}
export default ColorRecognition
