import React from 'react';
import './breadcrumbs.css'
import {NavLink} from "react-router-dom";

const BreadCrumbs = ({crumbs, subName, name}) => {
	console.log(crumbs)
	return (
		<>
			{/* првоерка отправляли ли data.object в crumbs? */}
			{crumbs ? (
				<div className='breadcrumbs'>
					<NavLink className='breadcrumbLink' to={`/category?subCategory=${crumbs?.subCategory.id}&category=${crumbs?.subCategory.category.id}`}>
						{crumbs?.subCategory.category.name}
					</NavLink>/
					<NavLink className='breadcrumbLink' to={`/category?subCategory=${crumbs?.subCategory.id}&category=${crumbs?.subCategory.category.id}`}>
					{crumbs?.subCategory.name.indexOf('/') > 1 ? crumbs?.subCategory.name.split('/')[0] : crumbs?.subCategory.name}
					</NavLink>/
					<NavLink className='breadcrumbLink' to={`/category?object=${crumbs?.id}&subCategory=${crumbs?.subCategory.id}&category=${crumbs?.subCategory.category.id}`}>
						{crumbs?.name.indexOf('/') > 1 ? crumbs?.name.split('/')[0] : crumbs?.name}
					</NavLink>
				</div>
			) : (
				<div className='breadcrumbs fz-18'>
					{subName.indexOf('/') > 1 ?
						subName.split('/')[0]
						: subName} &nbsp;/&nbsp;  <b
					className='txt-black'>{name.indexOf('/') > 1 ? name.split('/')[0] : name}</b>
				</div>
			)}

		</>
	);
};

export default BreadCrumbs;
