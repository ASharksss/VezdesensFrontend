import React, {useEffect, useRef, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {Cropper} from 'react-cropper';
import 'cropperjs/dist/cropper.css'
import './uploadPhoto.css'
import photoPremium from "../../asserts/icons/upload_premium.svg"
import Card from '../cards/Card';
import ModalMain from '../modal/modalMain';
import deleteImg from "../../asserts/icons/deleteImg.svg";

const UploadPhotoPremium = ({editedImage, setEditedImage}) => {
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
				const imageSizeCheck = this.width === 824 && this.height === 333
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
		<div className='upload_premium upload_block'>
			<span className='upload_block-title mb-20'>Загрузите фото для превью</span>

			{(editedImage?.value || image !== null) ?
				<div style={{position: 'relative', width: '77%'}}>
					<button onClick={() => removeImage()} className='deleteImg_premiumBtn'><img src={deleteImg} alt=""/></button>
					<div className='images-flex_column' onClick={() => setActiveModal(true)}>
						<img src={editedImage.value} alt=""/>
					</div>
				</div> :
				<div className='flex mt-20 mb-20'>
					<label htmlFor="premium_input" className='upload_file_input upload_premium-label'>
						<img src={photoPremium} alt=""/>
					</label>
					<input {...getInputProps()} id='premium_input' className='upload-input' accept="image/png, image/jpeg"/>
					<div className="upload_info-premium ml-20">
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
							aspectRatio={824 / 333}
							cropBoxResizable={true}
							viewMode={1}
							zoomable={false}
							dragMode='crop'
							crop={onCrop}
						/>
						<button type='button' className='uploadPhoto-btn' onClick={() => handleSaveImage()}>Сохранить</button>
					</>}/>)}
		</div>
	);
};

export default UploadPhotoPremium;
