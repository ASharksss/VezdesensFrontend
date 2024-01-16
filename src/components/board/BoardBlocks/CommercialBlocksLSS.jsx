import React from 'react';
import Card from "../../cards/Card";


const CommercialBlocksLss = ({items}) => {
	return (
		<div className='flex'>
			{items !== undefined && items.map((item, index) => (
				<Card classname={item.typeAdId === 2 ? 's' : item.typeAdId === 3 ? 'l' : 's'}
							ad_image={item.previewImageAds[0]?.name}
							title={item.title} address={item.address} price={item.price}
							favorite={item.favorites} date={item.date} id={item.id}
							key={`commercialCard-${index}-${item.id}`}/>
			))}
		</div>
	);
};

export default CommercialBlocksLss;