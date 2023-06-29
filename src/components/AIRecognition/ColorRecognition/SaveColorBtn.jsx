import './SaveColorBtn.css';

const SaveColorBtn = ( { name, color_props, onSaveColorButton }) => {
    // If colors can be fetched from Clarifai API => render save color button
    return color_props.length > 0 ? (
        <div className='container'>
        <input
           type='button'
           className='saveBtnText'
           value={`${name} :D\nSave Raw Hex to your Profile`}
           onClick={onSaveColorButton}
        />
        </div>
        ) : ''
}


export default SaveColorBtn;