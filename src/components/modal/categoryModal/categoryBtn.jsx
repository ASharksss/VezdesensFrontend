import React from 'react';
import cat_arrow from '../../../asserts/icons/cat_arrow.svg'
import {useNavigate} from "react-router-dom";

const CategoryBtn = ({item, setCategory, type='category', active=false, category}) => {
	const navigate = useNavigate()

	const handleOpen = () => {
	  switch (type) {
			case "category":
				setCategory(parseInt(item.id))
					break
			case "subCategory":
				setCategory(parseInt(item.id))
				break
			case "objects":
				navigate({
					pathname: '/category',
					search: `?object=${item.id}&subCategory=${parseInt(item.subCategoryId)}&category=${parseInt(category)}`,
				})
				break
		}
	}

	return (
		<div className='category_link' onClick={handleOpen} style={active ? {border: '1px solid orange'}: {}}>
			<span className='category_link-text'>{item !== undefined ? item.name : null}</span>
			<img src={cat_arrow} alt=""/>
		</div>
	);
};

export default CategoryBtn;