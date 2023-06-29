import React, { Component } from "react";
import classes from './Register.module.css';
import tick from './tick.jpg';
import cross from './cross2.png';

// Make Register a smart component to process states
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameValid: false,
      email: '',
      emailValid: false,
      password: '',
      passwordConfirm: '',
      lockRegister: true,
      password12Char: false,
      password1SpecialChar: false,
      passwordMatch: false
    }
  }
  
  // Listens to onChange events of name <input>
  // Trigger this.validateInputs() whenever there's any changes
  onNameChange = (event) => {
    this.setState({ name: event.target.value }, () => {
      this.validateInputs();
      console.log('this.state.signInEmail: \n', this.state.signInEmail);
    })
  }
  
  // Listens to onChange events of email && password <input>
  onEmailChange = (event) => {
    this.setState({ email: event.target.value }, () => {
      this.validateInputs();
      console.log('this.state.email: \n', this.state.email);
    })
  }

  onPasswordChange = (event) => {
    const newPassword = event.target.value;
    this.setState({ password: newPassword }, () => {
      this.validateInputs();
      console.log('this.state.password: \n', this.state.password);
    })
  }

  onPasswordConfirmChange = (event) => {
    const newPasswordConfirm = event.target.value;
    this.setState({ passwordConfirm: newPasswordConfirm }, () => {
      this.validateInputs();
      console.log('this.state.passwordConfirm: \n', this.state.passwordConfirm);
    })
  }

  // To validate users' inputs in <Register />
  validateInputs = () => {    
        
        // Validate name input 
        if (this.state.name.length > 0) {
          this.setState({
            nameValid: true
          }, () => {
            console.log(`this.state.name.length:\n${this.state.name.length}`);
            console.log(`this.state.nameValid:\n${this.state.nameValid}`);
          })
        } else {
          this.setState({
            nameValid: false,
            lockRegister: true
          }, () => {
            console.log(`this.state.nameValid:\n${this.state.nameValid}`);
            console.log(`this.state.lockRegister:\n${this.state.lockRegister}`);
          })
        }

        // Validate email input
        const emailRegExp = /@\w+\.com$|@\w+\.tw$|@\w+\.cn$|@\w+\.hk$|@\w+\.edu$|@\w+\.au$|@\w+\.uk$|@\w+\.net$|@\w+\.io$|@\w+\.gov$|@\w+\.com.hk$|@\w+\.com.tw$@\w+\.edu.hk$|@\w+\.edu.tw$|@\w+\.gov.hk$|@\w+\.gov.tw$|@\w+\.gov.uk$/.test(this.state.email);
        if (emailRegExp) {
          this.setState({
            emailValid: true
          }, () => {
            console.log(`this.state.emailValid:\n${this.state.emailValid}`)
          })
        } else {
          this.setState({
            emailValid: false,
            lockRegister: true
          }, () => {
            console.log(`this.state.lockRegister:\n${this.state.lockRegister}`);
          })
        }

        // Validate whether password && passwordConfirm match up
        if (this.state.password && this.state.passwordConfirm && this.state.password === this.state.passwordConfirm) {
          this.setState({ 
            passwordMatch: true
          }, () => {
            console.log(`this.state.passwordMatch: \n${this.state.passwordMatch}`);
          });
        } else {
          this.setState({
            passwordMatch: false,
            lockRegister: true
          }, () => {
            console.log(`this.state.lockRegister:\n${this.state.lockRegister}`);
          })
        }
        
        // Validate whether both password && passwordConfirm length >= 12
        if (this.state.password.length >=12 && this.state.passwordConfirm.length >=12) {
          this.setState({
            password12Char: true
          }, () => {
            console.log(`this.state.password12Char: ${this.state.password12Char}`);
          });
        } else {
          this.setState({
            password12Char: false,
            lockRegister: true
          }, () => {
            console.log(`this.state.lockRegister:\n${this.state.lockRegister}`);
          })
        }

        // Validate whether both password && passwordConfirm include at least 1 special character
        const specialChar = ['!', '@', '#' , '$' , '%' , '^' , '&' , '*' , '(' , ')' , '-' , '=' , '{' , '}' , '{' , '}' , '|' , '\\' , ';' , ':' , "'" , '"' , ',' , '<' , '.' , '>' , '`' , '~' ];
        const anySpecialChar = specialChar.map(element => {
          if (this.state.password.includes(element) && this.state.passwordConfirm.includes(element)) {
            return true;
          } else {
            this.setState({
              password1SpecialChar: false,
              lockRegister: true
            }, () => {
              console.log(`this.state.lockRegister:\n${this.state.lockRegister}`);
            })
          }
        }) 
        if (anySpecialChar.includes(true) ) {
          this.setState({
            password1SpecialChar: true
          }, () => {
            console.log(`this.state.password1SpecialChar: ${this.state.password1SpecialChar}`);
          })
        } else {
          this.setState({
            password1SpecialChar: false,
            lockRegister: true
          }, () => {
            console.log(`this.state.lockRegister:\n${this.state.lockRegister}`);
          })
        }

        // Validate whehter all criterion are satisfied for user registraton
        // 1. name
        // 2. email
        // 3. password && passwordConfirm match up
        // 4. password && passwordConfirm consist of at least 12 characters
        // 5. password && passwordConfirm consist of at least 1 special character
        if (this.state.nameValid && this.state.emailValid && this.state.passwordMatch && this.state.password12Char && this.state.password1SpecialChar) {
          this.setState({
            lockRegister: false // If all criterion are met => unlock 'Register' button
          }, () => {
            console.log(`this.state.lockRegister: ${this.state.lockRegister}`);
          })
        } else {
          this.setState({
            lockRegister: true
          }, () => {
            console.log(`this.state.lockRegister:\n${this.state.lockRegister}`);
          })
        }
    };
  
  
  componentDidUpdate(prevProps, prevState) {
      // To keep tracking real-time users' input validations
      if (
        this.state.name !== prevState.name ||
        this.state.nameValid !== prevState.nameValid ||
        this.state.email !== prevState.email ||
        this.state.emailValid !== prevState.emailValid ||
        this.state.password !== prevState.password || 
        this.state.passwordMatch !== prevState.passwordMatch || 
        this.state.password.length !== prevState.password.length ||
        this.state.password12Char !== prevState.password12Char ||
        this.state.password1SpecialChar !== prevState.password1SpecialChar ||
        this.state.passwordConfirm !== prevState.passwordConfirm
      ) {
        this.validateInputs();
      }
  }


  // App 'Sign In' button onClick event handler
  onSubmitSignIn = (event) => {
    event.preventDefault(); // Stop page from refreshing on Signin form submission
    // Send Register info via HTTP POST request to server localhost:3000
    // To avoid Query Strings
    // by fetching our server - localhost:3000/register
    // fetch(url, {method: '', headers: '', body: JSON.stringify({ name: '', email: '', password: ''}) })
    fetch('http://localhost:3000/register', {
      method: 'post', // to create
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ // stringifying this.state variables before fetching
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(response => response.json()) // res.json() to parse data
    .then(user => { // data passing in as user with props
      console.log('onRegisterSignIn - user: \n', user);
      if (user.id) { // if we get a user with props => route to 'home'
        // this.props coming from App.js
        // App.js front-end will handle user features
        this.props.loadUser(user); 
        this.props.onRouteChange('home');
      } else if (!user.id) {
        this.props.onRouteChange('register');
        alert('Email has been registered...\nPlease try again');
        const emailInput = document.querySelector('#email-address');
        const passwordInput = document.querySelector('#password');
        const passwordConfirmInput = document.querySelector('#confirmPassword');
        emailInput.value = '';
        passwordInput.value = '';
        passwordConfirmInput.value = '';
      }
    })
  }

  render() {

    // Destructuring props from this.state
    const { 
      name,
      nameValid,
      email,
      emailValid,
      password,
      passwordConfirm,
      lockRegister,
      password12Char,
      password1SpecialChar,
      passwordMatch
      } = this.state;

    // tachyons styling for register button
    const registerTachyons = 'b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib';

    return (
      <div>
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className={`${classes.nameContainer} mt3}`}>
                <div className={`${classes.name}`}>
                  <label className="db fw6 lh-copy f6" htmlFor="name">
                    Name
                  </label>
                  <input
                    className={`${classes.nameInput} pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100`}
                    type="text"
                    name="name"
                    id="name"
                    onChange={this.onNameChange}
                  />
                </div>
                <div className={`${classes.nameIcon}`}>
                  <img 
                    className={`${classes.nameIconInput}`}
                    type='text'
                    name='nameIcon'
                    id='nameIcon' 
                    src={nameValid === true ? `${tick}`:`${cross}`} 
                    alt='nameIcon'
                  />
                </div>
              </div>
              <div className={`${classes.emailContainer} mt3`} >
                <div className={`${classes.email}`}>
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Email
                  </label>
                  <input
                    className={`${classes.emailInput} pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100`}
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={this.onEmailChange}
                  />
                </div>
                <div className={`${classes.emailIcon}`}>
                  <img 
                    className={`${classes.emailIconInput}`}
                    type='text'
                    name='emailIcon'
                    id='emailIcon' 
                    src={emailValid === true ? `${tick}`:`${cross}`} 
                    alt='emailIcon'
                  />
                </div>
              </div>
              <div className={`${classes.passwordContainer} mv3`}>
                <div className={`${classes.passwordInputsContainer}`}>
                  <div className={`${classes.password}`}>
                    <label className={`${classes.passwordInputLabel} db fw6 lh-copy f6`} htmlFor="password">
                      Password
                    </label>
                    <input
                      className={`${classes.passwordInput} b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100`}
                      type="password"
                      name="password"
                      id="password"
                      onChange={this.onPasswordChange}
                    />
                  </div>
                  <div className={`${classes.passwordConfirmContainer} mv3`}>
                    <label className={`${classes.passwordConfirmLabel} db fw6 lh-copy f6`} htmlFor="passwordConfirmation">
                      Confirm Password
                    </label>
                    <input
                      className={`${classes.passwordConfirmInput} b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100`}
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      onChange={this.onPasswordConfirmChange}
                    />
                  </div>
                </div>
                <div className={`${classes.passwordValidationContainer}`}>
                  <div className={`${classes.passwordValidationIconContainer}`}>
                    <img 
                      className={`${classes.passwordMatchIcon}`}
                      type='text'
                      name='passwordMatchIcon'
                      id='passwordMatchIcon' 
                      src={passwordMatch === true ? `${tick}`:`${cross}`} 
                      alt='passwordMatchIcon'
                    />
                    <img 
                      className={`${classes.password12CharIcon}`}
                      type='text'
                      name='password12CharIcon'
                      id='password12CharIcon' 
                      src={password12Char === true ? `${tick}`:`${cross}`} 
                      alt='password12CharIcon'
                    />
                    <img 
                      className={`${classes.password1SpecialCharIcon}`}
                      type='text'
                      name='password1SpecialCharIcon'
                      id='password1SpecialCharIcon' 
                      src={password1SpecialChar === true ? `${tick}`:`${cross}`} 
                      alt='password1SpecialCharIcon'
                    />
                  </div>
                  <div className={`${classes.passwordValidationInputContainer}`}>
                    <input
                      className={`${classes.passwordMatchInput}`}
                      type='text'
                      name='passwordMatchInput'
                      id='passwordMatchInput'
                      value='Match'
                    />
                    <input
                      className={`${classes.password12CharInput}`}
                      type='text'
                      name='password12CharInput'
                      id='password12CharhInput'
                      value='>=12Char'
                    />
                    <input
                      className={`${classes.password1SpecialCharInput}`}
                      type='text'
                      name='password1SpecialCharInput'
                      id='password1SpecialCharInput'
                      value='>=1 Symbol'
                    />
                  </div>
                </div>
                
              </div>
              {/* <label className="pa0 ma0 lh-copy f6 pointer">
                <input type="checkbox" /> Remember me
              </label> */}
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                disabled={lockRegister}
                className={lockRegister === true ? 
                  `${registerTachyons}` :
                  `${classes.registerBtnOK} ${registerTachyons}`}
                // "b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
          </form>
        </main>
        </article>
      </div>
    );
  }
}
export default Register;
