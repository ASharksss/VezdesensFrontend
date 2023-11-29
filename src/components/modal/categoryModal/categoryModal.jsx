import React, {useEffect, useMemo, useState} from 'react';
import CategoryBtn from "./categoryBtn";
import {useSearchParams} from "react-router-dom";
import SubCategory from "./subCategory";

const CategoryModal = ({data}) => {
	const [searchParams,] = useSearchParams()
	const paramsCategory = parseInt(searchParams.get('category')) || 1
	const [category, setCategory] = useState(paramsCategory)
	const [subCategoryData, setSubCategoryData] = useState([])
	const [objectsData, setObjectsData] = useState([])
	function chunkArray(arr, chunkSize) {
		return arr.reduce((resultArray, item, index) => {
			const chunkIndex = Math.floor(index / chunkSize);
			if (!resultArray[chunkIndex]) {
				resultArray[chunkIndex] = []; // начинаем новую группу
			}
			resultArray[chunkIndex].push(
				<SubCategory key={index} item={item} objects={objectsData} category={category}/>
			);
			return resultArray;
		}, []);
	}

	useEffect(() => {
		data.map((itemCat) => {
			if (itemCat.id === category) {
				setSubCategoryData(itemCat.subCategories)
				let objects = []
				itemCat.subCategories.map(itemSubCat => {
					objects.push({subCategory: itemSubCat.id, objects: itemSubCat.objects})
				})
				setObjectsData(objects)
			}
		})
	}, [data, category])
	const chunkedSubCategories = useMemo(() => {
		return chunkArray(subCategoryData, 4).map((group, index) => (
			<div key={index} className="flex categoryModal-row">
				{group}
			</div>
		));
	}, [subCategoryData]);
	return (
		<div className={'flex'}>
			<div className="categoryModal-categories">
				{data.map((item, index) => (
					<CategoryBtn item={item} setCategory={setCategory} key={`categories-${index}`}/>
				))}
			</div>

			<div className="categoryModal_subcategory">
				<h1 className='modal_subcategory-title'>{data.length > 0 ? data.find(item => item.id === category).name : null}</h1>
				{chunkedSubCategories}
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