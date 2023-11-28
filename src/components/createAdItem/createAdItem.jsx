import React from 'react';
import './createAdItem.css'

const CreateAdItem = ({setTypeAd, typeAd, premium}) => {


	return (
		<>
			<form>
				<div className="flex ">
					<div className="create_ad_size-item">
						<input id='standart' type="radio" name='standart' className='create_ad_size-checkbox'
									 onChange={() => setTypeAd('standart')} checked={typeAd === 'standart'}/>
						<div className="create_ad_size-item-description">
							<label htmlFor="standart" className='create_ad_size-item-title'>Стандарт</label>
							<span className='create_ad_size-item-cost'>Бесплатно</span>
							<p className='create_ad_size-item-text'>Формат изображения , размер изображения такой то такой то,
								преимущества и недостатки если выберешь такой размер объявления,
								сколько по времени будет висеть объявление
							</p>
						</div>
					</div>
					<div className="create_ad_size-item">
						<input id='standartPlus' type="radio" name='standartPlus' className='create_ad_size-checkbox'
									 onChange={() => setTypeAd('standartPlus')} checked={typeAd === 'standartPlus'}
						/>
						<div className="create_ad_size-item-description">
							<label htmlFor="standartPlus" className='create_ad_size-item-title'>Стандарт+</label>
							<span className='create_ad_size-item-cost'>500</span>
							<p className='create_ad_size-item-text'>Формат изображения , размер изображения такой то такой то,
								преимущества и недостатки если выберешь такой размер объявления,
								сколько по времени будет висеть объявление
							</p>
						</div>
					</div>
				</div>

				<div className="flex mt-50">
					<div className="create_ad_size-item">
						<input id='vip' type="radio" name='vip' className='create_ad_size-checkbox'
									 onChange={() => setTypeAd('vip')} checked={typeAd === 'vip'}
						/>
						<div className="create_ad_size-item-description">
							<label htmlFor="vip" className='create_ad_size-item-title'>VIP</label>
							<span className='create_ad_size-item-cost'>1000</span>
							<p className='create_ad_size-item-text'>Формат изображения , размер изображения такой то такой то,
								преимущества и недостатки если выберешь такой размер объявления,
								сколько по времени будет висеть объявление
							</p>
						</div>
					</div>
					{premium ?
					<div className="create_ad_size-item">
						<input id='premium' type="radio" name='premium' className='create_ad_size-checkbox'
									 onChange={() => setTypeAd('premium')} checked={typeAd === 'premium'}
						/>
						<div className="create_ad_size-item-description">
							<label htmlFor="premium" className='create_ad_size-item-title'>Premium</label>
							<span className='create_ad_size-item-cost'>3000</span>
							<p className='create_ad_size-item-text'>Формат изображения , размер изображения такой то такой то,
								преимущества и недостатки если выберешь такой размер объявления,
								сколько по времени будет висеть объявление
							</p>
						</div>
					</div> : null}
				</div>
			</form>
		</>
	);
};

export default CreateAdItem;