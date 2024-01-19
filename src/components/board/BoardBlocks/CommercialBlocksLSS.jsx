import React from 'react';
import Card from "../../cards/Card";
import {STATIC_HOST} from "../../../utils";


const CommercialBlocksLss = ({items}) => {
	return (
		<div className='grid' style={{gridTemplateColumns: 'repeat(3, 1fr)'}}>
			{items !== undefined && items.map((item, index) => ( (item.typeAdId === 2 || item.typeAdId === 3) &&
				<Card key={`card-${index}`}
					  classname={item.typeAdId === 2 && 's' || item.typeAdId === 3 && 'l'}
					  ad_image={`${STATIC_HOST}/${item.previewImageAds[0]?.name}`}
					  title={item.title}
					  address={item.address}
					  price={item.price}
					  favorite={item.favorites}
					  date={item.date}
					  id={item.id}
				/>
			))}
		</div>
	);
};

export default CommercialBlocksLss;