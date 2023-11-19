import React from 'react';
import photoPremium from "../../asserts/icons/upload_premium.svg";

const UploadPhotoVip = () => {
	return (
		<div className='upload_vip upload_block'>
			<span className='upload_block-title'>Фото для баннера "VIP" </span>
			<div className='flex mt-20'>
				<label htmlFor="vip_input" className='upload_file_input upload_vip-label'>
					<img src={photoPremium} alt=""/>
				</label>
				<input type="file" id='vip_input' className='upload-input'/>
				<div className="upload_info">
					<p className='upload_info-premium-text'>Загрузите 1 фото</p>
					<p className='upload_info-premium-format'>Формат JPG, JPEG, PNG</p>
				</div>
			</div>

		</div>
	);
};

export default UploadPhotoVip;