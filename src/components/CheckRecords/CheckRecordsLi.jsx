import React from 'react';
import classes from './CheckRecords.module.scss';

export default function CheckRecordsLi( { dimensions } ) {

    //console.log(`dimensions.width: ${dimensions.width}`);
    
    // Hacker effects
    const Hacker = () => {
    // Home About Products
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const tabs = document.querySelectorAll(".nav");

    // Convert NodeList to an array
    const tabsArray = Array.from(tabs);

    tabsArray.map((tab) => {
      tab.onmouseover = (event) => { 
        let iterations = 0;

        const dataValue = event.target.dataset.value;

        if (!dataValue) {
          console.log("Missing data-value attribute on the element with class: 'nav' ");
          return;
        } else {
          const interval = setInterval(() => {
            event.target.innerText = event.target.innerText.split("")
            .map((letter, index) => {
              // letters[Math.floor(Math.random() * 26)]
              if (index < iterations) {
                return event.target.dataset.value[index];
              }
              return letters[Math.floor(Math.random() * 26)]
            })
            .join("");
            if(iterations >= event.target.dataset.value.length) { 
              clearInterval(interval);
            }
            iterations += 1;
            
          }, 100);
        }
      }
    })

  }

    return (
        <div className="frosted">
          <li className={`${classes.recordLi}`}>
            <a className={`${classes.lk}`}>Celebirty</a>
            <a className={`${classes.lk}`}>Color</a>
            <a className={`${classes.lk}`}>Age</a>
          </li>  
            {/* <li>
                <a className={`${className}`}
                    id={id}
                    data-value={value}
                    href={href}
                    onMouseEnter={() => Hacker()}
                    style={{
                        fontSize: dimensions.width > 860 ? fontGt : fontLt,
                        borderRadius: dimensions.width < 2800 ? "2rem" : "4rem",
                    }}
                > 
                    {value}
                </a>
            </li> */}
        </div>
    )
};