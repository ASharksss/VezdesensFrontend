import React, {useEffect, useState} from 'react';
import {useSearchParams, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';
import CardService from "../components/cards/CardService";
import CategoryAccordion from "../components/categoryAccordion/categoryAccordion";
import {fetchCategoryList} from "../redux/slices/categorySlice";
import {fetchAllAds} from "../redux/slices/boardSlice";
import PhoneModal from "../components/modal/phoneModal";
import ModalMain from "../components/modal/modalMain";


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
	const [data, setData] = useState([])
	const [offset, setOffset] = useState(0)
	const [lastOffset, setLastOffset] = useState(0)
	const [objectId, setObjectId] = useState(parseInt(paramsObjectId))
	const dispatch = useDispatch()
	const {categoriesList} = useSelector(state => state.categories)

	const getData = async () => {
		const lastPath = localStorage.getItem('last_path')
		// eslint-disable-next-line no-restricted-globals
		const responseOffset = lastPath !== location.pathname + location.search ? offset : 0
		let response
		if (paramsObjectId !== null) {
		  response = await axios.get(`api/board/getAll?objectId=${paramsObjectId}&offset=${responseOffset}`)
		} else {
		  response = await axios.get(`api/board/getAll?subCategoryId=${paramsSubCategory}&offset=${responseOffset}`)
		}
		setData(prevState => [...prevState, ...response.data.ads])
		setOffset(parseInt(response.data.blockOffset))
		setLastOffset(0)
	}


	useEffect(() => {
		if (paramsCategory) {
      getData()
		}
	}, [paramsObjectId, paramsCategory, paramsSubCategory])

	const isLoading = categoriesList.status === 'loading'
	useEffect(() => {
		if (paramsCategory) {
			dispatch(fetchCategoryList({paramsCategory, objectId}))
		}
	}, [paramsObjectId, paramsCategory, paramsSubCategory])

	useEffect(() => {
		const lastPath = localStorage.getItem('last_path')
    if(paramsObjectId !== null)
		  setObjectId(parseInt(paramsObjectId))
		if (lastPath !== location.pathname + location.search) {
			setData([])
			setIgnoreIds([])
			localStorage.setItem('last_path', location.pathname + location.search)
			getData()
		} else {
			getData()
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

	useEffect(() => {
		dispatch(fetchAllAds())
	}, [])

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
          {data.length > 0 ? data.map(item => (
							<CardService type={parseInt(paramsSubCategory) === 9 ? 'vacancy' : null} item={item} setPhone={setPhone} setActiveModal={setActiveModal}/>
						)) : <p>Нет данных</p>}
        </div>
				<ModalMain activeModal={activeModal} setActiveModal={setActiveModal}
									 children={<PhoneModal phone={phone}/>}/>
      </div>
    </div>
  );
};

export default ServicePage;
