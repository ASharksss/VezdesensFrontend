import {v4 as uuidv4} from 'uuid';
import React, {useState, useRef, useEffect} from 'react'
import ModalMain from '../modal/modalMain'
import {useDropzone} from 'react-dropzone';
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import Card from '../cards/Card';
import photoStandart from "../../asserts/icons/upload_stanrat.svg";


const UploadImages = ({cropData, setCropData, mainSrcData=[]}) => {      // родительское хранилище, куда записываются изменения
  // cropData: []
  const cropperRef = useRef(null)
  const [srcData, setSrcData] = useState([])            // первоначальные файлы
  const [imageLimit, setImageLimit] = useState(false)   // проверка на ограничение фото
  const [changeImage, setChangeImage] = useState(null)  // измененная картинка
  const [croppedData, setCroppedData] = useState(null)  // изменяемая картинка
  const [activeModal, setActiveModal] = useState(false) // модальное окно
  const [key, setKey] = useState(null)                  // uuid картинки для изменения
  const [lastKey, setLastKey] = useState(null)

	useEffect(() => {
		if (mainSrcData.length > 0) {
			setSrcData(mainSrcData)
		}
	}, [mainSrcData])

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
		const updatedTimeArray = cropData.map(item => {
			if (item.key === key) {
				return { key: key, value: croppedData, change: true };
			}
			return item;
		});
		setCropData(updatedTimeArray);
    setChangeImage(null)
    setKey(null)
    setCroppedData(null)
    setActiveModal(false)
  }

	function getNextByKey() {
		for (let i = 0; i < cropData.length; i++) {
			if (cropData[i].key === key && !cropData[i].change) {
				return cropData[(i - 1 + cropData.length) % cropData.length];
			}
		}
		return null;
	}

  const handleNextImage = () => {
		const nextImage = getNextByKey();
		const updatedTimeArray = cropData.map(item => {
			if (item.key === key) {
				return { key: key, value: croppedData, change: true };
			}
			return item;
		});
		setCropData(updatedTimeArray);
		if(nextImage['key'] === lastKey) {
			console.log(1)
			return setActiveModal(false)
		}
		if (nextImage !== null) {
			return handleSetImage(nextImage['key'])
		} else {
			setActiveModal(false)
		}
  }

  useEffect(() => {
    if (cropData.length >= 15)
      setImageLimit(true)
  }, [cropData])

  const onDrop = (acceptedFiles) => {
    if ((cropData.length + acceptedFiles.length) > 15) {
      return window.alert(`Превышвет допустимый предел картинок\nНа текущий момент у Вас ${cropData.length} файл(а)`)
    }
    if (acceptedFiles.length > 0) {
      acceptedFiles.map(item => {
        if (item.type !== 'image/jpeg' && item.type !== 'image/png' && item.type !== 'jpg') {
          return window.alert('Вы выбрали не правильный тип файла')
        }
        const reader = new FileReader()
        const img = new Image();
        reader.onloadend = () => {
          const v4Key = uuidv4()
          img.onload = function () {
						if (lastKey === null){
							setLastKey(v4Key)
						}
            const imageSizeCheck = this.width === 248 && this.height === 333
            setSrcData(prev => [...prev, {key: v4Key, value: reader.result}])
            setCropData(prev => [...prev, {key: v4Key, value: reader.result, change: imageSizeCheck}])
          }
          img.src = reader.result
        }
        reader.readAsDataURL(item)
      })
    }
  };

	useEffect(() => {
		if (lastKey !== null) {
			handleSetImage(lastKey)
		}
	}, [lastKey])

	useEffect(() => {
		if (activeModal === false) {
			if (lastKey !== null) {
				setLastKey(null)
			}
			setChangeImage(null)
			setKey(null)
			setCroppedData(null)
			setActiveModal(false)
		}
	}, [activeModal])

  const handleRemoveImage = (itemKey) => {
    const timeArraySrc = [...srcData], timeArrayCrop = [...cropData]
    const updatedTimeArraySrc = timeArraySrc.filter(item => item.key !== itemKey)
    const updatedTimeArrayCrop = timeArrayCrop.filter(item => item.key !== itemKey)
    setSrcData([...updatedTimeArraySrc])
    setCropData([...updatedTimeArrayCrop])
    if (updatedTimeArrayCrop.length < 15)
      setImageLimit(false)
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: {'image/*': []}})

  return (
    <div>
      <div {...getRootProps()} >
        <label htmlFor="standart_input" className='upload_file_input upload_standart-label'>
          <img src={photoStandart} alt=""/>
        </label>
				<p>Максимальный лимит фотографий 15: {srcData.length} / 15</p>
        <input {...getInputProps()} disabled={imageLimit} className='upload-input'/>
        {
          isDragActive ?
            <p>Отпустите файл(ы)...</p> :
            /*<p style={{cursor: 'pointer'}}>Перетащите файл(ы) в эту зону или нажмите чтобы выбрать файл(ы)</p>*/
          <input {...getInputProps()} disabled={imageLimit} className='upload-input'/>
        }
      </div>
      {(changeImage || activeModal) && (
        <ModalMain activeModal={activeModal} setActiveModal={setActiveModal} children={
          <>
            <Cropper
              ref={cropperRef}
              src={changeImage}
              style={{height: 400, width: '100vh'}}
              guides={false}
              aspectRatio={248 / 333}
              cropBoxResizable={true}
              viewMode={1}
              dragMode='crop'
              crop={onCrop}
            />
            <button type='button' onClick={() => handleSaveImage()}>Save</button>
						<button type='button' onClick={() => handleNextImage()}>Next</button>
          </>}/>
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
                <button style={{
                  position: 'absolute', zIndex: 1, color: 'red', cursor: 'pointer',
                  right: 20, top: 15, fontSize: 20, padding: 10
                }}
                        onClick={() => handleRemoveImage(item.key)}>X
                </button>
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