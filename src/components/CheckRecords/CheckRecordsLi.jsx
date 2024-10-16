import React from 'react';
import classes from './CheckRecords.module.scss';
// Util
import useButtonTextRoll from '../../util/buttonTextRoll';

// Parent component
// src/components/CheckRecords/CheckRecords.jsx
export default function CheckRecordsLi( { dimensions } ) {
  const tabs = document.querySelectorAll('.buttons__btn');
    
  return (
    <React.Fragment>
    <div className="buttons">
      <button 
        onMouseEnter={useButtonTextRoll(tabs)}
        data-value="Celebrity records" 
        className={`${classes.lk} buttons__btn`}
      >
        Celebirty records
      </button>
      <button 
        onMouseEnter={useButtonTextRoll(tabs)} 
        data-value="Color records"
        className={`${classes.lk} buttons__btn`}
      >
        Color records
      </button>
      <button 
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