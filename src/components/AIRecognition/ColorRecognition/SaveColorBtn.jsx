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


export default SaveColorBtn;