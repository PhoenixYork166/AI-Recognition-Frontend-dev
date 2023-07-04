import classes from './PasswordConfirm.module.css';
import tick from './tick.jpg';
import cross from './cross2.png';

const PasswordConfirm = ({ onPasswordConfirmChange, password1SpecialChar }) => {
  
  return (
    <div className={`${classes.passwordConfirmContainer}`}>
      <div className={`${classes.passwordConfirmLabel}`}>
        <label className={`${classes.passwordConfirmLabelInner}`} htmlFor="passwordConfirmation">
          Confirm Password
        </label>
      </div>
      <div className={`${classes.passwordConfirmSubContainer}`}>
        <div className={`${classes.passwordConfirmInputContainer}`}>
          <input
            className={`${classes.passwordConfirmInputInner}`}  
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            onChange={onPasswordConfirmChange}
          />
        </div>
        <div className={`${classes.password1SepcialCharContainer}`}>
          <div className={`${classes.password1SpecialCharIcon}`}>
            <img
              className={`${classes.password1SpecialCharIconInner}`}
              type="text"
              name="password1SpecialCharIcon"
              id="password1SpecialCharIcon"
              src={password1SpecialChar === true ? `${tick}` : `${cross}`}
              alt="password1SpecialCharIcon"
            />
          </div>
          <div className={`${classes.password1SpecialCharInput}`}>
            <input
              className={`${classes.password1SpecialCharInputInner}`}
              type="text"
              name="password1SpecialCharInput"
              id="password1SpecialCharhInput"
              value="1Symbol"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordConfirm;
