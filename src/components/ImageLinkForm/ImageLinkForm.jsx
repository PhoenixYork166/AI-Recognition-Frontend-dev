import React from "react";
import './ImageLinkForm.css';

// Passing onInputChange event listener as props to App.js
const ImageLinkForm = ({ 
  onInputChange, 
  onCelebrityButton, 
  onColorButton,
  onAgeButton,
}) => {
  const placeholder = `Enter .jpg hyperlink e.g. https://wiki.org/image.jpg`;
  return (
    <div className="center" id="container">
      <div id="paragraph">
        <p className="paragraph-inner">
          {"This Brain will detect Colors or Celebrity faces in your pictures. Give it a try"}
        </p>
      </div>

      <div id="container-inner">
        <div className="link-container">
          <input
            id="input-inner"
            type="url"
            placeholder={placeholder}
            onChange={onInputChange}
          />
        </div>
        <div className="buttons">
          <button
            className="detect-celebrity"
            onClick={onCelebrityButton}
          >
            Detect Celebrity
          </button>
          <button
            className="detect-color"
            onClick={onColorButton}
          >
            Detect Color
          </button>
          <button
            className="detect-age"
            onClick={onAgeButton}
          >
            Detect Age
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
