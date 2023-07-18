import classes from './Email.module.css';
import tick from '../images/tick.jpg';
import cross from '../images/cross2.png';

const Email = ( { onEmailChange, emailValid } ) => {
    return (
      <div className={`${classes.emailContainer}`}>
      <div className={`${classes.emailLabel}`}>
        <label className={`${classes.emailLabelInner}`} htmlFor="email">
          Email
        </label>
      </div>
      <div className={`${classes.emailSubContainer}`}>
        <div className={`${classes.emailInputContainer}`}>
          <input
            className={`${classes.emailInputInner}`}  
            type="text"
            name="email"
            id="email"
            onChange={onEmailChange}
          />
        </div>
        <div className={`${classes.emailIconEmptyContainer}`}>
          <div className={`${classes.emailIcon}`}>
            <img
              className={`${classes.emailIconInner}`}
              type="text"
              name="emailIcon"
              id="emailIcon"
              src={emailValid === true ? `${tick}` : `${cross}`}
              alt="emailIcon"
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

export default Email;