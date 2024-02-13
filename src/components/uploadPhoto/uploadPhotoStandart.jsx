import React, {useRef, useState} from 'react';
import { useDropzone } from 'react-dropzone';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css'
import photoStandart from "../../asserts/icons/upload_stanrat.svg";
import Card from '../cards/Card';
import ModalMain from '../modal/modalMain';
import deleteImg from "../../asserts/icons/deleteImg.svg";

const UploadPhotoStandart = ({editedImage, setEditedImage}) => {
														  // родительская измененная картинка
														  // editedImage: null
	const [image, setImage] = useState(null);			  // первоначальная картинка
	const [croppedData, setCroppedData] = useState(null)  // изменяемая картинка
	const [activeModal, setActiveModal] = useState(false) // модальное окно
	const cropperRef = useRef(null)

	const onCrop = () => {
		// Отслеживания изменений через хук Ref
		// перевод в base64 и запись во временный стейт 
		const cropper = cropperRef.current?.cropper
		const croppedCanvas = cropper.getCroppedCanvas()
		const croppedDataUrl = croppedCanvas.toDataURL('image/jpeg')
		setCroppedData(croppedDataUrl)
	};

	const handleSaveImage = () => {
		// Сохранения измененного изображения 
		// в модальном окне
		setEditedImage({value: croppedData, change: true})
		setActiveModal(false)
	}

	const onDrop = (acceptedFiles) => {
		// Загрузка изображения перевод его в base64
		// и запись в стейт
		const file = acceptedFiles[0]
		if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'jpg')
			return window.alert('Вы выбрали не правильный тип файла')
		const reader = new FileReader()
		const img = new Image();
		reader.onloadend = () => {
			img.onload = function() {
				const imageSizeCheck = this.width === 248 && this.height === 333
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
		<div className='upload_standart upload_block'>
			<div className="flex row">
				<div className="column mr-20">
					<span className='upload_block-title'>Фото "Стандарт"</span>
					<div className='flex mt-20'>
						<label htmlFor="standart_input" className='upload_file_input upload_standart-label'>
							<img src={photoStandart} alt=""/>
						</label>
						<input {...getInputProps()} id='standart_input' className='upload-input' disabled={image !== null} accept="image/png, image/jpeg"/>
						<div className="upload_info">
							<p className='upload_info-premium-text'>Загрузите 1 фото</p>
							<p className='upload_info-premium-format'>Формат JPG, JPEG, PNG</p>
						</div>
					</div>
				</div>
				{image !== null ?
					<div style={{position: 'relative'}}>
						<button onClick={() => removeImage()} className='deleteImg_Vipbtn'><img src={deleteImg} alt=""/></button>
						{/* отрисовка на карточке, важный параметр type: str = 'newAd' */}
						<div className='images-flex_column' onClick={() => setActiveModal(true)}>
							<Card ad_image={editedImage.value} address={''} title={''}
									price={''} date={''} type='newAd' classname={'xs'}/>
						</div>
					</div> : null}
			</div>
			{(image || activeModal) && (
				<ModalMain activeModal={activeModal} setActiveModal={setActiveModal} touched={false} children={
				<>
					{/* изменение картинки */}
					<Cropper
						ref={cropperRef}
						src={image}
						style={{ height: 400, width: '100vh' }}
						guides={false}
						viewMode={1}
						aspectRatio={248 / 333}
						cropBoxResizable={false}
						zoomable={false}
						dragMode='crop'
						crop={onCrop}
					/>
					{/* кнопка сохранения */}
					<button type='button' className='uploadPhoto-btn' onClick={() => handleSaveImage()} >Сохранить</button>
				</>} /> )}
		</div>
	);
};

export default UploadPhotoStandart;