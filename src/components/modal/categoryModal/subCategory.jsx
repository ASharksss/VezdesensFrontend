import React from 'react';
import {NavLink} from "react-router-dom";
import arrow_category from '../../../asserts/icons/arrow_category.svg'
import '../modal.css'
const SubCategory = () => {
	return (
		<div className='modal_subcategory flex column'>
			<div className="objects_list flex ">
				<span className='modal_subcategory-subtitle'>Мотоциклы мототехника</span>
				<img src={arrow_category} className='modal_subcategory-icon'/>
			</div>
			<div >
				<NavLink to='/category' className='modal_subcategory-link'>
					<span className='flex items-center modal_subcategory-object'>Классические </span></NavLink>
				<NavLink to='/category' className='modal_subcategory-link'>
					<span className='flex items-center modal_subcategory-object'>Классические </span></NavLink>
				<NavLink to='/category' className='modal_subcategory-link'>
					<span className='flex items-center modal_subcategory-object'>Классические </span></NavLink>
				<NavLink to='/category' className='modal_subcategory-link'>
					<span className='flex items-center modal_subcategory-object'>Классические </span></NavLink>
				<NavLink to='/category' className='modal_subcategory-link'>
					<span className='flex items-center modal_subcategory-object'>Классические </span></NavLink>
				<NavLink to='/category' className='modal_subcategory-link'>
					<span className='flex items-center modal_subcategory-object'>Классические </span></NavLink>
			</div>
		</div>
	);
};

export default SubCategory;