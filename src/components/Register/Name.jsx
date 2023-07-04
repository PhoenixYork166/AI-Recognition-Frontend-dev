import classes from './Name.module.css';
import tick from './tick.jpg';
import cross from './cross2.png';

const Name = ( { onNameChange, nameValid } ) => {

    return (
    <div className={`${classes.nameContainer}`}>
      <div className={`${classes.nameLabel}`}>
        <label className={`${classes.nameLabelInner}`} htmlFor="name">
          Name
        </label>
      </div>
      <div className={`${classes.nameSubContainer}`}>
        <div className={`${classes.nameInputContainer}`}>
          <input
            className={`${classes.nameInputInner}`}  
            type="text"
            name="name"
            id="name"
            onChange={onNameChange}
          />
        </div>
        <div className={`${classes.nameIconEmptyContainer}`}>
          <div className={`${classes.nameIcon}`}>
            <img
              className={`${classes.nameIconInner}`}
              type="text"
              name="nameIcon"
              id="nameIcon"
              src={nameValid === true ? `${tick}` : `${cross}`}
              alt="nameIcon"
            />
          </div>
          <div className={`${classes.empty}`}>
            <p
              className={`${classes.emptyInner}`}
            />
          </div>
        </div>
      </div>
    </div>
    )
};

export default Name;