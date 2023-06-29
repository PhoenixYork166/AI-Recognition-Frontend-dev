import React from 'react';
import './ColorRecognition.css';
import ColorDetails from './ColorDetails';
import SaveColorBtn from './SaveColorBtn';

const ColorRecognition = ( { 
    name, 
    imageUrl, 
    color_props, 
    color_hidden,
    onSaveColorButton 
} ) => {
    return color_hidden ? (
    <h2></h2>
    ) : (
        <div className="color-container" id="color-container">
                <div className='color-image'> 
                    <img 
                        src={imageUrl}
                        alt="Ooops...It seems the entered URL is BROKEN...Please enter a working URL starting with 'https' in .jpg format"
                    />
                </div>

                <div id='detailBtn'>                
                    <div id="color-details">
                        <ColorDetails color_props={color_props} />
                        
                    </div>
                    <div id="saveColorBtn">
                        <SaveColorBtn 
                            name={name}
                            color_props={color_props}
                            onSaveColorButton={onSaveColorButton} 
                        />
                    </div>
                </div>
        </div>
    )
}
export default ColorRecognition
