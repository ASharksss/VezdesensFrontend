import React, {useEffect, useState, useRef, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import './pages.css'
import CategoryAccordion from "../components/categoryAccordion/categoryAccordion";
import Ad from "../components/cards/Ad";
import {fetchCategoryList} from "../redux/slices/categorySlice";
import {useSearchParams} from "react-router-dom";
import Card from "../components/cards/Card";
import {STATIC_HOST, encryptArrayWithKey} from "../utils";
import ad_image from "../asserts/ad_image_small.png";

const chunkArray = (myArray, chunkSize) => {
	const results = [];
	while (myArray.length) {
		results.push(myArray.splice(0, chunkSize));
	}
	return results;
}

const CatalogBoardPage = () => {
	const triggerDivRef = useRef()
	// const history = useHistory();
	const [searchParams, setSearchParams] = useSearchParams()
	const paramsObjectId = searchParams.get('object') || 1
	const paramsCategory = searchParams.get('category') || 1
	const paramsSubCategory = searchParams.get('subCategory') || 1
	const [selectedCategory, setSelectedCategory] = useState([]);
	const [ignoreIds, setIgnoreIds] = useState([])
	const [offset, setOffset] = useState(0)
	const [lastOffset, setLastOffset] = useState(0)
	const [objectId, setObjectId] = useState(parseInt(paramsObjectId))
	const [data, setData] = useState([])
	const dispatch = useDispatch()
	const {categoriesList} = useSelector(state => state.categories)

	const isLoading = categoriesList.status === 'loading'
	useEffect(() => {
		if (paramsCategory) {
			dispatch(fetchCategoryList(parseInt(paramsCategory)))
		}
	}, [paramsObjectId, paramsCategory, paramsSubCategory])

	const getData = async () => {
		const lastPath = localStorage.getItem('last_path')
		// eslint-disable-next-line no-restricted-globals
		const responseOffset = lastPath !== location.pathname + location.search ? offset : 0
		const response = await axios.get(`api/board/getAll?objectId=${paramsObjectId}&offset=${responseOffset}`)
		setData(prevState => [...prevState, ...response.data.ads])
		setOffset(parseInt(response.data.blockOffset))
		setLastOffset(0)
	}

	useEffect(() => {
		const lastPath = localStorage.getItem('last_path')
		setObjectId(parseInt(paramsObjectId))
		// eslint-disable-next-line no-restricted-globals
		if (lastPath !== location.pathname + location.search) {
			setData([])
			setIgnoreIds([])
			// eslint-disable-next-line no-restricted-globals
			localStorage.setItem('last_path', location.pathname + location.search)
			getData()
		} else {
			getData()
		}
		// eslint-disable-next-line no-restricted-globals
	}, [location.search, paramsObjectId, paramsCategory, paramsSubCategory])

	useEffect(() => {
		const ids = data.map(item => item.id)
		setIgnoreIds(ids)
	}, [data])

	const handleCategoryClick = (category) => {
		setSelectedCategory(category);
	};

	const forChunkData = [...data]
	const chunkedData = chunkArray(forChunkData, 4);

	const handleObserver = async (vision=false) => {
		if (vision && offset !== lastOffset) {
			const keyHash = encryptArrayWithKey(ignoreIds)
			const {data} = await axios.get(`api/board/getAll?objectId=${paramsObjectId}&offset=${offset}&key=${keyHash}`)
			setData(prevState => [...prevState, ...data.ads])
			setOffset(parseInt(data.blockOffset))
			setLastOffset(parseInt(data.blockOffset))
		}
	}
	const observer = new IntersectionObserver(
		async ([entry]) => {
			if (entry.isIntersecting) {
				await handleObserver(entry.isIntersecting)
			}
		}, {threshold: 0.001})

	useEffect(() => {
		observer.observe(triggerDivRef.current);
		return () => {
			observer.disconnect();
		};
	}, [data]);

	return (
		<div className='container'>
			<Ad/>

			{/*<BreadCrumbs/>*/}
			<h1 className='catalogBoardPage-title'>{!isLoading ? categoriesList.items[0].name : null}</h1>
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
					{
						data.length === 0 ?
							<p>Список пуст!</p> :
							chunkedData.map((chunk, index) => (
								<div className='flex small_ads align-items' key={`chunk-${index}`}>
									{chunk.map((item, itemIndex) => (
										<Card
											classname={'xs'}
											ad_image={item.imageAds.length > 0 ? `${STATIC_HOST}/${item.imageAds[0].name}` : ad_image}
											title={item.title}
											address={item.address}
											price={item.price}
											favorite={item.favorites}
											date={item.date}
											id={item.id}
											key={`card-${index}-${item.id}-${itemIndex}`}
										/>
									))}
								</div>
							))}
					<div ref={triggerDivRef}></div>
				</div>
			</div>
		</div>
	);
};

export default CatalogBoardPage;