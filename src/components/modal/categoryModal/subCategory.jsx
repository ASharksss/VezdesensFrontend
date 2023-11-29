import React from 'react';
import {NavLink} from "react-router-dom";
import arrow_category from '../../../asserts/icons/arrow_category.svg'
const SubCategory = () => {
	return (
		<div className='modal_subcategory'>
			<h2>Мотоциклы мототехника</h2>
			<div className="objects_list flex column">
				<NavLink><span className='flex items-center'>Классические <img src={arrow_category}/></span> </NavLink>
			</div>
		</div>
	);
};

export default SubCategory;