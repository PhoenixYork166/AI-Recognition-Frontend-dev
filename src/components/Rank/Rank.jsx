import React from "react";
import './Rank.css';

const Rank = ( { name, entries } ) => {
  return (
    <div className="container">
      <div className='greet'>
        {`${name}, your current entry count is...`}
      </div>
      <div className='count'>
        #{entries}
      </div>
    </div>
  );
};

export default Rank;
