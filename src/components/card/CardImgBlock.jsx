import React from 'react';
import smallImg from '../../asserts/small_card_img.png'
import mainImg from '../../asserts/main_card_img.png'
import SmallImg from "./SmallImg";
import Button from "../../ui/buttons/button";
import {HOST} from "../../utils";

const CardImgBlock = ({ad_address, images}) => {
	return (
		<div>
			<p className='card_ad_address'>{ad_address}</p>
			<div className="smallImg flex">
				<div className="flex column">
					{images.length > 0 ? images.map((item, index) =>
						<SmallImg key={`smallimg-${index}-${item.id}`} img={`${HOST}/${item.name}`} title={'Наушник Промакс'}/>
					) : <SmallImg img={smallImg} title={'Наушник Промакс'}/>}
				</div>
				<div className='relative main_card_img-container'>
					<img src={images.length > 0 ? `${HOST}/${images[0].name}` : mainImg} alt="Наушники промакс" className='main_card_img'/>
					<Button classname={'like_ads'} children={'Показать похожие'}/>
				</div>
			</div>
		</div>
	);
};

export default CardImgBlock;