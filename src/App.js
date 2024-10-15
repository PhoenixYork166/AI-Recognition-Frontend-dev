import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import { useEffect } from 'react';
import Home from './routes/Home/Home';
import Signin from './components/Signin/Signin';
import Register from './components/Register/container/Register';

// Utility helper functions
// import loadUserFromLocalStorage from './util/loadUserFromLocalStorage';
import findCelebrity from './util/ai-detection/findCelebrity';
import findColor from './util/ai-detection/findColor';
import findAge from './util/ai-detection/findAge';
import { returnDateTime } from './util/returnDateTime';

const localStorage = window.localStorage;

class App extends Component {
  constructor() {
    super();
    // this.state = initialState;

    const userData = localStorage.getItem('user');
    // const userData = loadUserFromLocalStorage();
    const defaultRoute = userData? 'home' : 'signin';

    this.state = {
      input: '', // this.state.input => Users' input imageUrl => Can be used for onClick events
      imageUrl: '', // this.state.imageUrl should NOT be used for onClick => React circular references
      box: {},
      celebrity: {},
      celebrityName: '',
      colors: [],
      age: [],
      face_hidden: true,
      color_hidden: true,
      age_hidden: true,
      responseStatusCode: Number(''),
      route: defaultRoute,
      isSignedIn: userData ? true : false,
      user: userData || {}
    };

    // Persisting users' signed in sessions 
    this.loadUserFromLocalStorage();

    // loadUserFromLocalStorage(this.setState.bind(this));
    this.inactivityTimer = null;
  }

  componentDidMount() {
    this.loadUserFromLocalStorage();
    this.resetInactivityTimer();
  }

  // Keep tracking for user
  // Validate users whenever there's a change
  componentDidUpdate(prevProps, prevState) {
    if (this.state.user !== prevState.user) { 
      this.validateUsers();
    }
  }

  // useEffect() hook
  componentWillUnmount() {
    clearTimeout(this.inactivityTimer);
  }


  
  resetUser = () => {
    // Batch 1
    // this.resetUser(this.setState.bind(this));

    // Round 1
    this.setState({
      user: {},
      isSignedIn: false,
      route: 'signin'
    }, 
    // Round 2
    () => {
      // this.removeUserFromLocalStorage();
      this.removeUserFromLocalStorage();
      console.log(`\nthis.state.isSignedIn after resetUser:\n`,this.state.isSignedIn, `\n`);//true
    })

    // this.removeUserFromLocalStorage(() => {
    //   this.setState({
    //     user: {},
    //     isSignedIn: false,
    //     route: 'signin'
    //   })
    // }, () => {
    //   console.log(`\nisSignedIn: `, this.state.isSignedIn, `\n`);
    // })

  }

  

  resetInactivityTimer = () => {
    clearTimeout(this.inactivityTimer);
    
    // Force users to sign out after 15 minutes (900000 milli-seconds)
    this.inactivityTimer = setTimeout(this.resetUser, 900000); 
  }

  saveUserToLocalStorage = (user) => {
    // A callback function that accepts passed-in user to save user to window.localStorage
    localStorage.setItem('user', JSON.stringify(user));
  }

  loadUserFromLocalStorage = () => {
    const userData = localStorage.getItem('user');

    console.log(`\nuserData:`);
    console.log(userData);

    // If there's 'user' in localStorage
    if (userData) {
      try {
        this.setState({ 
          user: JSON.parse(userData), 
          isSignedIn: true,
          route: 'home'
        });
      } catch (err) {
        console.error(`\nFailed to parse user data: `, err);
      }
    } else {
      console.log(`\nNo user data was found in local storage\n`);
    }
  }

  removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
  }

  // For Celebrity detection model
  displayCelebrity = (celebrity) => {
    this.setState({ celebrity: celebrity }, () =>
      console.log('Celebrity object: \n', celebrity)
    );
  };

  // For Color detection model
  displayColor = (colorInput) => {
    this.setState({ colors: colorInput }, () =>
      console.log('Colors obj locally stored: \n', colorInput)
    );
  };

  // For Age detection model
  displayAge = (ageInput) => {
    this.setState({ age: ageInput }, () =>
      console.log('Age group objs locally stored: \n', ageInput)
    );
  };

  // Face-detection func
  // data from fetching Clarifai API response
  calculateFaceLocation = (data) => {
    // We'd like to try only get 1 face now
    // bounding_box is % of image size
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    // DOM manipulation
    // for <img id='...'/> in <FaceRecognition/>
    const image = document.getElementById('face-image');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log('img width:\n', width, '\nimg height:\n', height);
    console.log('bounding box - calcFaceLocaiton\n', clarifaiFace);
    // returning an object to fill up this.state.box
    // img width 238px
    // img height 384px
    // sample dataset (%)
    // { top_row: 0.0871627, left_col: 0.3230537, bottom_row: 0.8270308, right_col: 0.7289897 }

    // sample dataset (px)
    // { top_row: 33.47(h),
    // left_col: 76.89(w),
    // bottom_row: 66.42(h),
    // right_col: 64.5(w) }
    return {
      topRow: clarifaiFace.top_row * height,
      leftCol: clarifaiFace.left_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
      rightCol: width - clarifaiFace.right_col * width
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box }, () => console.log('box object: \n', box));
  };

  // For <ImageLinkForm />
  onInputChange = (event) => {
    this.setState({ input: event.target.value }, () =>
      console.log('ImageLinkForm Input value:\n', event.target.value)
    );
  };

  // Everytime any of Detection Models is clicked
  // reset all state variables to allow proper rendering of DOM elements
  resetState = () => {
    this.setState({
      box: {},
      celebrity: {},
      celebrityName: '',
      colors: [],
      age: [],
      face_hidden: true,
      color_hidden: true,
      age_hidden: true,
      responseStatusCode: Number('')
    })
  };

  // Everytime any of the Detection Models is activated
  // update this.state.user.entries by 1 through
  // sending data to server-side
  
  /* Updating Entries - Fetching local web server vs live web server on Render */
  
  updateEntries = () => {
    const devUpdateEntriesUrl = 'http://localhost:3000/image';
    const prodUpdateEntriesUrl = 'https://ai-recognition-backend.onrender.com/image';

    const fetchUrl = process.env.NODE_ENV === 'production' ? prodUpdateEntriesUrl : devUpdateEntriesUrl;
    
    fetch(fetchUrl, {
        method: 'put', // PUT (Update) 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ // sending stringified this.state variables as JSON objects
        id: this.state.user.id
        })
      })
      .then(response => {
        return response.json()
      })
      .then(fetchedEntries => {
        console.log(`fetched ENTRIES from server: \n ${fetchedEntries}`);
        console.log(`typeof fetched ENTRIES from server: \n ${typeof fetchedEntries}`);
         this.setState(Object.assign(this.state.user, {
          entries: fetchedEntries
        }), () => {
          console.log(`this.state.user.entries is: ${this.state.user.entries}`);
        })
        })
      .catch(err => console.log(err))
  }


  // ClarifaiAPI Celebrity Face Detection model
  onCelebrityButton = () => {
    // Reset all state variables to allow proper rendering from Detection Models
    // Before next fetch
    this.resetState();

    // Whenever clicking Detect button => setState
    this.setState(
      {
        // setState imageUrl: this.state.input from InputChange as event onChange
        // Thus this.state.imageUrl = a React Event => NOT be used as props involving circular references
        imageUrl: this.state.input,
        face_hidden: false
      },
      // Logging state variables right after setState
      () => console.log('this.state.input:\n', this.state.input),
      () => console.log('this.state.face_hidden:\n', this.state.face_hidden)
    );

    /* From Clarifai API documentation, this API can be consumed as below: */

    /* Celebrity Recognition - Fetching local web server for celebrityimage */
    const devFetchCelebrityImageUrl = 'http://localhost:3000/celebrityimage';
    const prodFetchCelebrityImageUrl = 'https://ai-recognition-backend.onrender.com/celebrityimage';

    const fetchUrl = process.env.NODE_ENV === 'production' ? prodFetchCelebrityImageUrl : devFetchCelebrityImageUrl;

    fetch(fetchUrl, {
        method: 'post', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ // sending stringified this.state variables as JSON objects
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        console.log('HTTP Response: \n', response);
        console.log('HTTP request status code:\n', response.status.code);
        console.log(
          'bounding box',
          response.outputs[0].data.regions[0].region_info.bounding_box
        );
        console.log(
          'Celebrity obj:\n',
          response.outputs[0].data.regions[0].data.concepts[0]
        );

        if (response) { 
          this.updateEntries();
        };

        this.displayFaceBox(this.calculateFaceLocation(response));
        // this.displayCelebrity(this.findCelebrity(response));
        this.displayCelebrity(findCelebrity(response));
        this.setState({ responseStatusCode: response.status.code });
        })
      .catch(err => console.log(err));
  };

  // ClarifaiAPI Color Detection model
  onColorButton = () => {
    // Reset all state variables to allow proper rendering from Detection Models
    // Before next fetch
    this.resetState(); 

    // Whenever clicking Detect button
    this.setState(
      {
        // setState imageUrl: this.state.input from InputChange
        imageUrl: this.state.input,
        // setState color_hidden: false to allow rendering of <ColorRecognition />
        // then passing color_props to <ColorRecognition />
        color_hidden: false
      },
      () => console.log(`this.state.input:\n${this.state.input}\nthis.state.color_hidden:\n${this.state.color_hidden}`)
    );

    /* Color Recognition - Fetching local Web Server vs live Web Server on Render */
    const devFetchColorImageUrl = 'http://localhost:3000/colorimage';
    const prodFetchColorImageUrl = 'https://ai-recognition-backend.onrender.com/colorimage';

    const fetchUrl = process.env.NODE_ENV === 'production' ? prodFetchColorImageUrl : devFetchColorImageUrl;

    fetch(fetchUrl, {
      method: 'post', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ // sending stringified this.state variables as JSON objects
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log('Fetched Colors obj:\n', response.outputs[0].data);
      // If there's a response upon fetching Clarifai API
      // fetch our server-side to update entries count too
      if (response) { 
        this.updateEntries();
      };

      this.displayColor(findColor(response));
    })
    .catch(err => console.log(err));
  };

  

  // For <SaveColorBtn /> in <ColorRecognition />
  // Arrow function to send this.state.state_raw_hex_array
  // to server-side right after setting state for state_raw_hex_array
  // to avoid delay in server-side
  loadRawHex = () => {
    const devFetchRawHexUrl = 'http://localhost:3000/image';
    const prodFetchRawHexUrl = 'https://ai-recognition-backend.onrender.com/image';
    
    const fetchUrl = process.env.NODE_ENV === 'product' ? prodFetchRawHexUrl : devFetchRawHexUrl;

    /* Sending state user.id && state_raw_hex_array to local server-side */
    // Fetching live Web Server on Render
    fetch(fetchUrl, {
      method: 'put', // PUT (Update) 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
      id: this.state.user.id,
      raw_hex: this.state.state_raw_hex_array
      })
    })
    .then(response => response.json()) // string to json
    .then(fetchedUser => { // entries is coming from server-side response
    console.log('fetchedUser: ', fetchedUser);

    // Object.assign(target, source)
    this.setState(Object.assign(this.state.user, {
      entries: fetchedUser.entries,
      raw_hex: this.state.state_raw_hex_array
    }), () => {
      console.log(`this.state.user.entries is: ${this.state.user.entries}`);
      console.log(`raw_hex array passed to server-side: ${this.state.state_raw_hex_array}`);
    })
    })
    .catch (err => console.log(err))
  }
  
  // ClarifaiAPI Age Detection model
  onAgeButton = () => {
    // Reset all state variables to allow proper rendering from Detection Models
    // Before next fetch
    this.resetState();

    // Whenever clicking 'Detect Age' button
    this.setState(
      {
        // setState imageUrl: this.state.input from InputChange
        imageUrl: this.state.input,
        // setState({age_hidden: false}) to allow rendering of <AgeRecognition />
        age_hidden: false
      },
      () => console.log('this.state.input:\n', this.state.input),
      () => console.log('this.state.age_hidden:\n', this.state.age_hidden)
    );

    /* Age Recognition - Fetching local dev server vs live Web Server on Render */
    const devFetchAgeUrl = 'http://localhost:3000/ageimage';
    const prodFetchAgeUrl = 'https://ai-recognition-backend.onrender.com/ageimage';

    const fetchUrl = process.env.NODE_ENV === 'product' ? prodFetchAgeUrl : devFetchAgeUrl;

    fetch(fetchUrl, {
        method: 'post', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ // sending stringified this.state variables as JSON objects
          input: this.state.input
        })
    })
    .then(response => response.json())
    .then(response => {
      console.log('\nHTTP Response\nAge Detection', response);
      console.log('\nHTTP request status code:\n', response.status.code);
      console.log(
        'Fetched Age grp obj:\n',
        response.outputs[0].data.concepts
    );

    // color-detection
    // this.displayColor adding color hex to this.state.color
    // findColor(response) returns color hex
    if (response) { 
      this.updateEntries();
      };
      this.displayAge(findAge(response));
    })
    .catch(err => console.log(err));
  };

  // To allow routing through onClick={() => onRouteChange(routeInput)}
  onRouteChange = (routeInput) => {
    switch (routeInput) {
      case 'signout':
        this.setState({ 
          ...this.state,
          route: 'sigin',
          isSignedIn: false
        });
        break;
      
      // else if onClick={() => onRouteChange('home')}
      case 'home':
        this.setState({ 
          ...this.state,
          route: routeInput,
          isSignedIn: true
        });
        return;

      case 'colorRecords':
        this.setState({
          ...this.state,
          route: routeInput,
          isSignedIn: true
        })
        return;
      
      // No matter what, still wanna change the route
      default:
        this.setState({ 
          ...this.state, 
          route: routeInput 
        });
        return;
    }
  };

  // To avoid malicious users from breaking in from <Register />
  // If there's no user.id => route to 'signin' page
  validateUsers = () => {
    if (!this.state.user.id) {
      this.onRouteChange('signin');
    }
  }

  /* Rendering all components */
  render() {
    // destructuring props from this.state
    const {
      age,
      face_hidden,
      color_hidden,
      age_hidden,
      box,
      colors,
      celebrity,
      imageUrl,
      route,
      input,
      isSignedIn,
      responseStatusCode,
      user
    } = this.state;

    const colors_array = colors.map(color => color);
    const age_props = age.map((each, i) => each.age.name)[0];

    const dateTime = returnDateTime();
    console.log('\nage_props\n', age_props);
    console.log('\ndateTime:\n', dateTime);

    // Tracking all state variables in render() {...}
    console.log(`\nthis.state.user: \n`, user, `\n`);
    console.log(`\ndefaultRoute:\n${this.defaultRoute}\n`);
    console.log(`\n`);
    console.log('\nthis.state.input: \n', input);
    console.log('\nthis.state.imageUrl: \n', imageUrl);
    console.log('\nthis.state.box: \n', box);
    console.log('\nthis.state.celebrity: \n', celebrity);
    console.log('\nthis.state.celebrity.name: \n', celebrity.name);
    console.log('typeof this.state.celebrity.name: \n', typeof celebrity.name);
    console.log('\nthis.state.colors: \n', colors);
    console.log('\nthis.state.colors[0]: \n', colors[0]);
    console.log('\nthis.state.age: \n', age);
    console.log('\nthis.state.face_hidden', face_hidden);
    console.log('\nthis.state.color_hidden', color_hidden);
    console.log('\nthis.state.age_hidden', age_hidden);
    console.log('\nthis.state.responseStatusCode:\n', responseStatusCode);
    
    // Scalability for allowing to add more React routes without React Router DOM
    const routeComponents = {
      'home': (
        <Home
          isSignedIn={isSignedIn}
          user={user}
          name={user.name}
          entries={user.entries}
          input={input}
          imageUrl={imageUrl}
          celebrityName={celebrity.name}
          face_hidden={face_hidden}
          onInputChange={this.onInputChange}
          onCelebrityButton={this.onCelebrityButton}
          onColorButton={this.onColorButton}
          onSaveColorButton={this.onSaveColorButton}
          onAgeButton={this.onAgeButton}
          color_props={colors_array}
          color_hidden={color_hidden}
          age={age_props}
          age_hidden={age_hidden}
          box={box}
          onRouteChange={this.onRouteChange}
          resetUser={this.resetUser}
        />
      ),
      'signin': (
        <Signin 
          saveUserToLocalStorage={this.saveUserToLocalStorage}
          loadUserFromLocalStorage={this.loadUserFromLocalStorage}
          onRouteChange={this.onRouteChange} 
        />
        // <TestMetadataBlob />
      ),
      'register': (
        <Register 
          saveUserToLocalStorage={this.saveUserToLocalStorage}
          loadUserFromLocalStorage={this.loadUserFromLocalStorage}
          onRouteChange={this.onRouteChange} 
        />
      ),
      'colorRecords': (
        <p></p>
      )
    }



    return (
      <div className="App">
        {/* Conditional rendering */}
        <Navigation
          isSignedIn={isSignedIn}
          removeUserFromLocalStorage={this.removeUserFromLocalStorage}
          onRouteChange={this.onRouteChange}
          resetUser={this.resetUser}
        />

        {routeComponents[route] ?? <div>Page not found</div>}
      </div>
    );
  }
}

export default App;
