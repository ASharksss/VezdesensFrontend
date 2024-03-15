import React, {useState} from 'react';
import smallImg from '../../asserts/small_card_img.png'
import mainImg from '../../asserts/main_card_img.png'
import SmallImg from "./SmallImg";
import Button from "../../ui/buttons/button";
import {STATIC_HOST} from "../../utils";
import {useNavigate} from "react-router-dom";
import Fancybox from "../fancybox";
import './card.css'


const CardImgBlock = ({title, images, id}) => {
	const navigate = useNavigate()
	const [checkedIndex, setCheckedIndex] = useState(0)
	const handleShowSimilar = () => navigate({
		pathname: '/similar',
		search: `?object=${id}`,
	})

	return (
		<div>
			<div className="smallImg flex">
				<div className="flex column card_img_block">
					{images.length > 0 ? images.map((item, index) =>
						<SmallImg setCheckedIndex={setCheckedIndex} checkedIndex={checkedIndex} index={index}
											key={`smallimg-${index}-${item.id}`} img={`${STATIC_HOST}/${item.name}`} title={title}/>
					) : <SmallImg img={smallImg} title={'Наушник Промакс'}/>}
				</div>
				<Fancybox
					options={{
						Carousel: {
							infinite: true,
						},
					}}>
					<div className='relative main_card_img-container'>
						<img data-fancybox="gallery"
								 src={images.length > 0 ? `${STATIC_HOST}/${images[checkedIndex].name}` : mainImg}
								 alt={title} className='main_card_img'/>
						<Button classname={'like_ads'} children={'Показать похожие'} handleClick={handleShowSimilar}/>
					</div>
					{images.length > 0 ? images.map((item, index) => index !== checkedIndex &&
						<img hidden={true} data-fancybox="gallery" src={`${STATIC_HOST}/${item.name}`} alt={title}
								 className='small_img_card'/>
					) : null}
				</Fancybox>
			</div>
		</div>
	);
};

export default CardImgBlock;