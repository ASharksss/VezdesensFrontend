import React from 'react';
import './myAd.css'
import Button from "../../../../ui/buttons/button";
import ad_img from '../../../../asserts/ad_image_xs.png'
import favorite from "../../../../asserts/icons/favorite.svg"
import MyAdActionsActive from "./MyAdActionsActive";
import MyAdActionsArchive from "./MyAdActionsArchive";
import MyAdActionsFavorite from "./MyAdActionsFavorite";

const MyAd = ({classname, typeAd}) => {
  return (
    <div className={'myAd ' + classname}>
      <div className=" myAd_container flex">

        {
          typeAd === 'activeAd' ? <MyAdActionsActive/> :
            typeAd === 'archiveAd' ? <MyAdActionsArchive/> :
              typeAd === 'favoriteAd' ? <MyAdActionsFavorite/> :
                'ничего не передано'
        }


        <div className="myAd_img">
          <img src={ad_img} alt="НАЗВАНИЕ ТОВАРА" className='myAd_img-image'/>
        </div>
        <div className="myAd_description">
          <h1 className='myAd_title bold'>iPhone 14 pro max 256gb</h1>
          <h2 className='myAd_price bold'>109 990р</h2>
          <p className='myAd_ad_description'>iPhone 14 pro max + Фирменный подарок!
            ГАРАНТИЯ !
            КРЕДИТ БЕЗ ПЕРВОНАЧАЛЬНОГО ВЗНОСА !
            Абсолютно новый ( НЕ ВОССТАНОВЛЕННЫЙ ) в заводской упаковке iPhone 14 Pro Max Deep Purple ! 14 Pro Max Deep
            Purple ! 14 Pro Max Deep Purple !
            🌐🌐🌐🌐🌐
            📱MQ993J/A
          </p>
          <div className="myAd_open_description">
            <Button classname={'stroke'} children={'Показать всё'}/>
          </div>
          {
            typeAd === 'favoriteAd' ? <img src={favorite} alt="лоек" className='absolute'/> :
              typeAd === 'activeAd' || typeAd === 'archiveAd' ?
                <p className='myAd_type absolute'>Стандарт</p>
                :
                  'ничего не передано'
          }
        </div>

      </div>
    </div>
  );
};

export default MyAd;