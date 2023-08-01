import classes from './Name.module.css';
import tick from '../images/tick.jpg';
import cross from '../images/cross2.png';

const Name = ( { onNameChange, nameValid } ) => {

    return (
    <div className={`${classes.nameContainer}`}>
      <label className={`${classes.nameLabel}`} htmlFor="name">
        Name
      </label>
      <div className={`${classes.nameSubContainer}`}>
        <input
          className={`${classes.nameInput}`}  
          type="text"
          name="name"
          id="name"
          onChange={onNameChange}
        />
        <div className={`${classes.nameIconEmptyContainer}`}>
          <div className={`${classes.nameIconBox}`}>
            <img
              className={`${classes.nameIcon}`}
              type="text"
              name="nameIcon"
              id="nameIcon"
              src={nameValid === true ? `${tick}` : `${cross}`}
              alt="nameIcon"
            />
          </div>
          <div className={`${classes.emptyBox}`}>
            <p
              className={`${classes.empty}`}
            />
          </div>
        </div>
      </div>
    </div>
    )
};

export default Name;