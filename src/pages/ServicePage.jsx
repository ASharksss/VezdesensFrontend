import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSearchParams, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import CardService from "../components/cards/CardService";
import CategoryAccordion from "../components/categoryAccordion/categoryAccordion";
import {fetchCategoryList} from "../redux/slices/categorySlice";
import PhoneModal from "../components/modal/phoneModal";
import ModalMain from "../components/modal/modalMain";
import useCatalogCard from "../redux/hooks/useCatalogCard";


const ServicePage = () => {
  	const location = useLocation()
	const [searchParams, setSearchParams] = useSearchParams()
	const [activeModal, setActiveModal] = useState(false)
	const [phone, setPhone] = useState('')
	const paramsObjectId = searchParams.get('object') || null
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
			dispatch(fetchCategoryList({paramsCategory, objectId}))
		}
	}, [paramsObjectId, paramsCategory, paramsSubCategory])

	const {data, loading, hasMore} = useCatalogCard(offset, paramsObjectId, paramsSubCategory, paramsCategory, null)


	useEffect(() => {
		const lastPath = localStorage.getItem('last_path')
    if(paramsObjectId !== null)
		  setObjectId(parseInt(paramsObjectId))
		if (lastPath !== location.pathname + location.search) {
			setIgnoreIds([])
			localStorage.setItem('last_path', location.pathname + location.search)
		}
	}, [location.search, paramsObjectId, paramsCategory, paramsSubCategory])

  useEffect(() => {
    if(!isLoading && categoriesList.items[0].length > 0) {
      categoriesList.items[0].subCategories.map(item => {
        if(parseInt(item.id) === parseInt(paramsSubCategory))
          setTitle(item.name)
      })
    }
  }, [isLoading])

	const handleCategoryClick = (category) => {
		setSelectedCategory(category);
	};

	const observerDiv = useRef()
	const lastElementRef = useCallback(node => {
		if (loading) return
		if (observerDiv.current) observerDiv.current.disconnect()
		observerDiv.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && hasMore) {
				if (offset !== data.length) {
					setOffset(offset + data.length)
				}
			}
		})
		if (node) observerDiv.current.observe(node)
	}, [loading, hasMore, offset])

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
          {data.length > 0 ? data.map(item => (
						<React.Fragment ref={lastElementRef}>
							<CardService type={parseInt(paramsSubCategory) === 9 ? 'vacancy' : null} item={item} setPhone={setPhone} setActiveModal={setActiveModal}/>
						</React.Fragment>
						)) : <p>Нет данных</p>}
        </div>
				<ModalMain activeModal={activeModal} setActiveModal={setActiveModal}
									 children={<PhoneModal phone={phone}/>}/>
      </div>
    </div>
  );
};

export default ServicePage;
