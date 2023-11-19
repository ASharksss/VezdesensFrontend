import React from 'react';
import photoStandartPlus from "../../asserts/icons/photoStandartPlus.svg";

const UploadPhotoStandartPlus = () => {
	return (
		<div className='upload_standartPlus upload_block'>
			<span className='upload_block-title'>Фото "Стандарт+" </span>
			<div className='flex mt-20'>
				<label htmlFor="standartPlus_input" className='upload_file_input upload_standartPlus-label'>
					<img src={photoStandartPlus} alt=""/>
				</label>
				<input type="file" id='standartPlus_input' className='upload-input'/>
				<div className="upload_info">
					<p className='upload_info-premium-text'>Загрузите 1 фото</p>
					<p className='upload_info-premium-format'>Формат JPG, JPEG, PNG</p>
				</div>
			</div>

		</div>
	);
};

export default UploadPhotoStandartPlus;