import React, { Component } from "react";

// Make Register a smart component to process states
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    }
  }
  
  // Listens to onChange events of name <input>
  onNameChange = (event) => {
    this.setState({ name: event.target.value }, () => {
      // console.log('this.state.signInEmail: \n', this.state.signInEmail);
    })
  }
  
  // Listens to onChange events of email && password <input>
  onEmailChange = (event) => {
    this.setState({ email: event.target.value }, () => {
      // console.log('this.state.signInEmail: \n', this.state.signInEmail);
    })
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value }, () => {
      // console.log('this.state.signInPassword: \n', this.state.signInPassword);
    })
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
      if (user) { // if we get a user with props => route to 'home'
        // this.props coming from App.js
        // App.js front-end will handle user features
        this.props.loadUser(user); 
        this.props.onRouteChange('home');
      }
    })
  }

  render() {

    return (
      <div>
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
              {/* <label className="pa0 ma0 lh-copy f6 pointer">
                <input type="checkbox" /> Remember me
              </label> */}
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
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
// const Register = ({ onRouteChange }) => {
  
};

export default Register;
