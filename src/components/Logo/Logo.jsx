<<<<<<< HEAD
import React from "react";
import Tilt from "react-parallax-tilt";
import './Logo.css';
import brain from './smart-brain.jpg';

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt className="Tilt br2 shadow2" options={{ max: 55 }} style={{ height: "150px", width: "150px", backgroundColor: "purple" }}>
        <div className="Tilt-inner pa3">
            <img 
             style={{paddingTop: '5px'}} 
             src={brain} 
             alt="smart brain" 
            />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
=======
import React from "react";
import Tilt from "react-parallax-tilt";
import './Logo.css';
import brain from './smart-brain.jpg';

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt className="Tilt br2 shadow2" options={{ max: 55 }} style={{ height: "150px", width: "150px", backgroundColor: "purple" }}>
        <div className="Tilt-inner pa3">
            <img 
             style={{paddingTop: '5px'}} 
             src={brain} 
             alt="smart brain" 
            />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
>>>>>>> d7f1c00d012083fb6955d68e956c0eead0a877b1
