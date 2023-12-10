import React from 'react';
import {useNavigate} from "react-router-dom";
import arrow_category from '../../../asserts/icons/arrow_category.svg'
import '../modal.css'

const SubCategory = ({item, objects, category}) => {
	// item: {id: int, name: str, categoryId: int, objects: [{id: int, name: str, subCategoryId: int}]}
	// objects: [{subCategory: int, objects: [{id: int, name: str, subCategoryId: int}]}]
	// category: int
	const navigate = useNavigate()
	const handleShowCategory = (id=null, type = 'subCategory') => {
		switch (type) {
			case "subCategory":
				navigate({
					pathname: '/category',
					search: `?subCategory=${parseInt(item.id)}&category=${parseInt(category)}`,
				})
				break
			case 'object':
				navigate({
					pathname: '/category',
					search: `?object=${id}&subCategory=${parseInt(item.id)}&category=${parseInt(category)}`,
				})
				break
			case 'service':
				navigate({
					pathname: '/service',
					search: `?subCategory=${parseInt(item.id)}&category=${parseInt(category)}`,
				})
				break
			case 'serviceObject':
				navigate({
					pathname: '/service',
					search: `?object=${id}&subCategory=${parseInt(item.id)}&category=${parseInt(category)}`,
				})
				break
			default:
				break
		}
	}
	return (
		<div className='modal_subcategory flex column'>
			<div className="objects_list flex ">
				<span className='modal_subcategory-subtitle'
							style={{cursor: 'pointer'}}
							onClick={() => handleShowCategory(null, category === 3 ? 'service' : null)}>{item.name}</span>
				<img src={arrow_category} className='modal_subcategory-icon'/>
			</div>
			<div>
				{objects.map((object, index) => {
					let count = 0;
					return (
						parseInt(object.subCategory) === parseInt(item.id) &&
						object.objects.map(itemObj => {
							if (count < 5) {
								count++;
								return (
									<span
										style={{cursor: 'pointer'}}
										onClick={() => handleShowCategory(itemObj.id, category !== 3 ? 'object' : 'serviceObject')}
										className='modal_subcategory-link'
										key={`objects-${index}-${item.name}-${itemObj.id}`}
									>
										<span className='flex items-center modal_subcategory-object'>{itemObj.name}</span>
									</span>
								);
							}
							if (count > 5) {
								return
							}
							count++;
							return <span className='modal_subcategory-link' style={{cursor: 'pointer'}} key={`objects-${index}-${item.name}-${itemObj.id}`}
															onClick={() => handleShowCategory(null, category === 3 ? 'service' : null)}>
								<span style={{fontWeight: 'bold'}} key={`objects-${index}-${item.name}-${itemObj.id}`}
											className='flex items-center modal_subcategory-object'>Показать ещё</span>
							</span>
						})
					);
				})}
			</div>
		</div>
	);
};

export default SubCategory;