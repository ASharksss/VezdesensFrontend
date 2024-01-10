import React from 'react';
import './createAdItem.css'
import photoStandart from "../../asserts/icons/upload_stanrat.svg";
import photoStandartPlus from "../../asserts/icons/upload_standartPlus.svg";
import photoPremium from "../../asserts/icons/upload_premium.svg";

const CreateAdItem = ({setTypeAd, typeAd, premium, categories}) => {


  return (
    <>
      <form>
				<div className="">
					<div className="create_ad_size-item">
						<input id='standart' type="radio" name='standart' className='create_ad_size-checkbox'
									 onChange={() => setTypeAd('standart')} checked={typeAd === 'standart'}/>
						<div className="create_ad_size-item-description">
							<div className='flex items-center'>
								<label htmlFor="standart" className='create_ad_size-item-title'>Стандарт</label>
								<span className='create_ad_size-item-cost'>Бесплатно</span>
							</div>

							<p className='create_ad_size-item-text'>Формат изображения , размер изображения такой то такой то,
								преимущества и недостатки если выберешь такой размер объявления,
								сколько по времени будет висеть объявление
							</p>
						</div>
						<div>
							<div className={`create_ad_block standart ${typeAd === 'standart' ? 'checked_type_ad' : ''}`}
									 onClick={() => setTypeAd('standart')}>
								<img src={photoStandart} alt=""/>
							</div>
						</div>
					</div>
					<div className="create_ad_size-item">
						<input id='standartPlus' type="radio" name='standartPlus' className='create_ad_size-checkbox'
									 onChange={() => setTypeAd('standartPlus')} checked={typeAd === 'standartPlus'}
						/>
						<div className="create_ad_size-item-description">
							<div className='flex items-center'>
								<label htmlFor="standartPlus" className='create_ad_size-item-title'>Стандарт +</label>
								<span className='create_ad_size-item-cost'>500</span>
							</div>
							<p className='create_ad_size-item-text'>Формат изображения , размер изображения такой то такой то,
								преимущества и недостатки если выберешь такой размер объявления,
								сколько по времени будет висеть объявление
							</p>
						</div>
						<div>
							<div className={`create_ad_block standart_plus ${typeAd === 'standartPlus' ? 'checked_type_ad' : ''}`}
									 onClick={() => setTypeAd('standartPlus')}>
								<img src={photoStandartPlus} alt=""/>
							</div>
						</div>
					</div>


					<div className="create_ad_size-item">
						<input id='vip' type="radio" name='vip' className='create_ad_size-checkbox'
									 onChange={() => setTypeAd('vip')} checked={typeAd === 'vip'}
						/>
						<div className="create_ad_size-item-description">
							<div className='flex items-center'>
								<label htmlFor="vip" className='create_ad_size-item-title'>ВИП</label>
								<span className='create_ad_size-item-cost'>1000</span>
							</div>
							<p className='create_ad_size-item-text'>Формат изображения , размер изображения такой то такой то,
								преимущества и недостатки если выберешь такой размер объявления,
								сколько по времени будет висеть объявление
							</p>
						</div>
						<div>
							<div className={`create_ad_block vip ${typeAd === 'vip' ? 'checked_type_ad' : ''}`}
									 onClick={() => setTypeAd('vip')}>
								<img src={photoPremium} alt=""/>
							</div>
						</div>
					</div>
					{premium ?
						<div className="create_ad_size-item">
							<input id='premium' type="radio" name='premium' className='create_ad_size-checkbox'
										 onChange={() => setTypeAd('premium')} checked={typeAd === 'premium'}
							/>
							<div className="create_ad_size-item-description">
								<div className='flex items-center'>
									<label htmlFor="premium" className='create_ad_size-item-title'>Премиум</label>
									<span className='create_ad_size-item-cost'>3000</span>
								</div>
								<p className='create_ad_size-item-text'>Формат изображения , размер изображения такой то такой то,
									преимущества и недостатки если выберешь такой размер объявления,
									сколько по времени будет висеть объявление
								</p>
							</div>
							{categories.premium ? <div>
								<div className={`create_ad_block premium ${typeAd === 'premium' ? 'checked_type_ad' : ''}`}
										 onClick={() => setTypeAd('premium')}>
									<img src={photoPremium} alt=""/>
								</div>
							</div> : null}
						</div> : null}
				</div>


      </form>
    </>
  );
};

export default CreateAdItem;