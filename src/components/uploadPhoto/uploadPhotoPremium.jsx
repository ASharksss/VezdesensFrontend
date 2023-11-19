import React from 'react';
import './uploadPhoto.css'
import photoPremium from "../../asserts/icons/upload_premium.svg"
import photoStandartPlus from "../../asserts/icons/photoStandartPlus.svg"
import photoStandart from "../../asserts/icons/photoStandart.svg"

const UploadPhotoPremium = () => {
	return (
		<>
			<div className='upload_premium upload_block'>
				<span className='upload_block-title mb-20'>Фото для баннера "Premium"</span>

					<label htmlFor="premium_input" className='upload_file_input upload_premium-label'>
						<img src={photoPremium} alt=""/>
					</label>
					<input type="file" id='premium_input' className='upload-input'/>
					<div className="upload_info-premium">
						<p className='upload_info-premium-text'>Загрузите 1 фото</p>
						<p className='upload_info-premium-format'>Формат JPG, JPEG, PNG</p>
					</div>


			</div>






		</>

	);
};

export default UploadPhotoPremium;