import classes from './PasswordConfirm.module.css';
import tick from '../images/tick.jpg';
import cross from '../images/cross2.png';

const PasswordConfirm = ({ onPasswordConfirmChange, password1SpecialChar }) => {
  
  return (
    <div className={`${classes.passwordConfirmContainer}`}>
      <label className={`${classes.passwordConfirmLabel}`} htmlFor="passwordConfirmation">
        Confirm Password
      </label>
      <div className={`${classes.passwordConfirmSubContainer}`}>
        <input
          className={`${classes.passwordConfirmInput}`}  
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          onChange={onPasswordConfirmChange}
        />
        <div className={`${classes.password1SepcialCharContainer}`}>
          <div className={`${classes.password1SpecialCharIconBox}`}>
            <img
              className={`${classes.password1SpecialCharIconInner}`}
              type="text"
              name="password1SpecialCharIcon"
              id="password1SpecialCharIcon"
              src={password1SpecialChar === true ? `${tick}` : `${cross}`}
              alt="password1SpecialCharIcon"
            />
          </div>
          <div className={`${classes.password1SpecialCharInputBox}`}>
            <input
              className={`${classes.password1SpecialCharInput}`}
              type="text"
              name="password1SpecialCharInput"
              id="password1SpecialCharhInput"
              value="1Symbol"
              disabled="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordConfirm;
