import React from 'react';
import Card from "../../cards/Card";
import ad_image_s from '../../../asserts/ad_image_s.png'
import {HOST} from "../../../utils";


const CommercialBlocksLss = ({items}) => {
	return (
		<div className='flex'>
			{items !== undefined && items.map((item, index) => (
					<Card classname={'s'} ad_image={item.imageAds.length > 0 ? `${HOST}/${item.imageAds[0].name}` : ad_image_s}
								title={item.title} address={item.address} price={item.price}
								favorite={item.favorites} date={item.date} id={item.id}
								key={`commercialCard-${index}-${item.id}`}/>
			))}
		</div>
	);
};

export default CommercialBlocksLss;