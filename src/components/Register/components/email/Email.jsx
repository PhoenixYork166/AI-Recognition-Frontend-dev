import classes from './Email.module.css';
import './Email.scss';
import tick from '../images/tick.jpg';
import cross from '../images/cross2.png';

const Email = ( { onEmailChange, emailValid } ) => {

    return (
      <div className="email-box" >
      <label className="email-box__label" htmlFor="email">
        Email
      </label>
      <div className="email-box__secondary">
        <input
          className="email-box__secondary__input"  
          type="email"
          name="email"
          id="email"
          onChange={onEmailChange}
        />
        <div className="email-box__secondary__tertiary">
            <img
              className="icon"
              type="text"
              name="emailIcon"
              id="emailIcon"
              src={emailValid === true ? `${tick}` : `${cross}`}
              alt="emailIcon"
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

export default Email;