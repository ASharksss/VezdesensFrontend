import React from 'react';
import smallImg from '../../asserts/small_card_img.png'
import mainImg from '../../asserts/main_card_img.png'
import SmallImg from "./SmallImg";

const CardImgBlock = ({ad_address}) => {
    return (
        <div>
            <p className='card_ad_address'>{ad_address}</p>
            <div className="smallImg flex">
                <div className="flex column">
                    <SmallImg img={smallImg} title={'Наушник Промакс'}/>
                    <SmallImg img={smallImg} title={'Наушник Промакс'}/>
                    <SmallImg img={smallImg} title={'Наушник Промакс'}/>
                </div>
                    <img src={mainImg} alt="Наушники промакс" className='main_card_img'/>
            </div>
        </div>
    );
};

export default CardImgBlock;