<<<<<<< HEAD
const SaveColorBtn = ( { name, onSaveColorButton }) => {

    return (
        <div className='container'>
        <input
            type='button'
           className='saveBtnText'
           value={`${name} :D\nSave Raw Hex to your Profile`}
           onClick={onSaveColorButton}
        />
        </div>
    )
}


=======
const SaveColorBtn = ( { name, onSaveColorButton }) => {

    return (
        <div className='container'>
        <input
            type='button'
           className='saveBtnText'
           value={`${name} :D\nSave Raw Hex to your Profile`}
           onClick={onSaveColorButton}
        />
        </div>
    )
}


>>>>>>> d7f1c00d012083fb6955d68e956c0eead0a877b1
export default SaveColorBtn;