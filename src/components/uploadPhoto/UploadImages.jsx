import { v4 as uuidv4 } from 'uuid';
import React, { useState, useRef, useEffect } from 'react'
import ModalMain from '../modal/modalMain'
import {useDropzone} from 'react-dropzone';
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import Card from '../cards/Card';


const UploadImages = ({cropData, setCropData}) => {      // родительское хранилище, куда записываются изменения
                                                         // cropData: []
   const cropperRef = useRef(null)
   const [srcData, setSrcData] = useState([])            // первоначальные файлы
   const [imageLimit, setImageLimit] = useState(false)   // проверка на ограничение фото
   const [changeImage, setChangeImage] = useState(null)  // измененная картинка
   const [croppedData, setCroppedData] = useState(null)  // изменяемая картинка
   const [activeModal, setActiveModal] = useState(false) // модальное окно
   const [key, setKey] = useState(null)                  // uuid картинки для изменения

   const onCrop = () => {
      const cropper = cropperRef.current?.cropper
      const croppedCanvas = cropper.getCroppedCanvas()
      const croppedDataUrl = croppedCanvas.toDataURL('image/jpeg')
      setCroppedData(croppedDataUrl)
   };

   const handleSetImage = (itemKey) => {
      setActiveModal(true)
      const object = srcData.find(item => item.key === itemKey)
      setChangeImage(object.value)
      setKey(object.key)
   }

   const handleSaveImage = () => {
      const timeArray = [...cropData]
      const updatedTimeArray = timeArray.filter(item => item.key !== key)
      setCropData([...updatedTimeArray, {key: key, value: croppedData}])
      setChangeImage(null)
      setKey(null)
      setCroppedData(null)
      setActiveModal(false)
   }

   useEffect(() => {
      if(cropData.length >= 15)
         setImageLimit(true)
   }, [cropData])
   
	const onDrop = (acceptedFiles) => {
      if ((cropData.length + acceptedFiles.length) > 15) {
         return window.alert(`Превышвет допустимый предел картинок\nНа текущий момент у Вас ${cropData.length} файл(а)`)
      }
      if(acceptedFiles.length > 0) {
         acceptedFiles.map(item => {
            const reader = new FileReader()
            reader.onloadend = () => {
               const v4Key = uuidv4()
               setSrcData(prev => [...prev, {key: v4Key, value: reader.result}])
               setCropData(prev => [...prev, {key: v4Key, value: reader.result}])
            }
            reader.readAsDataURL(item)
         })
      }
	};

   const handleRemoveImage = (itemKey) => {
      const timeArraySrc = [...srcData], timeArrayCrop = [...cropData]
      const updatedTimeArraySrc = timeArraySrc.filter(item => item.key !== itemKey)
      const updatedTimeArrayCrop = timeArrayCrop.filter(item => item.key !== itemKey)
      setSrcData([...updatedTimeArraySrc])
      setCropData([...updatedTimeArrayCrop])
      if(updatedTimeArrayCrop.length < 15)
         setImageLimit(false)
   }

	const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: {'image/*': []}})

   return (
      <div>
         <div {...getRootProps()} style={{
               padding: 20, backgroundColor: '#00000021',
               textAlign: 'center', fontSize: '16pt',
               marginBottom: 15
               }}>
            <input {...getInputProps()} disabled={imageLimit} />
            {
               isDragActive ?
                  <p>Отпустите файл(ы)...</p> :
                  <p style={{cursor: 'pointer'}}>Перетащите файл(ы) в эту зону или нажмите чтобы выбрать файл(ы)</p>
            }
         </div>
         {(changeImage || activeModal) && (
            <ModalMain activeModal={activeModal} setActiveModal={setActiveModal} children={
               <>
                  <Cropper
                     ref={cropperRef}
                     src={changeImage}
                     style={{ height: 400, width: '100vh' }}
                     guides={false}
                     viewMode={1}
                     dragMode='crop'
                     crop={onCrop}
                  />
                  <button onClick={() => handleSaveImage()}>Save</button>
               </>} />
         )}
         <div className="images-flex">
            {cropData.length > 0 ? cropData.reduce((rows, item, index) => {
               if (index % 4 === 0) {
                     rows.push([]);
               }
               rows[rows.length - 1].push(item);
               return rows;
            }, []).map((row, index) => (
               <div key={`row-${index}`} className="images-flex_row">
                     {row.map((item) => (
                        <div key={`img-${item.key}`} style={{position: 'relative'}}>
                           <button style={{position: 'absolute', zIndex: 1, color: 'red', cursor: 'pointer',
                                       right: 20, top: 15, fontSize: 20, padding: 10}}
                                       onClick={() => handleRemoveImage(item.key)}>X</button>
                           <div className='images-flex_column' onClick={() => handleSetImage(item.key)}>
                              <Card ad_image={item.value} address={''} title={''}
                                    price={''} date={''} type='newAd' classname={'xs'}/>
                           </div>
                        </div>
                     ))}
               </div>
            )) : null}
         </div>
         
      </div>
   );
};

export default UploadImages;