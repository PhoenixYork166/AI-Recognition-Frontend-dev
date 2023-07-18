import classes from './Password.module.css';
import tick from '../images/tick.jpg';
import cross from '../images/cross2.png';

const Password = ({ onPasswordChange, password12Char }) => {
  
  return (
    <div className={`${classes.passwordContainer}`}>
      <div className={`${classes.passwordLabel}`}>
        <label className={`${classes.passwordLabelInner}`} htmlFor="password">
          Password
        </label>
      </div>
      <div className={`${classes.passwordSubContainer}`}>
        <div className={`${classes.passwordInputContainer}`}>
          <input
            className={`${classes.passwordInputInner}`}  
            type="password"
            name="password"
            id="password"
            onChange={onPasswordChange}
          />
        </div>
        <div className={`${classes.password12CharContainer}`}>
          <div className={`${classes.password12CharIcon}`}>
            <img
              className={`${classes.password12CharIconInner}`}
              type="text"
              name="password12CharIcon"
              id="password12CharIcon"
              src={password12Char === true ? `${tick}` : `${cross}`}
              alt="password12CharIcon"
            />
          </div>
          <div className={`${classes.password12CharInput}`}>
            <input
              className={`${classes.password12CharInputInner}`}
              type="text"
              name="password12CharInput"
              id="password12CharhInput"
              value="12Char"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;
