import './Name.scss';
import tick from '../images/tick.jpg';
import cross from '../images/cross2.png';

const Name = ( { onNameChange, nameValid } ) => {

    return (
    <div className="name-box" >
      <label className="name-box__label" htmlFor="name">
        Name
      </label>
      <div className="name-box__secondary">
        <input
          className="name-box__secondary__input"  
          type="text"
          name="name"
          id="name"
          onChange={onNameChange}
        />
        <div className="name-box__secondary__tertiary">
            <img
              className="icon"
              type="text"
              name="nameIcon"
              id="nameIcon"
              src={nameValid === true ? `${tick}` : `${cross}`}
              alt="nameIcon"
            />
            <p
              className="icon-p-empty"
            >

            </p>
          </div>
        </div>
      </div>
    )
};

export default Name;