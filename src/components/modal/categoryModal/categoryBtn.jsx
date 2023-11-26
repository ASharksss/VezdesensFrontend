import React from 'react';
import cat_arrow from '../../../asserts/icons/cat_arrow.svg'

const CategoryBtn = () => {
	return (
		<div className='category_link'>
			<span className='category_link-text'>Имя категории</span>
			<img src={cat_arrow} alt=""/>
		</div>
	);
};

export default CategoryBtn;