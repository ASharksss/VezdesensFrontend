import React from 'react';
import CreateAdItem from "../components/createAdItem/createAdItem";
import photoPremium from "../asserts/icons/upload_premium.svg"

const CreateAdPage = () => {


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
							<CreateAdItem />
						</div>
						<div className="create_ad-blocks">
							<div className="create_ad-block premium">
								<span>Фото для баннера "Premium"</span>
								<input type="file" id="file_premium" className='input_premium'/>
								<label htmlFor="file_premium" className='label_premium'>
									<img src={photoPremium} alt=""/>
								</label>
							</div>

							<div className="flex mt-50 end">
								<div className="create_ad-block vip">
									<span>Фото для баннера "VIP"</span>
									<input type="file" id="file_vip" className='input_premium'/>
									<label htmlFor="file_vip" className='label_vip'>
										<img src={photoPremium} alt=""/>
									</label>
								</div>
								<div className="create_ad-block standart_plus">
									<span>Фото "Стандарт+"</span>
									<input type="file" id="file_standart_plus" className='input_premium'/>
									<label htmlFor="file_standart_plus" className='label_standart_plus'>
										<img src={photoPremium} alt=""/>
									</label>
								</div>
								<div className="create_ad-block standart">
									<span>Фото "Стандарт+"</span>
									<input type="file" id="file_standart" className='input_premium'/>
									<label htmlFor="file_standart" className='label_standart'>
										<img src={photoPremium} alt=""/>
									</label>
								</div>
							</div>

						</div>
					</div>
				</div>

			</div>
		</div>
	);
};

export default CreateAdPage;