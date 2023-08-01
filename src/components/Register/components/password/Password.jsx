import './Password.scss';
import tick from '../images/tick.jpg';
import cross from '../images/cross2.png';

const Password = ({ onPasswordChange, password12Char }) => {
  
  return (
    <div className="password-box" >
      <label className="password-box__label" htmlFor="password">
        Password
      </label>
      <div className="password-box__secondary">
        <input
          className="password-box__secondary__input"  
          type="password"
          name="password"
          id="password"
          onChange={onPasswordChange}
        />
        <div className="name-box__secondary__tertiary">
            <img
              className="icon"
              type="text"
              name="12CharIcon"
              id="12CharIcon"
              src={password12Char === true ? `${tick}` : `${cross}`}
              alt="12CharIcon"
            />
            <p
              className="icon-p--solid"
            >
              12Char
            </p>
          </div>
        </div>
      </div>
  );
};

export default Password;
