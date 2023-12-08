import React, {useRef, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css'
import './uploadPhoto.css'
import photoPremium from "../../asserts/icons/upload_premium.svg"
import Card from '../cards/Card';
import ModalMain from '../modal/modalMain';

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
		setEditedImage(croppedData)
		setActiveModal(false)
	}

	const onDrop = (acceptedFiles) => {
		const file = acceptedFiles[0]
		const reader = new FileReader()
		reader.onloadend = () => {
			setImage(reader.result)
			setEditedImage(reader.result)
		}
		reader.readAsDataURL(file)
	};

	const {getInputProps} = useDropzone({onDrop});
	const removeImage = () => {
		setImage(null);
	};

	return (
		<div className='upload_premium upload_block'>
			<span className='upload_block-title mb-20'>Фото для баннера "Premium"</span>
			<div className='flex mt-20 mb-20'>
				<label htmlFor="premium_input" className='upload_file_input upload_premium-label'>
					<img src={photoPremium} alt=""/>
				</label>
				<input {...getInputProps()} id='premium_input' className='upload-input' accept="image/png, image/jpeg"/>
				<div className="upload_info-premium ml-20">
					<p className='upload_info-premium-text'>Загрузите 1 фото</p>
					<p className='upload_info-premium-format'>Формат JPG, JPEG, PNG</p>
				</div>
			</div>
			{image !== null ?
				<div style={{position: 'relative', width: '77%'}}>
					<button onClick={() => removeImage()}
									style={{position: 'absolute', zIndex: 1, color: 'red', cursor: 'pointer',
									right: 20, top: 15, fontSize: 20, padding: 10}}>
					X</button>
					<div className='images-flex_column' onClick={() => setActiveModal(true)}>
						<Card ad_image={editedImage} address={''} title={''}
								price={''} date={''} type='newAd' classname={'xl'}/>
					</div>
				</div> : null}
			{(image || activeModal) && (
				<ModalMain activeModal={activeModal} setActiveModal={setActiveModal} children={
				<>
					<Cropper
						ref={cropperRef}
						src={image}
						style={{ height: 400, width: '100vh' }}
						guides={false}
						viewMode={1}
						zoomable={false}
						dragMode='crop'
						crop={onCrop}
					/>
					<button onClick={() => handleSaveImage()}>Save</button>
				</>} /> )}
		</div>
	);
};

export default UploadPhotoPremium;