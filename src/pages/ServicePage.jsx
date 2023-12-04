import React, {useEffect, useState} from 'react';
import CardService from "../components/cards/CardService";
import CategoryAccordion from "../components/categoryAccordion/categoryAccordion";
import {useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategoryList} from "../redux/slices/categorySlice";


const ServicePage = () => {

	const [searchParams, setSearchParams] = useSearchParams()
	const paramsObjectId = searchParams.get('object') || 1
	const paramsCategory = searchParams.get('category') || 1
	const paramsSubCategory = searchParams.get('subCategory') || 1
	const [selectedCategory, setSelectedCategory] = useState([]);
  const [title, setTitle] = useState('')
	const [ignoreIds, setIgnoreIds] = useState([])
	const [offset, setOffset] = useState(0)
	const [lastOffset, setLastOffset] = useState(0)
	const [objectId, setObjectId] = useState(parseInt(paramsObjectId))
	const dispatch = useDispatch()
	const {categoriesList} = useSelector(state => state.categories)

	const isLoading = categoriesList.status === 'loading'
	useEffect(() => {
		if (paramsCategory) {
			dispatch(fetchCategoryList(parseInt(paramsCategory)))
		}
	}, [paramsObjectId, paramsCategory, paramsSubCategory])

  useEffect(() => {
    if(!isLoading) {
      categoriesList.items[0].subCategories.map(item => {
        if(parseInt(item.id) === parseInt(paramsSubCategory))
          setTitle(item.name)
      })
    }
  }, [isLoading])

	const handleCategoryClick = (category) => {
		setSelectedCategory(category);
	};

  return (
    <div className='container'>
      <h1 className='catalogBoardPage-title'>{!isLoading ? title : null}</h1>
      <div className="catalogBoardPage">
        <div className="catalogBoardPage_categories">
        {!isLoading ?
              <CategoryAccordion category={categoriesList.items}
                                setObjectId={setObjectId}
                                paramsObjectId={paramsObjectId}
                                paramsCategory={paramsCategory}
                                paramsSubCategory={paramsSubCategory}
                                objectId={objectId}
                                setSearchParams={setSearchParams}
                                handleCategoryClick={handleCategoryClick}
                                selectedCategory={selectedCategory}/> : null}
                                </div>
				<div className="catalogBoardPage_cards" style={{minWidth: '900px'}}>
          {([...Array(5)]).map(() => <CardService type={parseInt(paramsSubCategory) === 9 ? 'vacancy' : null}/>)}
        </div>    
      </div>
    </div>
  );
};

export default ServicePage;