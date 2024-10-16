import React, { useState, useEffect } from 'react';
import './ColorRecognition.scss';
import axios from 'axios';

import ColorDetails from './ColorDetails/ColorDetails';

// Parent component
const ColorRecognition = ( { 
    user,
    name, 
    input,
    imageUrl, 
    color_props, 
    color_hidden,
} ) => {
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
    
    // Function to convert Blob to Base64
    const blobToBase64 = blob => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });

    // Save button to save Color details into PostgreSQL as blob metadata
    const saveColor = async () => {
        const callbackName = `src/components/AIRecognition/ColorRecognition/ColorDetails/ColorDetails.jsx\nsaveColor = async () => {...}`;

        const color_props_array = color_props;
        
        const devSaveColorUrl = 'http://localhost:3001/save-user-color';
        const prodSaveColorUrl = 'https://ai-recognition-backend.onrender.com/save-user-color';
        const fetchUrl = process.env.NODE_ENV === 'production' ? prodSaveColorUrl : devSaveColorUrl;

        // Assuming resData is the Blob
        const base64Metadata = await blobToBase64(resData);
    
        const imageRecord = {
        imageUrl: input,
        metadata: base64Metadata,
        dateTime: new Date().toISOString()
        };

        const imageDetails = color_props_array.map((eachColor) => {
            return {
            raw_hex: eachColor.colors.raw_hex,
            value: eachColor.colors.value,
            w3c_hex: eachColor.colors.w3c.hex,
            w3c_name: eachColor.colors.w3c.name
            }
        });
        
        const bodyData = JSON.stringify({ 
            userId: user.id, 
            imageRecord: imageRecord, 
            imageDetails: imageDetails 
        });

        console.log(`\nColorDetails src/App.js user: `, user, `\n`);
        console.log(`\nColorDetails src/App.js user.id: `, user.id, `\n`);
        console.log(`\nColorDetails color_props: `, color_props, `\n`);
        console.log(`\nColorDetails input: `, input, `\n`);
        console.log(`\nColorDetails saveColor imageRecord:\n`, imageRecord, `\n`);
        console.log(`\nColorDetails saveColor imageDetails:\n`, imageDetails, `\n`);
        console.log(`\nFetching ${fetchUrl} with bodyData`, bodyData, `\n`);

        fetch(fetchUrl, {
        method: 'post', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ // sending stringified this.state variables as JSON objects
            userId: user.id,
            imageRecord: imageRecord,
            imageDetails: imageDetails
        })
        })
        .then((response) => response.json())
        .then((response) => {
        console.log(`\nColorDetails saveColor response: `, response, `\n`);
        console.log(`\nColorDetails saveColor response.message: `, response.message, `\n`);
        console.log(`\nColorDetails saveColor response.status.code: `, response.status.code);
        })
        .catch((err) => {
        console.error(`\nError in callbackName:\n`, callbackName, `\n\nError: `, err, `\n`);
        })
        ;
    }

    const showModal = () => {
        // Retrieve DOM element of modal-window pop-up upon users' copy events
        const modal = document.querySelector('.modal-window');
            
        modal.style.opacity = 1;
       
        setTimeout(() => modal.style.opacity=0, 2000)
    }

    return color_hidden ? (
    <h2>&nbsp;</h2>
    ) : (<React.Fragment>
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
                <ColorDetails user={user} input={input} color_props={color_props} imageUrl={imageUrl} />        
            </div>
        </div>
        <div className="saveBtn u-margin-top-small">
        <button 
          className="saveBtn__p"
          onClick={() => { saveColor(); showModal();} } // ColorDetails.jsx saveColor()
        >
          Save to Account
        </button>
        </div>
      </React.Fragment>
    )
}
export default ColorRecognition;
