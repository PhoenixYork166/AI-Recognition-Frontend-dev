// Parent component
// src/App.js
import React from 'react';
// import Rank from '../../components/Rank/Rank';
import CheckRecordsPanel from '../../components/CheckRecords/CheckRecordsPanel';


// Parent component
// src/App.js
const ColorRecords = ( {
    user,
    isSignedIn
} ) => {

    return (
        <React.Fragment>
            {/* <Logo /> */}
            {/* <Rank 
            name={name}
            entries={entries}
            /> */}
            {/* <CheckRecordsPanel 
                user={user} 
                isSignedIn={isSignedIn}
            /> */}
            <h1>Showing Color Records</h1>
        </React.Fragment>
    )
};

export default ColorRecords;