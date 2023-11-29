import React, {useEffect, useState} from 'react';
import CategoryBtn from "./categoryBtn";
import {useSearchParams} from "react-router-dom";
import SubCategory from "./subCategory";

const CategoryModal = ({data}) => {
	const [searchParams,] = useSearchParams()
	const paramsCategory = parseInt(searchParams.get('category')) || 1
	const paramsSubCategory = parseInt(searchParams.get('subCategory')) || 1
	const [category, setCategory] = useState(paramsCategory)
	const [subCategory, setSubCategory] = useState(paramsSubCategory)
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
					<CategoryBtn item={item} type={'category'} setCategory={setCategory} key={`categories-${index}`}
											 active={parseInt(item.id) === category}/>
				))}
			</div>

			<div className="categoryModal_subcategory">
				<h1>Транспорт</h1>
				<SubCategory/>
			</div>
		{/*	<div className="categoryModal-categories">
				{subCategoryData.map((item, index) => (
					<CategoryBtn item={item} type={'subCategory'} setCategory={setSubCategory} key={`categories-${index}`}
											 active={parseInt(item.id) === subCategory}/>
				))}
			</div>
			<div className="categoryModal-categories">
				{objectsData.map((item, index) => (
					<CategoryBtn item={item} type={'objects'} key={`categories-${index}`} category={category}/>
				))}
			</div>*/}

		</div>
	);
};

export default CategoryModal;