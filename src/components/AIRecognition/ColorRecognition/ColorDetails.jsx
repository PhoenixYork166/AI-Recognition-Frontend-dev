import "./ColorDetails.css";

const ColorDetails = ({ color_props }) => {
  const hex = color_props.map((each) => {
    return each.colors.raw_hex;
  });

  const w3c_hex = color_props.map((each) => {
    return each.colors.w3c.hex;
  });

  const w3c_name = color_props.map((each) => {
    return each.colors.w3c.name;
  });

  // Using querySelectors to retrieve all Raw Hex values as DOM objects
  const length = document.getElementsByClassName('raw-hex-input').length;
  const raw_hex_elements = document.getElementsByClassName('raw-hex-input');
  const w3c_name_elements = document.getElementsByClassName('w3c-name-input');
  const w3c_hex_elements = document.getElementsByClassName('w3c-hex-input-inner');

  // Retrieve DOM element of modal-window pop-up upon users' copy events
  const modal = document.querySelector('.modal-window');

  // Allow user to copy values by clicking on it
  for (let i=0; i < length; i++) {
    
    // Allow users to copy raw_hex values from web-app
    const raw_hex_element = raw_hex_elements[i];

    const raw_hex_clickHandler = () => {
      navigator.clipboard.writeText(raw_hex_element.value)
      .then( () => {
        modal.style.opacity = 1;
      })
      .then(() => {
        setTimeout(() => modal.style.opacity=0.85, 2000)
      })
      .then(() => {
        setTimeout(() => modal.style.opacity=0.3, 6000)
      })
      .then(() => {
        setTimeout(() => modal.style.opacity=0, 6500)
      })
      .catch(err => {
        console.error("Failed to copy raw hex: ", err);
      });
    };
    raw_hex_element.addEventListener("click", raw_hex_clickHandler);


    // Allow users to copy w3c color name from web-app
    const w3c_name_element = w3c_name_elements[i];
    
    const w3c_name_clickHandler = () => {
      navigator.clipboard.writeText(w3c_name_element.value)
      .then( () => {
        modal.style.opacity = 1;
      })
      .then(() => {
        setTimeout(() => modal.style.opacity=0.85, 2000)
      })
      .then(() => {
        setTimeout(() => modal.style.opacity=0.3, 6000)
      })
      .then(() => {
        setTimeout(() => modal.style.opacity=0, 6500)
      })
      .catch(err => {
        console.error("Failed to copy raw hex: ", err);
      });
    };
    w3c_name_element.addEventListener('click', w3c_name_clickHandler);
    
    // Allow users to copy w3c hex values from web-app
    const w3c_hex_element = w3c_hex_elements[i];
    
    const w3c_hex_clickHandler = () => {
      navigator.clipboard.writeText(w3c_hex_element.value)
      .then( () => {
        modal.style.opacity = 1;
      })
      .then(() => {
        setTimeout(() => modal.style.opacity=0.85, 1000)
      })
      .then(() => {
        setTimeout(() => modal.style.opacity=0.3, 2000)
      })
      .then(() => {
        setTimeout(() => modal.style.opacity=0, 3000)
      })
      .catch(err => {
        console.error("Failed to copy raw hex: ", err);
      });
    };
    w3c_hex_element.addEventListener('click', w3c_hex_clickHandler);
    
  };


  return (
    <div className="color-name">
      {color_props.map((each) => {
        return (
          <div className="color-page">
            <table className="color-table">
              <tr>
                <th>Color</th>
                <th>Raw hex</th>
                <th>Raw hex val</th>
                <th>W3C Color</th>
                <th>W3C Color Name</th>
                <th>W3C hex</th>
              </tr>
              <tr>
                <td>
                  <input type="color" value={each.colors.raw_hex} disabled={false}/>
                </td>
                <td>
                  <input
                    type="text"
                    className="raw-hex-input"
                    value={each.colors.raw_hex}
                    // onClick={() =>
                    //   navigator.clipboard.writeText(hex).then(() => {
                    //     alert("All Raw hex copied!");
                    //   })
                    // }
                  />
                </td>
                <td>{each.colors.value}</td>
                <td>
                  <input type="color" value={each.colors.w3c.hex} />
                </td>
                <td>
                    <div className="w3c-name">
                        <input 
                          className="w3c-name-input"
                          type="text"
                          value={each.colors.w3c.name}
                          // onClick={() => navigator.clipboard.writeText(w3c_name).then(() => {
                          //   alert("All WC3 name copied!");
                          // })
                          // }
                        />
                    </div>
                    </td>
                <td>
                  <div className="w3c-hex-input">
                    <input
                      className='w3c-hex-input-inner'
                      type="text"
                      value={each.colors.w3c.hex}
                      // onClick={() =>
                      //   navigator.clipboard.writeText(w3c_hex).then(() => {
                      //     alert("All W3C hex copied!");
                      //   })
                      // }
                    />
                  </div>
                </td>
                {/* <input class="color1" type="color" name="color1" value="#00ff00"></input> */}
              </tr>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default ColorDetails;
