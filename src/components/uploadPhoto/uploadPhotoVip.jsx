import React, {useEffect, useRef, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {Cropper} from 'react-cropper';
import 'cropperjs/dist/cropper.css'
import photoPremium from "../../asserts/icons/upload_premium.svg";
import Card from '../cards/Card';
import ModalMain from '../modal/modalMain';
import deleteImg from "../../asserts/icons/deleteImg.svg";

const UploadPhotoVip = ({editedImage, setEditedImage}) => {
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
        const imageSizeCheck = this.width === 690 && this.height === 417
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
    <div className='upload_vip upload_block'>
      <span className='upload_block-title'>Загрузите фото для превью</span>
      <div className='uploadPhoto-description'>Это фото будет привлекать внимание</div>

      {(editedImage?.value || image !== null) ?
        <div className='relative mt-20 mb-20'>
          <button onClick={() => removeImage()} className='deleteImg_Vipbtn'><img src={deleteImg} alt=""/></button>
          <div className='images-flex_column' onClick={() => setActiveModal(true)}>
            <img src={editedImage.value} alt="" className='imgVip'/>
          </div>
        </div> :
        <div className='flex mt-20 mb-20'>
          <label htmlFor="vip_input" className='upload_file_input upload_vip-label'>
            <img src={photoPremium} alt=""/>
          </label>
          <input {...getInputProps()} id='vip_input' className='upload-input' accept="image/png, image/jpeg"/>
          <div className="upload_info">
            <p className='upload_info-premium-text'>Загрузите 1 фото</p>
            <p className='upload_info-premium-format'>Формат JPG, JPEG, PNG</p>
            <span className='uploadPhoto-description'>Отображается только на главной странице</span>
          </div>
        </div>

      }
      {(image || activeModal) && (
        <ModalMain activeModal={activeModal} setActiveModal={setActiveModal} touched={false} children={
          <>
            <Cropper
              ref={cropperRef}
              src={image}
              style={{height: 400, width: '100vh'}}
              guides={false}
              aspectRatio={690 / 417}
              cropBoxResizable={true}
              viewMode={1}
              zoomable={false}
              dragMode='crop'
              crop={onCrop}
            />
            <button type='button'
                    onClick={() => handleSaveImage()} className='uploadPhoto-btn'>Сохранить
            </button>
          </>}/>)}
    </div>
  );
};

export default UploadPhotoVip;
