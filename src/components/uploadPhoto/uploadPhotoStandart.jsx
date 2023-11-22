import React, {useEffect, useRef, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor';
import photoStandart from "../../asserts/icons/photoStandart.svg";

const UploadPhotoStandart = ({setSaveImages, imageTrigger}) => {
	const [images, setImages] = useState([]);
	const [editedImages, setEditedImages] = useState([]);
	const editorRefs = useRef([]);


	const onDrop = (acceptedFiles) => {
		console.log(acceptedFiles)
		setImages((prevImages) => [...prevImages, ...acceptedFiles]);
	};

	useEffect(() => {
		const edited = editedImages.map((image, index) => {
			const canvas = editorRefs.current[index].getImageScaledToCanvas();
			return canvas.toDataURL();
		});
		setSaveImages((prev) => [...prev, ...edited])
		// Здесь вы можете обработать сохраненные изображения, например, отправить на сервер или сохранить локально
		console.log('Отредактированные изображения:', edited);
	}, [imageTrigger]);

	const {getInputProps} = useDropzone({onDrop});
	const removeImage = (index) => {
		const updatedItems = [...images];
		console.log(index, updatedItems)
		updatedItems.splice(index, 1);
		setImages(updatedItems);
	};

	return (
		<div className='upload_standart upload_block'>
			<span className='upload_block-title'>Фото "Стандарт"</span>
			<div className='flex mt-20'>
				<label htmlFor="standart_input" className='upload_file_input upload_standart-label'>
					<img src={photoStandart} alt=""/>
				</label>
				<input {...getInputProps()} id='standart_input' className='upload-input' accept="image/png, image/jpeg"/>
				<div className="upload_info">
					<p className='upload_info-premium-text'>Загрузите 1 фото</p>
					<p className='upload_info-premium-format'>Формат JPG, JPEG, PNG</p>
					<div>
						{images.length > 0 ? images.map((item, index) => (
							<div key={index} style={{position: 'relative'}}>
								<button onClick={() => removeImage(index)}
												style={{
													position: 'absolute',
													color: 'red',
													fontWeight: 'bold',
													fontSize: '1.5rem',
													right: 10
												}}>X
								</button>
								<AvatarEditor
									ref={(editor) => (editorRefs.current[index] = editor)}
									image={item}
									width={188}
									height={250}
									borderRadius={10}
									color={[255, 255, 255, 0.1]}
									scale={1.2}
									onImageChange={(editedImage) => {
										const edited = [...editedImages];
										edited[index] = editedImage;
										setEditedImages(edited);
									}}
								/>
							</div>
						)) : null}
					</div>
				</div>
			</div>

		</div>
	);
};

export default UploadPhotoStandart;