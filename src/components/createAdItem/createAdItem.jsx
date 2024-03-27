import React from 'react';
import './createAdItem.css'
import photoStandart from "../../asserts/icons/upload_stanrat.svg";
import photoStandartPlus from "../../asserts/icons/upload_standartPlus.svg";
import photoPremium from "../../asserts/icons/upload_premium.svg";

const CreateAdItem = ({setTypeAd, typeAd}) => {


    return (
        <>
            <form>
                <div className="">
                    <div className="create_ad_size-item">
                        <input id='standart' type="radio" name='standart' className='create_ad_size-checkbox '
                               onChange={() => setTypeAd('standart')} checked={typeAd === 'standart'}/>
                        <label onClick={() => setTypeAd('standart')}>
                            <div className="create_ad_size-item-description">
                                <div className='flex items-center'>
                                    <label htmlFor="standart" className='create_ad_size-item-title'>Стандарт</label>
                                    <span className='create_ad_size-item-cost'>Бесплатно</span>
                                </div>

                                <p className='create_ad_size-item-text'>Размер изображения 248 на 233 пикселей.
                                    Показывается в течение 30 дней, после чего его можно заново
                                    запустить. Таких объявлений большинство. Бронирования не требует.
                                </p>
                            </div>
                            <div
                                className={`create_ad_block standart ${typeAd === 'standart' ? 'checked_type_ad' : ''}`}
                                onClick={() => setTypeAd('standart')}>
                                <img src={photoStandart} alt=""/>
                            </div>
                        </label>
                    </div>

                    <div className="create_ad_size-item">
                        <input id='standartPlus' type="radio" name='standartPlus' className='create_ad_size-checkbox'
                               onChange={() => setTypeAd('standartPlus')} checked={typeAd === 'standartPlus'}
                        />
                        <label onClick={() => setTypeAd('standartPlus')}>
                            <div className="create_ad_size-item-description">
                                <div className='flex items-center'>
                                    <label htmlFor="standartPlus" className='create_ad_size-item-title'>Стандарт
                                        +</label>
                                    <span className='create_ad_size-item-cost'>4 ₽ в сутки</span>
                                </div>
                                <p className='create_ad_size-item-text'>Размер изображения 315
                                    на 417 пикселей. Требует бронирования, указываются дата начала и конца показов.
                                    Далее рассчитывается по формуле:<br/>
                                    <b>Итоговая стоимость = рубли в сутки * количество дней.</b><br/>
                                    В случае, если выбранный диапазон меньше 30 дней, то по истечению бронирования
                                    объявление станет стандартным.
                                </p>
                            </div>
                            <div
                                className={`create_ad_block standart_plus ${typeAd === 'standartPlus' ? 'checked_type_ad' : ''}`}
                                onClick={() => setTypeAd('standartPlus')}>
                                <img src={photoStandartPlus} alt=""/>
                            </div>
                        </label>
                    </div>


                    <div className="create_ad_size-item">
                        <input id='vip' type="radio" name='vip' className='create_ad_size-checkbox'
                               onChange={() => setTypeAd('vip')} checked={typeAd === 'vip'}
                        />
                        <label onClick={() => setTypeAd('vip')}>
                            <div className="create_ad_size-item-description">
                                <div className='flex items-center'>
                                    <label htmlFor="vip" className='create_ad_size-item-title'>ВИП</label>
                                    <span className='create_ad_size-item-cost'>8 ₽ в сутки</span>
                                </div>
                                <p className='create_ad_size-item-text'>Размер изображения 690
                                    на 417 пикселей. Требует бронирования, указываются дата начала и конца показов.
                                    Далее рассчитывается по формуле: <br/>
                                    <b>Итоговая стоимость = рубли в сутки * количество дней.</b><br/>
                                    В случае, если выбранный диапазон меньше 30 дней, то по истечению бронирования
                                    объявление станет стандартным.
                                </p>
                            </div>
                            <div className={`create_ad_block vip ${typeAd === 'vip' ? 'checked_type_ad' : ''}`}
                                 onClick={() => setTypeAd('vip')}>
                                <img src={photoPremium} alt=""/>
                            </div>
                        </label>
                    </div>

                    <div className="create_ad_size-item">
                        <input id='premium' type="radio" name='premium' className='create_ad_size-checkbox'
                               onChange={() => setTypeAd('premium')} checked={typeAd === 'premium'}
                        />
                        <label onClick={() => setTypeAd('premium')}>
                            <div className="create_ad_size-item-description">
                                <div className='flex items-center'>
                                    <label htmlFor="premium" className='create_ad_size-item-title'>Премиум</label>
                                    <span className='create_ad_size-item-cost'>30 ₽ в сутки</span>
                                </div>
                                <p className='create_ad_size-item-text'>Размер изображения 1400 на 417 пикселей.
                                    Всего 2 таких объявления – верхний и нижний. Расположены на самом верху.
                                    Требует бронирования указываются дата начала и конца показов. Далее рассчитывается
                                    по формуле: <br/>
                                    <b>Итоговая стоимость = рубли в сутки * количество дней.</b><br/>
                                    В случае, если выбранный диапазон меньше 30 дней, то по истечению бронирования
                                    объявление станет стандартным.

                                </p>
                            </div>
                            <div
                                className={`create_ad_block premium ${typeAd === 'premium' ? 'checked_type_ad' : ''}`}
                                onClick={() => setTypeAd('premium')}>
                                <img src={photoPremium} alt=""/>
                            </div>
                        </label>
                    </div>
                </div>


            </form>
        </>
    );
};

export default CreateAdItem;
