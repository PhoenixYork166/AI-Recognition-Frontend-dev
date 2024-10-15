import React from "react";
import './ImageLinkForm.scss';

// Passing onInputChange event listener as props to App.js
const ImageLinkForm = ({ 
  onInputChange, 
  onCelebrityButton, 
  onColorButton,
  onAgeButton,
}) => {
  const placeholder = `Enter .jpg hyperlink e.g. https://wiki.org/image.jpg`;
  return (
    <div className="container row">
      <div className="col-4-of-5">
        <div className="link-form">
          <p className="link-form__paragraph">
            {"This Brain will detect Colors or Celebrity faces in your pictures. Give it a try"}
          </p>
        </div>
        <div className="link-container">
          <input
            className="link-container__input"
            id="input-inner"
            type="url"
            placeholder={placeholder}
            onChange={onInputChange}
          />
        </div>
      </div>
      
      <div className="col-1-of-5 buttons-box">
        <div className="buttons">
          <button
            className="buttons__btn"
            onClick={onCelebrityButton}
          >
            Detect Celebrity
          </button>
          <button
            className="buttons__btn"
            onClick={onColorButton}
          >
            Detect Color
          </button>
          <button
            className="buttons__btn"
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
