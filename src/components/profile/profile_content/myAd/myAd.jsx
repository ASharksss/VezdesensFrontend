import React, {useEffect, useState} from 'react';
import './myAd.css'
import Button from "../../../../ui/buttons/button";
import ad_img from '../../../../asserts/ad_image_xs.png'
import favorite from "../../../../asserts/icons/favorite.svg"
import MyAdActionsActive from "./MyAdActionsActive";
import MyAdActionsArchive from "./MyAdActionsArchive";
import MyAdActionsFavorite from "./MyAdActionsFavorite";
import {NavLink} from "react-router-dom";
import {numberWithSpaces} from "../../../../utils";

const MyAd = ({classname, typeAd, item}) => {
	if (item) {
		return (
			<>
				<div key={'myAd' + item.id} className={'myAd ' + classname}>
					<div className=" myAd_container flex">

              {
                typeAd === 'activeAd' ? <MyAdActionsActive dataUser={item}/> :
                  typeAd === 'archiveAd' ? <MyAdActionsArchive dataUser={item}/> :
                    typeAd === 'favoriteAd' ? <MyAdActionsFavorite dataUser={item}/> :
                      'ничего не передано'
              }


              <div className="myAd_img">
                <img src={ad_img} alt="НАЗВАНИЕ ТОВАРА" className='myAd_img-image'/>
              </div>
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
                  typeAd === 'favoriteAd' ? <img src={favorite} alt="лоек" className='absolute'/> :
                    typeAd === 'activeAd' || typeAd === 'archiveAd' ?
                      <p className='myAd_type absolute'>{item.typeAd.name}</p>
                      :
                      'ничего не передано'
                }
              </div>

					</div>
				</div>
			</>
		);
	}
};

export default MyAd;