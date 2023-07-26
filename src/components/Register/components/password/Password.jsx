import classes from './Password.module.css';
import tick from '../images/tick.jpg';
import cross from '../images/cross2.png';

const Password = ({ onPasswordChange, password12Char }) => {
  
  return (
    <div className={`${classes.passwordContainer}`}>
      <label className={`${classes.passwordLabel}`} htmlFor="password">
        Password
      </label>
      <div className={`${classes.passwordSubContainer}`}>
        <input
          className={`${classes.passwordInput}`}  
          type="password"
          name="password"
          id="password"
          onChange={onPasswordChange}
        />
        <div className={`${classes.password12CharContainer}`}>
          <div className={`${classes.password12CharIconBox}`}>
            <img
              className={`${classes.password12CharIcon}`}
              type="text"
              name="password12CharIcon"
              id="password12CharIcon"
              src={password12Char === true ? `${tick}` : `${cross}`}
              alt="password12CharIcon"
            />
          </div>
          <div className={`${classes.password12CharInputBox}`}>
            <input
              className={`${classes.password12CharInput}`}
              type="text"
              name="password12CharInput"
              id="password12CharhInput"
              value="12Char"
              disabled="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;
