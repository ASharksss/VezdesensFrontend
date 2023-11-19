import React from 'react';
import photoStandart from "../../asserts/icons/photoStandart.svg";

const UploadPhotoStandart = () => {
	return (
		<div className='upload_standart upload_block'>
			<span className='upload_block-title'>Фото "Стандарт"</span>
			<div className='flex mt-20'>
				<label htmlFor="standart_input" className='upload_file_input upload_standart-label'>
					<img src={photoStandart} alt=""/>
				</label>
				<input type="file" id='standart_input' className='upload-input'/>
				<div className="upload_info">
					<p className='upload_info-premium-text'>Загрузите 1 фото</p>
					<p className='upload_info-premium-format'>Формат JPG, JPEG, PNG</p>
				</div>
			</div>

		</div>
	);
};

export default UploadPhotoStandart;