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

  // Retrieve DOM element of modal-window pop-up upon users' copy events
  const modal = document.querySelector('.modal-window');
  // const modal_opacity_seventy = () => {
  //   modal.style.opacity = 0.7;
  // };
  // const modal_opacity_fifty = () => {
  //   modal.style.opacity = 0.5;
  // };
  // const modal_opacity_twenty = () => {
  //   modal.style.opacity = 0.2;
  // };
  // const modal_opacity_zero = () => {
  //   modal.style.opacity = 0;
  // };

  // Allow user to copy each raw hex value by clicking on it
  for (let i=0; i < length; i++) {
    const element = raw_hex_elements[i];

    const clickHandler = () => {
      navigator.clipboard.writeText(element.value)
      .then( () => {
        modal.style.opacity = 1;
      })
      .then(() => {
        setTimeout(() => modal.style.opacity=0.85, 800)
      })
      .then(() => {
        setTimeout(() => modal.style.opacity=0.6, 2400)
      })
      .then(() => {
        setTimeout(() => modal.style.opacity=0.3, 4200)
      })
      .then(() => {
        setTimeout(() => modal.style.opacity=0.1, 5500)
      })
      .then(() => {
        setTimeout(() => modal.style.opacity=0.05, 5800)
      })
      .then(() => {
        setTimeout(() => modal.style.opacity=0, 6100)
      })
      .catch(err => {
        console.error("Failed to copy raw hex: ", err);
      });
    };

    element.addEventListener("click", clickHandler);
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
