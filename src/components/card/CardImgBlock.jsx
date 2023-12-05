import React from 'react';
import smallImg from '../../asserts/small_card_img.png'
import mainImg from '../../asserts/main_card_img.png'
import SmallImg from "./SmallImg";
import Button from "../../ui/buttons/button";
import {STATIC_HOST} from "../../utils";
import {useNavigate} from "react-router-dom";

const CardImgBlock = ({ad_address, images, id}) => {
	const navigate = useNavigate()

	const handleShowSimilar = () => navigate({
		pathname: '/similar',
		search: `?object=${id}`,
	})

	return (
		<div>
			<p className='card_ad_address'>{ad_address}</p>
			<div className="smallImg flex">
				<div className="flex column">
					{images.length > 0 ? images.map((item, index) =>
						<SmallImg key={`smallimg-${index}-${item.id}`} img={`${STATIC_HOST}/${item.name}`} title={item.name}/>
					) : <SmallImg img={smallImg} title={'Наушник Промакс'}/>}
				</div>
				<div className='relative main_card_img-container'>
					<img data-fancybox="gallery" src={images.length > 0 ? `${STATIC_HOST}/${images[0].name}` : mainImg} alt="Наушники промакс" className='main_card_img'/>
					<Button classname={'like_ads'} children={'Показать похожие'} handleClick={handleShowSimilar}/>
				</div>
			</div>
		</div>
	);
};

export default CardImgBlock;