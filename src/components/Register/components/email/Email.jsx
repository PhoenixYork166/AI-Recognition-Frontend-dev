import classes from './Email.module.css';
import tick from '../images/tick.jpg';
import cross from '../images/cross2.png';

const Email = ( { onEmailChange, emailValid } ) => {
    return (
      <div className={`${classes.emailContainer}`}>
      <div className={`${classes.emailLabelBox}`}>
        <label className={`${classes.emailLabel}`} htmlFor="email">
          Email
        </label>
      </div>
      <div className={`${classes.emailSubContainer}`}>
          <input
            className={`${classes.emailInput}`}  
            type="text"
            name="email"
            id="email"
            onChange={onEmailChange}
          />
        <div className={`${classes.emailIconEmptyContainer}`}>
          <div className={`${classes.emailIconBox}`}>
            <img
              className={`${classes.emailIcon}`}
              type="text"
              name="emailIcon"
              id="emailIcon"
              src={emailValid === true ? `${tick}` : `${cross}`}
              alt="emailIcon"
            />
          </div>
          <div className={`${classes.emptyBox}`}>
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