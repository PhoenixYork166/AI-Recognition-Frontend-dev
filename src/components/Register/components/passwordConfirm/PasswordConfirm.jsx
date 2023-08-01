import './PasswordConfirm.scss';
import tick from '../images/tick.jpg';
import cross from '../images/cross2.png';

const PasswordConfirm = ({ onPasswordConfirmChange, password1SpecialChar }) => {
  
  return (
    <div className="passwordConfirm-box" >
      <label className="passwordConfirm-box__label" htmlFor="name">
        Confirm Password
      </label>
      <div className="passwordConfirm-box__secondary">
        <input
          className="passwordConfirm-box__secondary__input"  
          type="password"
          name="password"
          id="password"
          onChange={onPasswordConfirmChange}
        />
        <div className="name-box__secondary__tertiary">
            <img
              className="icon"
              type="text"
              name="password1SpecialChar"
              id="password1SpecialChar"
              src={password1SpecialChar === true ? `${tick}` : `${cross}`}
              alt="password1SpecialChar"
            />
            <p
              className="icon-p-empty"
            >
              1Symbol
            </p>
          </div>
        </div>
      </div>
  );
};

export default PasswordConfirm;
