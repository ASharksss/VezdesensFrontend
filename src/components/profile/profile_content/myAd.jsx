import React from 'react';
import './profile_content.css'
import Button from "../../../ui/buttons/button";
import edit from '../../../asserts/icons/edit.svg'
import ad_img from '../../../asserts/ad_image_xs.png'

const MyAd = ({classname}) => {
  return (
    <div className={'myAd ' + classname}>
      <div className="flex">
        <div className="myAd_actions">
          <p>Осталось</p><p>23 дня</p>
          <p>Избранное</p><p>1</p>
          <p>Сообщения</p><p>0</p>
          <p>Просмотров</p><p>289</p>
          <Button classname={'edit'} icon={edit} />
          <br/>
          <Button classname={'stroke'} children={'Снять с публикации'}/>
        </div>
        <div className="myAd_img">
          <img src={ad_img} alt="НАЗВАНИЕ ТОВАРА" className='myAd_img-image'/>
        </div>
        <div className="myAd_description">
          <h1 className='myAd_title'>iPhone 14 pro max 256gb</h1>
          <h2 className='myAd_title'>109 990р</h2>
          <p className='myAd_ad_description'>iPhone 14 pro max + Фирменный подарок!
            ГАРАНТИЯ !
            КРЕДИТ БЕЗ ПЕРВОНАЧАЛЬНОГО ВЗНОСА !
            Абсолютно новый ( НЕ ВОССТАНОВЛЕННЫЙ ) в заводской упаковке iPhone 14 Pro Max Deep Purple ! 14 Pro Max Deep Purple ! 14 Pro Max Deep Purple !
            🌐🌐🌐🌐🌐
            📱MQ993J/A
          </p>
        </div>
      </div>

    </div>
  );
};

export default MyAd;