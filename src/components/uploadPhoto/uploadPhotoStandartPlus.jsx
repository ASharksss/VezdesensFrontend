import React, {useEffect, useRef, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {Cropper} from 'react-cropper';
import 'cropperjs/dist/cropper.css'
import Card from '../cards/Card';
import ModalMain from '../modal/modalMain';
import photoStandartPlus from "../../asserts/icons/upload_standartPlus.svg";
import deleteImg from '../../asserts/icons/deleteImg.svg'

const UploadPhotoStandartPlus = ({editedImage, setEditedImage}) => {
  // родительская измененная картинка
  // editedImage: null
  const [image, setImage] = useState(null);			  // первоначальная картинка
  const [croppedData, setCroppedData] = useState(null)  // изменяемая картинка
  const [activeModal, setActiveModal] = useState(false) // модальное окно
  const cropperRef = useRef(null)

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper
    const croppedCanvas = cropper.getCroppedCanvas()
    const croppedDataUrl = croppedCanvas.toDataURL('image/jpeg')
    setCroppedData(croppedDataUrl)
  };

  const handleSaveImage = () => {
    setEditedImage({value: croppedData, change: true})
    setActiveModal(false)
  }

  useEffect(() => {
    if (image !== null) {
      setActiveModal(true)
    }
  }, [image])

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'jpg')
      return window.alert('Вы выбрали не правильный тип файла')
    const reader = new FileReader()
    const img = new Image();
    reader.onloadend = () => {
      img.onload = function () {
        const imageSizeCheck = this.width === 315 && this.height === 417
        setImage(reader.result)
        setEditedImage({value: reader.result, change: imageSizeCheck})
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  };

  const {getInputProps} = useDropzone({onDrop});
  const removeImage = () => {
    setEditedImage(null)
    setImage(null);
  };

  return (
    <div className='upload_standartPlus upload_block'>
      <div className="flex row">
        <div className="column mr-20">
          <span className='upload_block-title'>Фото для баннера "Стандарт+" </span>
          <div className='flex mt-20'>
            {(editedImage?.value || image !== null) ?
              <div style={{position: 'relative'}}>
                <button onClick={() => removeImage()} className='deleteImg_btn'><img src={deleteImg} alt=""/></button>
                <div className='images-flex_column' onClick={() => setActiveModal(true)}>
                  <img src={editedImage.value} alt="" className='editedImage'/>
                </div>
              </div> :
              <>
                <label htmlFor="standartPlus_input" className='upload_file_input upload_standartPlus-label'>
                  <img src={photoStandartPlus} alt=""/>
                </label>
                <input {...getInputProps()} id='standartPlus_input' className='upload-input'
                       accept="image/png, image/jpeg"/>
                <div className="upload_info">
                  <p className='upload_info-premium-text'>Загрузите 1 фото</p>
                  <p className='upload_info-premium-format'>Формат JPG, JPEG, PNG</p>
                </div>
              </>}
          </div>
        </div>
      </div>
      {(image || activeModal) && (
        <ModalMain activeModal={activeModal} setActiveModal={setActiveModal} touched={false} children={
          <>
            <Cropper
              ref={cropperRef}
              src={image}
              style={{height: 400, width: '100vh'}}
              guides={false}
              aspectRatio={315 / 417}
              cropBoxResizable={true}
              viewMode={1}
              zoomable={false}
              dragMode='crop'
              crop={onCrop}
            />
            <button type='button' onClick={() => handleSaveImage()}>Save</button>
          </>}/>)}
    </div>
  );
};

export default UploadPhotoStandartPlus;