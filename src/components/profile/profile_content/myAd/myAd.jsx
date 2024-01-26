import React from 'react';
import {NavLink} from "react-router-dom";
import './myAd.css'
import Button from "../../../../ui/buttons/button";
import MyAdActionsActive from "./MyAdActionsActive";
import MyAdActionsArchive from "./MyAdActionsArchive";
import MyAdActionsFavorite from "./MyAdActionsFavorite";
import {numberWithSpaces, STATIC_HOST} from "../../../../utils";
import Fancybox from "../../../fancybox";

const MyAd = ({statusAd, typeAd, item, setDataAds}) => {
  if (item) {
    return (
      <>
        <div key={'myAd' + item.id} className={'myAd '}>
          <div className=" myAd_container flex">
            {statusAd === 'myAd_grey' ? <div className='myAd_grey'></div> : ''}
            {
              typeAd === 'activeAd' ? <MyAdActionsActive dataUser={item} setDataAds={setDataAds}/> :
                typeAd === 'archiveAd' ? <MyAdActionsArchive dataUser={item} setDataAds={setDataAds}/> :
                  typeAd === 'favoriteAd' ? <MyAdActionsFavorite statusAd={statusAd} dataUser={item}
                                                                 setDataAds={setDataAds}/> :
                    'ничего не передано'
            }
            <Fancybox
              options={{
                Carousel: {
                  infinite: false,
                },
              }}>
              <div className="myAd_img">

                <img data-fancybox="gallery"
                     src={`${STATIC_HOST}/${item.previewImageAds[0]?.name}`}
                     alt="НАЗВАНИЕ ТОВАРА"
                     className={statusAd === 'myAd_grey' ? 'myAd_img-image opacity-50' : 'myAd_img-image'}/>
              </div>
            </Fancybox>
            <div className="myAd_description">
              <h1 className='myAd_title bold'>{item.title}</h1>
              <h2 className='myAd_price bold'>{numberWithSpaces(item.price)} ₽</h2>
              <p className='myAd_ad_description'>{item.description}</p>
              <div className="myAd_open_description">
                <NavLink to={`/card/${item.id}`}>
                  <Button classname={'stroke'} children={'Показать всё'}/>
                </NavLink>
              </div>
              {
                typeAd === 'activeAd' || typeAd === 'archiveAd' ?
                  <p className='myAd_type absolute'>{item.typeAd.name}</p>
                  : null
              }
            </div>

          </div>
        </div>
      </>
    );
  }
};

export default MyAd;
