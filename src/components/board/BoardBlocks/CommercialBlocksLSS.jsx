import React from 'react';
import Card from "../../cards/Card";
import ad_image_s from '../../../asserts/ad_image_s.png'


const CommercialBlocksLss = ({items}) => {
	return (
		<div className='flex'>
			{items !== undefined && items.map((item, index) => (
				item.typeAdId === 2 ?
					<Card classname={'s'} ad_image={ad_image_s}
								title={item.title} address={item.address} price={item.price}
								favorite={item.favorites} date={item.date} id={item.id}
								key={`commercialCard-${item.index}-${item.id}`}/> : null
			))}
		</div>
	);
};

export default CommercialBlocksLss;