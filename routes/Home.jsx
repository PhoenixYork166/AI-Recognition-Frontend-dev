import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/AIRecognition/FaceRecognition/FaceRecognition';
import ColorRecognition from './components/AIRecognition/ColorRecognition/ColorRecognition';
import AgeRecognition from './components/AIRecognition/AgeRecognition/AgeRecognition';

const Home = ( { onEmailChange, emailValid } ) => {

    return (
        <React.Fragment>
        <Logo />
        <Rank 
          name={user.name}
          entries={user.entries}
        />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onCelebrityButton={this.onCelebrityButton}
          onColorButton={this.onColorButton}
          onAgeButton={this.onAgeButton}
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
          name={user.name}
          onSaveColorButton={this.onSaveColorButton}
        />
        <AgeRecognition
          age={age_props}
          imageUrl={imageUrl}
          age_hidden={age_hidden}
        />
      </React.Fragment>
    )
};

export default Home;