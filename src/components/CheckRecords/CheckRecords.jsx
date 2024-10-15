import React, { useState, useEffect } from "react";
import classes from "./CheckRecords.module.scss";

import CheckRecordsLi from "./CheckRecordsLi";
import Logo from "../Logo/Logo";
import { FaList } from "react-icons/fa";
import { ImCross } from "react-icons/im";

// Parent component
export default function CheckRecords({ isSignedIn, onRouteChange }) {
  // Keep monitor resolution changes
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const aboutImgWidth = Math.floor(dimensions.width * 0.3);
  //console.log(`aboutImgWidth: ${aboutImgWidth}`);
  const aboutImgMarginLeft = Math.floor(dimensions.width*0.192*0.5);
  //console.log(`aboutImageMarginLeft: ${aboutImgMarginLeft}`);
  const headingSize = Math.floor(dimensions.width * 0.035);
  //console.log(`headingSize: ${headingSize}`);
  
  // For Nav List hidden items margin-bottom
  // window.dimensions.width < 850
  const navListMarginBottomLt = Math.floor(dimensions.width * 0.1);

  // window.dimensions.width >= 850
  const navListMarginBottomGt = Math.floor(dimensions.width * 0.1);
  const navListMarginBottomGGt = Math.floor(navListMarginBottomGt * 2.0);
  //console.log(`navListMarginBottom: ${navListMarginBottom}`);

  // For Nav List items font sizes
  // When window.inner.width >= 860px
  // fontGt scale must be < fontLt scale
  const fontGt = Math.floor(dimensions.width * 0.016);
  //console.log(`fontGt(px): ${fontGt}`);

  // For Nav List item font sizes
  // When window.inner.width < 860px
  // fontLt scale must be > fontGt scale
  const fontLt = Math.floor(dimensions.width * 0.03);
  //console.log(`fontLt(px): ${fontLt}`);

  // For FaList (Menu) symbol
  const FaListWidth = Math.floor(dimensions.width * 0.12);
  const mobileBreakpoint = 860;

  useEffect(() => {
      function handleResize() {
        setDimensions({
          height: window.innerHeight,
          width: window.innerWidth,
        });
      }
      window.addEventListener("resize", handleResize);
      // Clear memory leak
      return (_) => {
        window.removeEventListener("resize", handleResize);
      };
  });
  
  // Nav toggle
  const [toggle, setToggle] = useState(false);

  const onToggle = () => {
    setToggle((toggle) => !toggle);
  };

  function NavLt860() {
    return toggle ? <NavLt860List /> : <NavLt860Hide />;
  }

  function NavLt860List() {
    return (
      <div className={classes.navShow} >
        <div className={classes.navShowList} >
          <Logo className={classes.logo} value="Evertex" />
          <ImCross
            onClick={onToggle}
            //size={30}
            className={classes.imcross}
            size={FaListWidth*0.8}
            style={{
              borderRadius: "1rem",
            }}
          />
        </div>
        <CheckRecordsLi
                fontGt={fontGt}
                fontLt={fontLt}
                dimensions={dimensions}
        />
      </div>
    );
  }

  function NavLt860Hide() {
    return (
      <div
        className={classes.navHideList}
        style={{
          marginBottom: dimensions.width < mobileBreakpoint ? 
            navListMarginBottomLt : navListMarginBottomGt
        }}
      >
        <div style={{marginLeft: "4%"}}>
          <Logo className={classes.logo} value="Evertex" />
          {/* <h3 className ={classes.logo__h3}>EVERTEX</h3> */}
            {/* Logo Text when Resolution < 860 px */}
        </div>

        <FaList
          onClick={onToggle}
          size={FaListWidth}
          className={classes.falist}
          style={{
            width: dimensions.width < mobileBreakpoint ? FaListWidth : ""
          }}
        />
      </div>
    );
  }

  function NavGt860() {
    return (
      <div 
        className={classes.navgt}
        style={{
          // Nav List Margin bottom
          marginBottom: dimensions.width < 2800 ? navListMarginBottomGt : navListMarginBottomGGt
        }}
      >
        <div
          style={{
            width: "40%",
            paddingLeft: "0%",
            alignItems: "center",
            height: "100%",
            marginTop: 5,
          }}
        >
          <Logo className={classes.logo} value="Smart Brain" />
        </div>
        <div className={`${classes.nav}`}>
          <ul className={`${classes.ls} ${classes.frosted}`}>
            <CheckRecordsLi
                  fontGt={fontGt}
                  fontLt={fontLt}
                  dimensions={dimensions}
            />
          </ul>
        </div>
      </div>
    );
  }

  return (
    isSignedIn
      ? (dimensions.width > mobileBreakpoint 
         ? <NavGt860 /> 
         : <NavLt860 />)
      : <p>&nbsp;</p>
  );

  // return dimensions.width > mobileBreakpoint ? <NavGt860 /> : <NavLt860 />;
}


