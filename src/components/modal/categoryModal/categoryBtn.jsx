import React from 'react';
import cat_arrow from '../../../asserts/icons/cat_arrow.svg'

const CategoryBtn = ({item, setCategory}) => {
	const handleOpen = () => {
		setCategory(parseInt(item.id))
	}

	return (
		<div className='category_link' onClick={handleOpen} >
			<span className='category_link-text'>{item !== undefined ? item.name : null}</span>
			<img src={cat_arrow} alt=""/>
		</div>
	);
};

export default CategoryBtn;