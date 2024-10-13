import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';

/*
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/AIRecognition/FaceRecognition/FaceRecognition';
import ColorRecognition from './components/AIRecognition/ColorRecognition/ColorRecognition';
import AgeRecognition from './components/AIRecognition/AgeRecognition/AgeRecognition';
*/
import Home from './routes/Home';
import Signin from './components/Signin/Signin';
import Register from './components/Register/container/Register';


import { returnDateTime } from './util/returnDateTime';

const localStorage = window.localStorage;
const userData = localStorage.getItem('user');
const defaultRoute = userData? 'home' : 'signin';

const initialState = {
  input: '',
  imageUrl: '',
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
  isSignedIn: false,
  user: { // a copy from window.localStorage
    id: userData?.id,
    name: userData?.name,
    email: userData?.email,
    entries: userData?.entries,
    joined: userData?.joined
  },
  
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;

    // Persisting users' signed in sessions 
    this.loadUserFromLocalStorage();
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
    localStorage.removeItem('user');

    this.setState({
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    });
  }

  resetInactivityTimer = () => {
    clearTimeout(this.inactivityTimer);
    // Force users to sign out after 15 minutes (900000 milli-seconds)
    this.inactivityTimer = setTimeout(this.resetUser, 900000); 
  }

  // For <Register /> && <Signin />
  // To receive fetched data from server-side
  // fetch('http://localhost:3000/signin') || fetch('http://localhost:3000/register')
  // .then(res => res.json())
  // .then(data => )
  // data here equals to response.json()
  // loadUser = (data) => {
  //   this.setState({ user: 
  //     {
  //       id: data.id,
  //       name: data.name,
  //       email: data.email,
  //       entries: data.entries,
  //       joined: data.joined
  //     }
  //   }, () => {
  //     console.log('App.js - this.state.user: \n', this.state.user);
  //   });
  // }

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
  // data from fetching Clarifai API response
  findCelebrity = (data) => {
    // We'd like to only get 1 celebrity at a time
    const clarifaiCelebrity = data.outputs[0].data.regions[0].data.concepts[0];
    const celebrityName = clarifaiCelebrity.name;
    const celebrityValue = clarifaiCelebrity.value;

    return {
      name: celebrityName,
      value: celebrityValue
    };
  };

  // For Color detection model
  // data from fetching Clarifai API response
  findColor = (data) => {
    const clarifaiColors = data.outputs[0].data.colors;
    console.log('data - Colors:\n', clarifaiColors);

    return clarifaiColors.map(color => {
      return {
        colors: color
      };
    });
  };

  // For Age detection model
  // data from fetching Clarifai API response
  findAge = (data) => {
    const clarifaiAges = data.outputs[0].data.concepts;
    console.log('findAge(data) - Ages:\n', clarifaiAges);

    return clarifaiAges.map(each_age => {
      return {
        age: each_age
      };
    });
  };

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
    this.devUpdateEntriesUrl = 'http://localhost:3000/image';
    this.prodUpdateEntriesUrl = 'https://ai-recognition-backend.onrender.com/image';
    
    fetch(this.devUpdateEntriesUrl, {
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
        imageUrl: this.state.input,
        face_hidden: false
      },
      // Logging state variables right after setState
      () => console.log('this.state.input:\n', this.state.input),
      () => console.log('this.state.face_hidden:\n', this.state.face_hidden)
    );

    /* From Clarifai API documentation, this API can be consumed as below: */

    /* Celebrity Recognition - Fetching local web server for celebrityimage */
    this.devFetchCelebrityImageUrl = 'http://localhost:3000/celebrityimage';
    this.prodFetchCelebrityImageUrl = 'https://ai-recognition-backend.onrender.com/celebrityimage';

    fetch(this.devFetchCelebrityImageUrl, {
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
        this.displayCelebrity(this.findCelebrity(response));
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
    this.devFetchColorImageUrl = 'http://localhost:3000/colorimage';
    this.prodFetchColorImageUrl = 'https://ai-recognition-backend.onrender.com/colorimage';

    fetch(this.devFetchColorImageUrl, {
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

      this.displayColor(this.findColor(response));
    })
    .catch(err => console.log(err));
  };

  // Save button to save Color details into PostgreSQL as blob metadata
  saveColor = (input) => {
    this.devSaveColor = 'http://localhost:3000/saveColor';
    this.prodSaveColor = 'http://localhost:3000/saveColor';

    const user = this.state.user;
    // Invoking returnDateTime() to retrieve current time
    const dateTime = returnDateTime();

    fetch(this.devFetchAgeUrl, {
      method: 'post', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ // sending stringified this.state variables as JSON objects
        // user: {
        //   id: userData?.id,
        //   name: userData?.name,
        //   email: userData?.email,
        //   entries: userData?.entries,
        //   joined: userData?.joined
        // },
        userId: user.userId,
        input: this.state.input,
        dateTime: dateTime,
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log('HTTP Response\nAge Detection', response);
      console.log('HTTP request status code:\n', response.status.code);
      console.log('Fetched Age grp obj:\n', response.outputs[0].data.concepts)
    });
  }


  // For <SaveColorBtn /> in <ColorRecognition />
  // Arrow function to send this.state.state_raw_hex_array
  // to server-side right after setting state for state_raw_hex_array
  // to avoid delay in server-side
  loadRawHex = () => {
    this.devFetchRawHexUrl = 'http://localhost:3000/image';
    this.prodFetchRawHexUrl = 'https://ai-recognition-backend.onrender.com/image';

    /* Sending state user.id && state_raw_hex_array to local server-side */
    // Fetching live Web Server on Render
    fetch(this.devFetchRawHexUrl, {
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

  // For <SaveColorBtn /> in <ColorRecognition />
  // onSaveColorButton = () => {
  //   this.updateEntries();
  //   // Create an empty array to store raw_hex values 
  //   // from this.state.colors data fetched from Clarifai API
  //   let raw_hex_array = [];

  //   // Iterate through each color in this.state.colors 
  //   // && push each raw_hex to empty array
  //   this.state.colors.map((color) => {
  //     raw_hex_array.push(color.colors.raw_hex);
  //   });
  //   // Logging updated empty array with raw_hex values
  //   console.log('Cached raw hex array: \n', raw_hex_array);

  //   // Shallow copying raw_hex array to this.state.state_raw_hex_array
  //   this.setState({
  //     state_raw_hex_array: raw_hex_array
  //   }, () => {
  //     // sending state_raw_hex_array to server-side
  //     // right after setting state to avoid delay in server-side
  //     this.loadRawHex(); 
  //   });

  //   };
  
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
    this.devFetchAgeUrl = 'http://localhost:3000/ageimage';
    this.prodFetchAgeUrl = 'https://ai-recognition-backend.onrender.com/ageimage';

    fetch(this.devFetchAgeUrl, {
        method: 'post', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ // sending stringified this.state variables as JSON objects
          input: this.state.input
        })
    })
    .then(response => response.json())
    .then(response => {
      console.log('HTTP Response\nAge Detection', response);
      console.log('HTTP request status code:\n', response.status.code);
      console.log(
        'Fetched Age grp obj:\n',
        response.outputs[0].data.concepts
    );

    // color-detection
    // this.displayColor adding color hex to this.state.color
    // this.findColor(response) returns color hex
    if (response) { 
      this.updateEntries();
      };
      this.displayAge(this.findAge(response));
    })
    .catch(err => console.log(err));
  };

  // To allow routing through onClick={() => onRouteChange(routeInput)}
  onRouteChange = (routeInput) => {
    // if onClick={() => onRouteChange('signout')}
    if (routeInput === 'signout') {
      this.setState({ 
        ...initialState,
        route: 'sigin',
        isSignedIn: false
      });

      // else if onClick={() => onRouteChange('home')}
    } else if (routeInput === 'home') {
      this.setState({ isSignedIn: true });
    } else {
      this.setState(initialState);
    }
    // No matter what, still wanna change the route
    this.setState({ route: routeInput });
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
    console.log(`\ndefaultRoute:\n${defaultRoute}\n`);
    console.log(`\n`);
    console.log('this.state.input: \n', input);
    console.log('this.state.imageUrl: \n', imageUrl);
    console.log('this.state.box: \n', box);
    console.log('this.state.celebrity: \n', celebrity);
    console.log('this.state.celebrity.name: \n', celebrity.name);
    console.log('typeof this.state.celebrity.name: \n', typeof celebrity.name);
    console.log('this.state.colors: \n', colors);
    console.log('this.state.age: \n', age);
    console.log('this.state.face_hidden', face_hidden);
    console.log('this.state.color_hidden', color_hidden);
    console.log('this.state.age_hidden', age_hidden);
    console.log('this.state.responseStatusCode:\n', responseStatusCode);
    console.log('this.state.user.id:\n', userData?.id);
    console.log('this.state.user.email:\n', userData?.email);
    console.log('this.state.user.entries:\n', userData?.entries);
    console.log(`localStorage.getItem('user'):`);
    console.log(userData);
    
    return (
      <div className="App">
        {/* Conditional rendering */}
        <Navigation
          isSignedIn={isSignedIn}
          removeUserFromLocalStorage={this.removeUserFromLocalStorage}
          onRouteChange={this.onRouteChange}
        />
        {route === 'home' ? (
          // Render 'home' page
          <React.Fragment>
            <Home
              name={user.name}
              entries={user.entries}
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
            />
          </React.Fragment>
        ) : route === 'signin' ? (
          <Signin 
            saveUserToLocalStorage={this.saveUserToLocalStorage}
            loadUserFromLocalStorage={this.loadUserFromLocalStorage}
            onRouteChange={this.onRouteChange} />
        ) : (
          <Register 
            saveUserToLocalStorage={this.saveUserToLocalStorage}
            loadUserFromLocalStorage={this.loadUserFromLocalStorage}
            onRouteChange={this.onRouteChange} 
          />
        )}
      </div>
    );
  }
}

export default App;
