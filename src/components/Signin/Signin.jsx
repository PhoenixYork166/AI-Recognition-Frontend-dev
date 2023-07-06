import React, { Component } from "react";
import classes from './Signin.module.css';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
      lockSignIn: true
    }
  }

  // Listens to onChange events of email && password <input>
  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value }, () => {
      this.validateInputs();
      // console.log('this.state.signInEmail: \n', this.state.signInEmail);
    })
  }

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value }, () => {
      this.validateInputs();
      // console.log('this.state.signInPassword: \n', this.state.signInPassword);
    })
  }

  // App 'Sign In' button onClick event handler
  onSubmitSignIn = (event) => {
    event.preventDefault(); // Stop page from refreshing on Signin form submission

    // Send Sign In info as HTTP POST request to server localhost:3000
    // by fetching our server - localhost:3000/signin
    // fetch(url, {method: '', headers: '', body: JSON.stringify({ email: '', password: ''}) })
    fetch('http://localhost:3000/signin', {
      method: 'post', // Post (Create) to avoid Query Strings
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ // sending stringified this.state variables as JSON objects
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(response => response.json()) // JSON server response to parse data
    .then(user => { // server.js - app.post('/signin') --> res.json(database.users[i])
      console.log('onSubmitSignIn - response: \n', user);
      console.log('onSubmitSignIn - typeof response: \n', typeof user);
      if (user.id) { // if user.id exists
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      } else if (!user.id) { // if user.id does NOT exist
        const signInPasswordInput = document.querySelector('#current-password');
        this.props.onRouteChange('signin');
        alert('Signin credentials incorrect...\nPlease try again');
        signInPasswordInput.value = '';
      }
    })
  }

  validateInputs = () => {
    if (this.state.signInEmail.length > 0 && this.state.signInPassword.length > 0) {
      this.setState({
        lockSignIn: false
      })
    } else {
      this.setState({
        lockSignIn: true
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.lockSignIn !== prevState.lockSignIn) this.validateInputs();
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <div>
        <article className={`${classes.article}`} >
        <main className={`${classes.main}`}>
          <form className="measure">
            <fieldset id="sign_up" className={`${classes.fieldset}`}>
              <legend className={`${classes.legend}`}>Sign In</legend>
              <div className={`${classes.emailContainer}`}>
                <label className={`${classes.emailLabel}`} htmlFor="email-address">
                  Email
                </label>
                <input
                  className={`${classes.emailInput}`}
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className={`${classes.passwordContainer}`}>
                <label className={`${classes.passwordLabel}`} htmlFor="current-password">
                  Password
                </label>
                <input
                  className={`${classes.passwordInput}`}
                  type="password"
                  name="current-password"
                  id="current-password"
                  onChange={this.onPasswordChange}
                />
              </div>
              {/* <label className="pa0 ma0 lh-copy f6 pointer">
                <input type="checkbox" /> Remember me
              </label> */}
            </fieldset>
            <div className="">
              <input
                // onClick={() => onRouteChange('home')}
                onClick={this.onSubmitSignIn}
                disabled={this.state.lockSignIn}
                id={`${classes.signinInput}`}
                type="submit"
                value="Sign in"
              />
            </div>
            <div className={`${classes.registerContainer}`}>
              <p
               onClick={() => onRouteChange('register')} 
               className={`${classes.registerInput}`}>
                Register
              </p>
            </div>
          </form>
        </main>
        </article>
      </div>
    );
  }
};

export default Signin;
