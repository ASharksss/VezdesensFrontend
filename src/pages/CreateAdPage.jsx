import React, {useState} from 'react';
import CreateAdItem from "../components/createAdItem/createAdItem";
import photoPremium from "../asserts/icons/upload_premium.svg"
import photoStandartPlus from "../asserts/icons/photoStandartPlus.svg"
import photoStandart from "../asserts/icons/photoStandart.svg"
import UploadPhotoPremium from "../components/uploadPhoto/uploadPhotoPremium";
import UploadPhotoVip from "../components/uploadPhoto/uploadPhotoVip";
import UploadPhotoStandartPlus from "../components/uploadPhoto/uploadPhotoStandartPlus";
import UploadPhotoStandart from "../components/uploadPhoto/uploadPhotoStandart";

const CreateAdPage = () => {

	const [typeAd, setTypeAd] = useState()
	console.log(typeAd)
	return (
		<div>
			<div className="container">
				<div className="create_ad">
					<h1 className='create_ad-title'>Подать объявление</h1>
					<div className="create_ad_wrapper">
						<div className="create_ad-category">
							<h2 className='create_ad-category-title'>Категория</h2>
							<select className='create_ad-select' name="" id="">
								<option>Выберите значение</option>
								<option>1</option>
								<option>2</option>
							</select>
							<select className='create_ad-select' name="" id="">
								<option>Выберите значение</option>
								<option>1</option>
								<option>2</option>
							</select>
							<select className='create_ad-select' name="" id="">
								<option>Выберите значение</option>
								<option>1</option>
								<option>2</option>
							</select>
						</div>

						<div className="create_ad-size">
							<h2 className='create_ad-size-title'>Размер объявления</h2>
							<CreateAdItem setTypeAd={setTypeAd} typeAd={typeAd}/>
						</div>

						<div className="create_ad-blocks">

							<div>
								<span className='create_ad-name'>Размер для баннера "Premium"</span>
								<div className={`create_ad_block premium ${typeAd === 'premium' ? 'checked_type_ad' : '' }`}
								onClick={() => setTypeAd('premium')}
								>
									<img src={photoPremium} alt=""/>
								</div>
							</div>

							<div className="flex end mt-50">
								<div className='mr-50'>
									<span className='create_ad-name'>Размер для баннера "Vip"</span>
									<div className={`create_ad_block vip ${typeAd === 'vip' ? 'checked_type_ad' : '' }`}
									onClick={() => setTypeAd('vip')}
									>
										<img src={photoPremium} alt=""/>
									</div>
								</div>

								<div className='mr-58'>
									<span className='create_ad-name '>Размер "Стандарт+"</span>
									<div className={`create_ad_block standart_plus ${typeAd === 'standartPlus' ? 'checked_type_ad' : '' }`}
									onClick={() => setTypeAd('standartPlus')}
									>
										<img src={photoStandartPlus} alt=""/>
									</div>
								</div>
								<div>
									<span className='create_ad-name'>Размер "Стандарт"</span>
									<div className={`create_ad_block standart ${typeAd === 'standart' ? 'checked_type_ad' : '' }`}
									onClick={() => setTypeAd('standart')}
									>
										<img src={photoStandart} alt=""/>
									</div>
								</div>
							</div>
						</div>


						<div className="upload_photo">
							<h1 className='upload_photo-h1'>Загрузка фото</h1>

							{
								typeAd === 'premium' ? <UploadPhotoPremium/> :
									typeAd === 'vip' ? <UploadPhotoVip/> :
										typeAd === 'standartPlus' ? <UploadPhotoStandartPlus/> :
											typeAd === 'standart' ? <UploadPhotoStandart/> : ''
							}


						</div>

					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateAdPage;