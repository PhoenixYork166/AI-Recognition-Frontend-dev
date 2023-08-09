import React from 'react';
import './ColorRecognition.scss';
import ColorDetails from './ColorDetails/ColorDetails';

const ColorRecognition = ( { 
    name, 
    imageUrl, 
    color_props, 
    color_hidden,
} ) => {
    return color_hidden ? (
    <h2>&nbsp;</h2>
    ) : (
        <div className="color-container row" id="color-container">
            <div className='color-image__modal-container col-1-of-2'>
                <div className='color-image-box'> 
                    <img 
                        className='color-image'
                        src={imageUrl}
                        alt="Ooops...It seems the entered URL is BROKEN...Please enter a working URL starting with 'https' in .jpg format"
                    />
                </div>
                <div className='modal-window'>
                    <h1 class='modal-window--inner'>
                        Copied!
                    </h1>
                </div>
            </div>
                
               
            <div className="col-1-of-2">
                <ColorDetails color_props={color_props} />        
            </div>
        </div>
    )
}
export default ColorRecognition;
