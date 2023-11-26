import React, {useEffect, useState} from 'react';
import CategoryBtn from "./categoryBtn";

const CategoryModal = ({data}) => {
	const [category, setCategory] = useState(1)
	const [subCategory, setSubCategory] = useState(1)
	const [subCategoryData, setSubCategoryData] = useState([])
	const [objectsData, setObjectsData] = useState([])
	useEffect(() => {
		data.map((itemCat) => {
			if (itemCat.id === category) {
				setSubCategoryData(itemCat.subCategories)
				itemCat.subCategories.map((itemSubCat) => {
					if (parseInt(itemSubCat.id) === subCategory)
						setObjectsData(itemSubCat.objects)
				})
			}
		})
	}, [data])
	useEffect(() => {
		setObjectsData([])
		data.map((item) => {
			if (item.id === category)
				setSubCategoryData(item.subCategories)
		})
	}, [category])
	useEffect(() => {
		subCategoryData.map((item) => {
			if (parseInt(item.id) === subCategory)
				setObjectsData(item.objects)
		})
	}, [subCategory])
	return (
		<div className={'flex'}>
			<div className="categoryModal-categories">
				{data.map((item, index) => (
					<CategoryBtn item={item} type={'category'} setCategory={setCategory} key={`categories-${index}`}/>
				))}
			</div>
			<div className="categoryModal-categories">
				{subCategoryData.map((item, index) => (
					<CategoryBtn item={item} type={'subCategory'} setCategory={setSubCategory} key={`categories-${index}`}/>
				))}
			</div>
			<div className="categoryModal-categories">
				{objectsData.map((item, index) => (
					<CategoryBtn item={item} type={'objects'} key={`categories-${index}`}/>
				))}
			</div>

		</div>
	);
};

export default CategoryModal;