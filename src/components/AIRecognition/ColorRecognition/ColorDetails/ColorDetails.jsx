import Loading from '../../../Loading/Loading';
import './ColorDetails.css';
// import '../../../ImageLinkForm/ImageLinkForm.scss';
import '../../../AIRecognition/ColorRecognition/ColorRecognition.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Parent = src/components/AIRecognition/ColorRecognition/ColorRecognition.jsx
const ColorDetails = ({ user, input, color_props, imageUrl }) => {
  const [imageBlob, setImageBlob] = useState(''); // Blob { size: Number, type: String, userId: undefined }
  const [resData, setResData] = useState('');
  const [colorProps, setColorProps] = useState(color_props);


  // Using querySelectors to retrieve all Raw Hex values as DOM objects
  const length = document.getElementsByClassName('raw-hex').length;
  const raw_hex_elements = document.getElementsByClassName('raw-hex');
  const w3c_name_elements = document.getElementsByClassName('w3c-name');
  const w3c_hex_elements = document.getElementsByClassName('w3c-hex');

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

  // Retrieve DOM element of modal-window pop-up upon users' copy events
  const modal = document.querySelector('.modal-window');

  // Allow user to copy values by clicking on it
  for (let i=0; i < length; i++) {
    
    // Allow users to copy raw_hex values from web-app
    const raw_hex_element = raw_hex_elements[i];

    const raw_hex_clickHandler = () => {
      navigator.clipboard.writeText(raw_hex_element.value)
      .then( () => {
        modal.style.opacity = 1;
      })
      .then(() => {
        // Pop-up disappears in 2 seconds
        setTimeout(() => modal.style.opacity=0, 2000)
      })
      .catch(err => {
        console.error("\nFailed to copy raw hex: ", err);
      });
    };
    raw_hex_element.addEventListener("click", raw_hex_clickHandler);
    


    // Allow users to copy w3c color name from web-app
    const w3c_name_element = w3c_name_elements[i];
    
    const w3c_name_clickHandler = () => {
      navigator.clipboard.writeText(w3c_name_element.value)
      .then( () => {
        modal.style.opacity = 1;
      })
      .then(() => {
        setTimeout(() => modal.style.opacity=0, 2000)
      })
      .catch(err => {
        console.error("Failed to copy w3c_name: ", err);
      });
    };
    w3c_name_element.addEventListener('click', w3c_name_clickHandler);
    
    // Allow users to copy w3c hex values from web-app
    const w3c_hex_element = w3c_hex_elements[i];
    
    const w3c_hex_clickHandler = () => {
      navigator.clipboard.writeText(w3c_hex_element.value)
      .then( () => {
        modal.style.opacity = 1;
      })
      .then(() => {
        setTimeout(() => modal.style.opacity=0, 2000)
      })
      .catch(err => {
        console.error("Failed to copy w3c hex: ", err);
      });
    };
    w3c_hex_element.addEventListener('click', w3c_hex_clickHandler);
  };

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
    const devSaveColorUrl = 'http://localhost:3000/save-user-color';
    const prodSaveColorUrl = 'http://localhost:3000/save-user-color';

    const color_props_array = color_props;
    
    const fetchUrl = process.env.NODE_ENV === 'production' ? prodSaveColorUrl : devSaveColorUrl;

    // Assuming resData is the Blob
    const base64Metadata = await blobToBase64(resData);
  
    const imageRecord = {
      userId: user.id,
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
    
    const bodyData = JSON.stringify({ imageRecord, imageDetails });

    console.log(`\nColorDetails src/App.js user: `, user, `\n`);
    console.log(`\nColorDetails color_props: `, color_props, `\n`);
    console.log(`\nColorDetails input: `, input, `\n`);
    console.log(`\nColorDetails saveColor imageRecord:\n`, imageRecord, `\n`);
    console.log(`\nColorDetails saveColor imageDetails:\n`, imageDetails, `\n`);
    console.log(`\nColorDetails saveColor JSON.stringify({ imageRecord, imageDetails }):\n\nbodyData:\n`, bodyData, `\n`);

    fetch(fetchUrl, {
      method: 'post', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ // sending stringified this.state variables as JSON objects
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
  
  return (
    <React.Fragment>
    <div className="color-name">
      {color_props.map((each) => {
        return (
          <div className="color-page">
            <table className="color-table">
              <tr>
                <th>Color</th>
                <th>Raw hex</th>
                <th>Raw hex val</th>
                <th>W3C Color</th>
                <th>W3C Color Name</th>
                <th>W3C hex</th>
              </tr>
              <tr>
                <td>
                  <input 
                  type="color" 
                  value={each.colors.raw_hex} 
                  className="color"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="raw-hex"
                    value={each.colors.raw_hex}
                  />
                </td>
                <td>{each.colors.value}</td>
                <td>
                  <input 
                    className="w3c-color"
                    type="color" 
                    value={each.colors.w3c.hex} 
                  />
                </td>
                <td>
                  <input 
                    className="w3c-name"
                    type="text"
                    value={each.colors.w3c.name}
                  />
                </td>
                <td>
                  <input
                    className='w3c-hex'
                    type="text"
                    value={each.colors.w3c.hex}
                  />
                </td>
                {/* <input class="color1" type="color" name="color1" value="#00ff00"></input> */}
              </tr>
            </table>
          </div>          
        );
      })}
    </div>
    <br />
    <div className="saveBtn">
      {/* Render nothing if length !> 0 */}
      {colorProps.length > 0 ? 
        <button 
        className="saveBtn__p"
        onClick={saveColor} // ColorDetails.jsx saveColor()
        >
          Save to Account
        </button>
      : <Loading />
      }
      {/* Modal Window for saving a Color Record */}
      <div className='modal-window'>
          <h1 class='modal-window--inner'>
            Saved!
          </h1>
      </div>
    </div>
    {/* <br/>
    <h2>Test Metadata Blob:</h2>
    <img alt="test-blob" src={imageBlob} /> */}
    </React.Fragment>
  );
};

export default ColorDetails;
