import React from "react";
import "./ImageLinkForm.css";

// Passing onInputChange event listener as props to App.js
const ImageLinkForm = ({ 
  onInputChange, 
  onCelebrityButton, 
  celebrity_active,
  onColorButton,
  color_active,
  onAgeButton,
  age_active,
}) => {
  return (
    <div className="center" id="container">
      <div id="paragraph">
        <p className="f3">
          {"This Brain will detect Colors or Celebrity faces in your pictures. Give it a try"}
        </p>
      </div>

      <div id="container-inner">
        <div className="form center pa4 br3 shadow-5" id="input">
          <input
            className="f4 pa2 w-70 center"
            id="input-inner"
            type="url"
            onChange={onInputChange}
          />
        </div>
        <div className="buttons">
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onCelebrityButton}
            // disabled={celebrity_active}
          >
            Detect Celebrity
          </button>
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onColorButton}
            // disabled={color_active}
          >
            Detect Color
          </button>
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onAgeButton}
            // disabled={age_active}
          >
            Detect Age
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
