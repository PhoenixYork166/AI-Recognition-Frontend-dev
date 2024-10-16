import React, { useState, useEffect } from 'react';
import classes from './CheckRecords.module.scss';
// Util
import useButtonTextRoll from '../../util/buttonTextRoll';

// Parent component
// src/components/CheckRecords/CheckRecordsPanel.jsx
export default function CheckRecordsLi( {
  user, 
  dimensions,
  onRouteChange,
  resetState 
} ) {
  const tabs = document.querySelectorAll('.buttons__btn');

  // CheckRecordsPanel => CheckRecordsLi 'Color Records' button onClick event handler
  const onColorRecords = (event) => {
    // event.preventDefault(); // Stop page from refreshing onColorRecords button form submission

    onRouteChange('colorRecords');
    // Send Sign In info as HTTP POST request to server localhost:3001
    // by fetching our server - localhost:3001/get-user-color
    // fetch(url, {method: '', headers: '', body: JSON.stringify({ userId: user.id }) })

    const devGetUserColorRecordsUrl = 'http://localhost:3001/get-user-color';
    const prodGetUserColorRecordsUrl = 'https://ai-recognition-backend.onrender.com/get-user-color';

    const fetchUrl = process.env.NODE_ENV === 'production' ? prodGetUserColorRecordsUrl : devGetUserColorRecordsUrl;

    // Fetching http://localhost:3001/signin to retrieve user
    fetch(fetchUrl, {
      method: 'post', // Post (Create) to avoid Query Strings
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ // sending stringified this.state.userId variable as a JSON object
        userId: user.id
      })
    })
    .then(response => response.json()) // Receiving http://localhost:3001/get-user-color from Node server response => JSON.parse() data
    .then((response) => { // server.js - app.post('/get-user-color') --> res.json(database.users[i])
      console.log('onColorRecords - response.userId: \n', response.userId, `\n`);
      console.log('onColorRecords - response.colorData: \n', response.colorData, `\n`);

      if (response.userId) { // if response.userId exists upon successful fetching from db
        onRouteChange('colorRecords');
      } else if (!response.userId) { // if response.userId does NOT exist
        // Route to 'signin' page
        onRouteChange('signin');
      }
    })
  }
    
  return (
    <React.Fragment>
    <div className="buttons">
      <button 
        // onClick={onRouteChange('celebrityRecords')}
        onMouseEnter={useButtonTextRoll(tabs)}
        data-value="Celebrity records" 
        className={`${classes.lk} buttons__btn`}
      >
        Celebirty records
      </button>
      <button 
        onClick={onColorRecords}
        onMouseEnter={useButtonTextRoll(tabs)} 
        data-value="Color records"
        className={`${classes.lk} buttons__btn`}
      >
        Color records
      </button>
      <button 
        // onClick={onRouteChange('ageRecords')}
        onMouseEnter={useButtonTextRoll(tabs)} 
        data-value="Age records"
        className={`${classes.lk} buttons__btn`}
      >
        Age records
      </button>
    </div>
    </React.Fragment>
    )
};