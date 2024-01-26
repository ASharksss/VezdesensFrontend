import React, {useEffect, useState, useRef, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import './pages.css'
import CategoryAccordion from "../components/categoryAccordion/categoryAccordion";
import Ad from "../components/cards/Ad";
import {fetchCategoryList} from "../redux/slices/categorySlice";
import {useNavigate, useSearchParams} from "react-router-dom";
import Card from "../components/cards/Card";
import {STATIC_HOST, encryptArrayWithKey, getStaticAd} from "../utils";
import EnterFilter from "../components/filters/enterFilter";
import ChoiceFilter from "../components/filters/choiceFilter";

const chunkArray = (myArray, chunkSize) => {
	const results = [];
	while (myArray.length) {
		results.push(myArray.splice(0, chunkSize));
	}
	return results;
}

const CatalogBoardPage = () => {
	const triggerDivRef = useRef()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const {categoriesList} = useSelector(state => state.categories)
	const [searchParams, setSearchParams] = useSearchParams()
	const paramsObjectId = parseInt(searchParams.get('object')) || null
	const paramsCategory = parseInt(searchParams.get('category')) || 1
	const paramsSubCategory = parseInt(searchParams.get('subCategory')) || 1

	const [selectedCategory, setSelectedCategory] = useState([]);
	const [choiceFilter, setChoiceFilter] = useState([]);
	const [enterFilter, setEnterFilter] = useState([]);
	const [showAds, setShowAds] = useState(false)
	const [ignoreIds, setIgnoreIds] = useState([])
	const [offset, setOffset] = useState(0)
	const [lastOffset, setLastOffset] = useState(0)
	const [objectId, setObjectId] = useState(parseInt(paramsObjectId))
	const [data, setData] = useState([])
	const [staticAd, setStaticAd] = useState([])

	const isLoading = categoriesList.status === 'loading'

	useEffect(() => {
		if (paramsCategory) {
			dispatch(fetchCategoryList({paramsCategory, objectId}))
		}
	}, [paramsObjectId, paramsCategory, paramsSubCategory]) // самый первый запрос при загрузке страницы


	useEffect(() => {
		getStaticAd(1, setStaticAd)
	}, [])

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
		const lastPath = localStorage.getItem('last_path')
		setObjectId(parseInt(paramsObjectId))
		// eslint-disable-next-line no-restricted-globals
		if (lastPath !== location.pathname + location.search) {
			setData([])
			setChoiceFilter([])
			setEnterFilter([])
			setIgnoreIds([])
			// eslint-disable-next-line no-restricted-globals
			localStorage.setItem('last_path', location.pathname + location.search)
			getData()
		} else {
			getData()
		}
		// eslint-disable-next-line no-restricted-globals
	}, [location.search, paramsObjectId, paramsCategory, paramsSubCategory]) //отслеживаем изменения по запросу урла, чтобы получить данные

	useEffect(() => { //если пришли новые данные, записываем их id для уникальности
		const ids = data.map(item => item.id)
		setIgnoreIds(ids)
	}, [data])

	const handleCategoryClick = (category) => {
		setSelectedCategory(category);
	};

	const forChunkData = [...data] // временная константа, чтобы основной стейт не перезаписывать
	const chunkedData = chunkArray(forChunkData, 4); // получаем сгруппированные данные по 4 штуки в ряд

	const handleObserver = async (vision=false) => { // функция чтобы при прокрутке получить новые данные
		if (vision && offset !== lastOffset) {
			const keyHash = encryptArrayWithKey(ignoreIds)
			const {data} = await axios.get(`api/board/getAll?objectId=${paramsObjectId}&offset=${offset}&key=${keyHash}`)
			setData(prevState => [...prevState, ...data.ads]) // добавляем нашей data, то что пришло из сервера
			setOffset(parseInt(data.blockOffset)) // записываем последний оффсет, чтобы в дальнейшем приходило ещё больше данных
			setLastOffset(parseInt(data.blockOffset)) // локальный оффсет, чтобы бесконечно не зацикливать
		}
	}
	const observer = new IntersectionObserver( // отслеживания прокрутки
		async ([entry]) => {
			if (entry.isIntersecting) { // если достигли дивки, вызвать функцию
				await handleObserver(entry.isIntersecting)
			}
		}, {threshold: 0.001})

	useEffect(() => {
		observer.observe(triggerDivRef.current); // триггер прокрутки на нижней дивке, чтобы вызывать функцию
		return () => {
			observer.disconnect();
		};
	}, [data]);

	useEffect(() => {
		if (categoriesList.items.length > 0)
			document.title = `Поиск ${categoriesList.items[0].name}`
	}, [categoriesList])

	const handleShowAdsByParams = async() => { // Показать объявления по параметрам
		setIgnoreIds([])
		const array = []
		array.push(choiceFilter)
		array.push(enterFilter)
		const queryHash = encryptArrayWithKey(array)
		const {data} = await axios.get(`api/board/getAll?query=${queryHash}`)
		setData(data.ads)
		setOffset(parseInt(data.blockOffset))
		setLastOffset(0)
		setShowAds(false)
	}

	const pagination = useMemo(() => {
		if (!isLoading && selectedCategory.length > 0) {
			const subName = categoriesList.items[0].subCategories.filter(item => item.id === parseInt(paramsSubCategory))[0].name
			const name = categoriesList.items[0].subCategories.filter(item => item.id === parseInt(paramsSubCategory))[0].objects.filter(item => item.id === parseInt(paramsObjectId))[0]?.name
			return <h1 className='catalogBoardPage-subtitle'>
				<span className={'main'} style={{cursor: 'pointer'}} onClick={() => navigate({
					pathname: '/category',
					search: `?subCategory=${parseInt(paramsSubCategory)}&category=${parseInt(paramsCategory)}`,
				})}>{subName.indexOf('/') > 1 ? subName.split('/')[0] : subName}</span> / <span className={'active'}>{name}</span>
			</h1>
		}
	}, [categoriesList, selectedCategory])

	useEffect(() => {
		if(choiceFilter.length > 0 || enterFilter.length > 0) {
			setIgnoreIds([])
			setShowAds(true)
		}
	}, [choiceFilter, enterFilter]) // чтоб кнопка стала активной и отправить новый запрос на бэк по параметрам

	return (
		<div className='container'>
			<Ad image={`${STATIC_HOST}/promotion/${staticAd[0]?.imageName}`} href={staticAd[0]?.href}/>

			{/*<BreadCrumbs/>*/}
			<h1 className='catalogBoardPage-title'>{!isLoading ? categoriesList.items[0].name : null}</h1>
			{pagination}
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

					<div className="filters">
						<EnterFilter setEnterFilter={setEnterFilter}/>
						{!isLoading ? categoriesList.items[1].map((item, index) =>
						item.typeCharacteristic === 'enter' ?
						<EnterFilter name={item.name} key={`enterFilter-${index}=${item.name}`}
							id={item.id} setEnterFilter={setEnterFilter}/>: // внутри компонентов расписано
						<ChoiceFilter name={item.characteristic.name} data={item.characteristic.characteristicValues} id={item.id}
							key={`choiceFilter-${index}=${item.name}`} setChoiceFilter={setChoiceFilter}/>) : null}
					</div>
					<button style={showAds ? {marginTop: '20px', border: '1px solid orange'} : {marginTop: '20px'}} // тут временно сделал, можешь удалять стили
					onClick={showAds ? handleShowAdsByParams : null} disabled={!showAds}
					>Показать</button>
				</div>

				<div className="catalogBoardPage_cards" style={{minWidth: '900px'}}>
					{
						data.length === 0 ?
							<p>Список пуст!</p> :
							chunkedData.length > 0 && chunkedData.map((chunk, index) => (
								<div className='flex small_ads align-items' key={`chunk-${index}`}>
									{chunk.map((item, itemIndex) => (
										<Card
											classname={'xs'}
											ad_image={`${STATIC_HOST}/${item.previewImageAds[0]?.name}`}
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
