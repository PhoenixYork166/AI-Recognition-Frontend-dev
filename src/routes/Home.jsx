import React from 'react';
import Logo from '../components/Logo/Logo';
import Rank from '../components/Rank/Rank';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../components/AIRecognition/FaceRecognition/FaceRecognition';
import ColorRecognition from '../components/AIRecognition/ColorRecognition/ColorRecognition';
import AgeRecognition from '../components/AIRecognition/AgeRecognition/AgeRecognition';

const Home = ( {
    name,
    entries,
    imageUrl,
    celebrityName,
    face_hidden,
    onInputChange,
    onCelebrityButton,
    onColorButton,
    onSaveColorButton,
    onAgeButton,
    color_props,
    color_hidden,
    age,
    age_hidden,
    box    
} ) => {

    return (
        <React.Fragment>
            <Logo />
            <Rank 
            name={name}
            entries={entries}
            />
            <ImageLinkForm
            onInputChange={onInputChange}
            onCelebrityButton={onCelebrityButton}
            onColorButton={onColorButton}
            onAgeButton={onAgeButton}
            face_hidden={face_hidden}
            color_hidden={color_hidden}
            age_hidden={age_hidden}
            />
            <FaceRecognition
            box={box}
            imageUrl={imageUrl}
            celebrityName={celebrityName}
            face_hidden={face_hidden}
            />
            <ColorRecognition
            imageUrl={imageUrl}
            color_props={color_props}
            color_hidden={color_hidden}
            name={name}
            onSaveColorButton={onSaveColorButton}
            />
            <AgeRecognition
            age={age}
            imageUrl={imageUrl}
            age_hidden={age_hidden}
            />
        </React.Fragment>
    )
};

export default Home;