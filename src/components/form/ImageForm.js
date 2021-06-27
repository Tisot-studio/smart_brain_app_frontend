import './ImageForm.css';


const ImageForm = ({onImputChange, onSubmit}) => {
    return(
        <div>
            <p className='f3 white'> Умный мозг обнаружит лицо на фотографии! Давай попробуем :) <br/>
            Вставь ссылку на фото с изображением лица и нажми Detect. </p>

        <div className='form center pa2 br3 shadow-5 '>
            <input onChange = {onImputChange} type='text' className='f4 pa2 w-80 center'/>
            <button onClick={onSubmit} className='w-20 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
        </div>
        </div>
    )
}


export default ImageForm;