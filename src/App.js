import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/AIRecognition/FaceRecognition/FaceRecognition';
import ColorRecognition from './components/AIRecognition/ColorRecognition/ColorRecognition';
import AgeRecognition from './components/AIRecognition/AgeRecognition/AgeRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';

// const app = new Clarifai.App({
//   apiKey: '910f3adce45b4519a33c50ab13e1efcb'
// });

// Most API requires an API Key
const returnClarifaiRequestOptions = imageUrl => {
  const PAT = 'b3e95c6890e443c29885edab45529224';

  const USER_ID = 'phoenixyork166';
  const APP_ID = 'my-app';
  // const MODEL_ID = "face-detection";
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL
          }
        }
      }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Key ' + PAT
    },
    body: raw
  };

  return requestOptions;
};

class App extends Component {
  constructor() {
    super();
    this.state = {
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
      disabled: {
        celebrity_active: null,
        color_active: null,
        age_active: null
      },
      route: 'signin',
      isSignedIn: false,
      user: { // just copy from database
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    };
  }
  
  // For <Register />
  // fetch('http://localhost:3000/signin')
  // .then(res => res.json())
  // .then(data => )
  // data here equals to response.json()
  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }}, () => {
      console.log('App.js - this.state.user: \n', this.state.user)
    })
  }
  // componentDidMount() {
  //   fetch('http://localhost:3000/')
  //   .then(response => response.json())
  //   .then(data => console.log('data\n', data));
  // }

  // For Celebrity detection model
  findCelebrity = data => {
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
  findColor = data => {
    const clarifaiColors = data.outputs[0].data.colors;
    console.log('data - Colors:\n', clarifaiColors);

    return clarifaiColors.map(color => {
      return {
        colors: color
      };
    });
  };

  // For Age detection model
  findAge = data => {
    const clarifaiAges = data.outputs[0].data.concepts;
    console.log('findAge(data) - Ages:\n', clarifaiAges);

    return clarifaiAges.map(each_age => {
      return {
        age: each_age
      };
    });
  };

  // For Celebrity detection model
  displayCelebrity = celebrity => {
    this.setState({ celebrity: celebrity }, () =>
      console.log('Celebrity object: \n', celebrity)
    );
  };

  // For Color detection model
  displayColor = colorInput => {
    this.setState({ colors: colorInput }, () =>
      console.log('Colors obj locally stored: \n', colorInput)
    );
  };

  // For Age detection model
  displayAge = ageInput => {
    this.setState({ age: ageInput }, () =>
      console.log('Age group objs locally stored: \n', ageInput)
    );
  };

  // Face-detection func
  calculateFaceLocation = data => {
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

  displayFaceBox = box => {
    this.setState({ box: box }, () => console.log('box object: \n', box));
  };

  // For <ImageLinkForm />
  onInputChange = event => {
    this.setState({ input: event.target.value }, () =>
      console.log('ImageLinkForm Input value:\n', event.target.value)
    );
  };

  validateState = () => {
    // Using DOM to retrieve DOM elements produced by the 3 buttons
    // onCelebrityButton
    const celebrity_detection = document.querySelector('#face-image');
    const celebrity_name = document.querySelector(
      '#root > div > div.center.ma > div > div.bounding-box > div > button'
    );
    // onColorButton
    const color_box = document.querySelector(
      '#color-container > div.color-image > img'
    );
    const color_details = document.querySelector('#color-details');
    // onAgeButton
    const age_detection = document.querySelector('#face-image');
    const age_number = document.querySelector('#age-number > h3');

    // destructuring state variables for 3 buttons
    const { face_hidden, color_hidden, age_hidden } = this.state;

    // Determine which detection model is active
    const face_active =
      face_hidden === false && color_hidden === true && age_hidden === true;
    const color_active =
      face_hidden === true && color_hidden === false && age_hidden === true;
    const age_active =
      face_hidden === true && color_hidden === true && age_hidden === false;

    // When Face detection model is currently active
    if (face_active) {
      // Hide all DOM elements rendered by Celebrity detection model
      // before other Detection Models fetching new data
      celebrity_detection.style.display = 'none';
      celebrity_name.style.display = 'none';
      this.setState({ 
        face_hidden: true,
        // Clear out current celebrity state data
        celebrity: {}, 
      });

      // When Color detection model is currently active
    } else if (color_active) {
      // Hide all DOM elements rendered by Color detection model
      // before next fetch by other Detection Model buttons
      color_box.style.display = 'none';
      color_details.style.display = 'none';
      this.setState({ 
        color_hidden: true, 
        // Clear out current colors state data
        colors: [],
      });

      // When Age detection model is currently active
    } else if (age_active) {
      // Hide all DOM elements rendered by Age detection model
      // before next fetch by other Detection Model buttons
      age_detection.style.display = 'none';
      age_number.style.display = 'none';

      this.setState({ 
        age_hidden: true,
        // Clear out current age state data
        age: [],
      });
    }
  };

  // Button to activate Celebrity detection model <FaceRecognition />
  onCelebrityButton = () => {
    this.validateState();

    // Whenever clicking Detect button => setState
    this.setState(
      {
        // setState imageUrl: this.state.input from InputChange as event onChange
        imageUrl: this.state.input,
        // Disable Detect Celebrity button when Celebrity Detection is Active
        celebrity_active: true,
        color_active: false,
        age_active: false,
        // setState color_hidden: false to allow rendering of <FaceRecognition />
        face_hidden: false
      },
      // Logging state variables right after setState
      () => console.log('this.state.input:\n', this.state.input),
      () => console.log('this.state.face_hidden:\n', this.state.face_hidden)
    );

    // Clearing out current celebrity data from this.state.celebrity before next fetch
    // this.setState({celebrity: {} });

    // From Clarifai API documentation, an API can be consumed as below:
    // fetch(
    //  "https://api.clarifai.com/v2/models/general-image-recognition/outputs", 
    //  returnClarifaiRequestOptions(imageUrl))
    fetch(
      'https://api.clarifai.com/v2/models/' +
        'celebrity-face-detection' +
        '/outputs',
      returnClarifaiRequestOptions(this.state.input)
    )
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

        // Face-detection model

        // Express.js server-side code below:
        // If there's a response upon fetching Clarifai API
        // ///////////////////////////////////////////////////////////
        //   app.put('/image', (req, res) => { // PUT request to update
        //     const { id } = req.body;
        //     let found = false;
        //     database.users.forEach(user => {
        //         if (user.id === id) {
        //             found = true;
        //             user.entries ++ // increase entries!!
        //             return res.json(user.entries);
        //         }
                
        //     })
        //     if (!found) {
        //         res.status(400).json('not found');
        //     }
        // })
        if (response) { 
          fetch('http://localhost:3000/image', {
            method: 'put', // PUT (Update) 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ // sending stringified this.state variables as JSON objects
            id: this.state.user.id
            })
          })
          .then(response => response.json()) // string to json
          .then(count => { // count is coming from server-side response
            // Avoid mutating this.state.user.props like below:
          //    this.setState({
          //     user: {
          //      entries: count
          //   }
          // }, () => {
          //   console.log(`this.state.user.entries is: ${this.state.user.entries}`)
          // })

          // Object.assign(target, source)
            this.setState(Object.assign(this.state.user, {
              entries: count
            }), () => {
              console.log(`this.state.user.entries is: ${this.state.user.entries}`);
            })
          })
        };

        this.displayFaceBox(this.calculateFaceLocation(response));
        // Celebrity-face-detection
        this.displayCelebrity(this.findCelebrity(response));
        // Store HTTP response status code
        this.setState({ responseStatusCode: response.status.code });
        // this.displayFaceBox() setState({box: box})
        // getting values returned by:
        // this.calculateFaceLocation return {
        // leftCol: clarifaiFace.left_col * width,
        // topRow: clarifaiFace.top_row * height,
        // rightCol: width - (clarifaiFace.right_col * width),
        // bottomRow: height - (clarifaiFace.bottom_row * height)
        // }
      })
      .catch(err => console.log(err));
  };

  onColorButton = () => {
    this.validateState();

    // Whenever clicking Detect button
    this.setState(
      {
        // setState imageUrl: this.state.input from InputChange
        imageUrl: this.state.input,
        // Disable Detect Color button on 'home' page when Color Detection is Active
        celebrity_active: false,
        color_active: true,
        age_active: false,
        // setState color_hidden: false to allow rendering of <ColorRecognition />
        // then passing color_props to <ColorRecognition />
        color_hidden: false
      },
      () => console.log('this.state.input:\n', this.state.input),
      () => console.log('this.state.color_hidden:\n', this.state.color_hidden)
    );

    // Clearing out this.state.colors before future fetching
    // this.setState({colors: [] });

    fetch(
      'https://api.clarifai.com/v2/models/' + 'color-recognition' + '/outputs',
      returnClarifaiRequestOptions(this.state.input)
    )
      .then(response => response.json())
      .then(response => {
        console.log('HTTP Response: \n', response);
        console.log('HTTP request status code:\n', response.status.code);
        console.log('Fetched Colors obj:\n', response.outputs[0].data);

        // color-detection
        // this.displayColor adding color hex to this.state.color
        // this.findColor(response) returns color hex

        // If there's a response upon fetching Clarifai API
        // fetch our server-side to update entries count too
        if (response) { 
          fetch('http://localhost:3000/image', {
            method: 'put', // PUT (Update) 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ // sending stringified this.state variables as JSON objects
            id: this.state.user.id
            })
          })
          .then(response => response.json()) // string to json
          .then(count => { // count is coming from server-side response
          
          // Object.assign(target, source)
            this.setState(Object.assign(this.state.user, {
              entries: count
            }), () => {
              console.log(`this.state.user.entries is: ${this.state.user.entries}`);
            })
          })
        };

        this.displayColor(this.findColor(response));
      })
      .catch(err => console.log(err));
  };

  onAgeButton = () => {
    this.validateState();

    // Whenever clicking 'Detect Age' button
    this.setState(
      {
        // setState imageUrl: this.state.input from InputChange
        imageUrl: this.state.input,
        // Disable Detect Age button when Age Detection is Active
        celebrity_active: false,
        color_active: false,
        age_active: true,
        // setState({age_hidden: false}) to allow rendering of <AgeRecognition />
        age_hidden: false
      },
      () => console.log('this.state.input:\n', this.state.input),
      () => console.log('this.state.age_hidden:\n', this.state.age_hidden)
    );

    // Clearing out this.state.colors before future fetching
    // this.setState({age: [] });

    fetch(
      'https://api.clarifai.com/v2/models/' +
        'age-demographics-recognition' +
        '/outputs',
      returnClarifaiRequestOptions(this.state.input)
    )
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
          fetch('http://localhost:3000/image', {
            method: 'put', // PUT (Update) 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ // sending stringified this.state variables as JSON objects
            id: this.state.user.id
            })
          })
          .then(response => response.json()) // string to json
          .then(count => { // count is coming from server-side response
          
          // Object.assign(target, source)
            this.setState(Object.assign(this.state.user, {
              entries: count
            }), () => {
              console.log(`this.state.user.entries is: ${this.state.user.entries}`);
            })
          })
        };
        this.displayAge(this.findAge(response));
      })
      .catch(err => console.log(err));
  };

  // To allow routing through onClick={() => onRouteChange(routeInput)}
  onRouteChange = routeInput => {
    // if onClick={() => onRouteChange('signout')}
    if (routeInput === 'signout') {
      this.setState({ isSignedIn: false });
      // else if onClick={() => onRouteChange('home')}
    } else if (routeInput === 'home') {
      this.setState({ isSignedIn: true });
    }
    // No matter what, still wanna change the route
    this.setState({ route: routeInput });
  };

  render() {
    // destructuring all props from this.state
    const {
      age,
      face_hidden,
      color_hidden,
      age_hidden,
      celebrity_active,
      color_active,
      age_active,
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
    console.log('age_props\n', age_props);

    // Tracking all state variables in render() {...}
    console.log('this.state.input: \n', input);
    console.log('this.state.imageUrl: \n', imageUrl);
    console.log('this.state.box: \n', box);
    console.log('this.state.celebrity: \n', celebrity);
    console.log('this.state.colors: \n', colors);
    console.log('this.state.age: \n', age);
    console.log('this.state.face_hidden', face_hidden);
    console.log('this.state.color_hidden', color_hidden);
    console.log('this.state.age_hidden', age_hidden);
    console.log('this.state.responseStatusCode:\n', responseStatusCode);

    return (
      <div className="App">
        {/* Conditional rendering */}
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === 'home' ? (
          // Render 'home' page
          <>
            <Logo />
            <Rank 
              name={user.name}
              entries={user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onCelebrityButton={this.onCelebrityButton}
              celebrity_active={celebrity_active}
              onColorButton={this.onColorButton}
              color_active={color_active}
              onAgeButton={this.onAgeButton}
              age_active={age_active}
              face_hidden={face_hidden}
              color_hidden={color_hidden}
              age_hidden={age_hidden}
            />
            <FaceRecognition
              box={box}
              imageUrl={imageUrl}
              celebrityName={celebrity.name}
              face_hidden={face_hidden}
            />
            <ColorRecognition
              imageUrl={imageUrl}
              color_props={colors_array}
              color_hidden={color_hidden}
            />
            <AgeRecognition
              age={age_props}
              imageUrl={imageUrl}
              age_hidden={age_hidden}
            />
          </>
        ) : route === 'signin' ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        )}
      </div>
    );
  }
}

export default App;
