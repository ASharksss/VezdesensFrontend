import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import './pages.css'
import CategoryAccordion from "../components/categoryAccordion/categoryAccordion";
import Ad from "../components/cards/Ad";
import {fetchCategoryList} from "../redux/slices/categorySlice";
import Card from "../components/cards/Card";
import {STATIC_HOST, getStaticAd} from "../utils";
import EnterFilter from "../components/filters/enterFilter";
import ChoiceFilter from "../components/filters/choiceFilter";
import useCatalogCard from "../redux/hooks/useCatalogCard";
import PreloaderComponent from "../components/Preloader/PreloaderComponent";

const chunkArray = (myArray, chunkSize) => {
  const results = [];
  while (myArray.length) {
    results.push(myArray.splice(0, chunkSize));
  }
  return results;
}

const CatalogBoardPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const {categoriesList} = useSelector(state => state.categories)
  const [searchParams, setSearchParams] = useSearchParams()
  const paramsObjectId = parseInt(searchParams.get('object')) || null
  const paramsCategory = parseInt(searchParams.get('category')) || 1
  const paramsSubCategory = parseInt(searchParams.get('subCategory')) || 1

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [choiceFilter, setChoiceFilter] = useState([]);
  const [enterFilter, setEnterFilter] = useState([]);
  const [showAds, setShowAds] = useState(false)
  const [userChange, setUserChange] = useState(false)
  const [ignoreIds, setIgnoreIds] = useState([])
  const [offset, setOffset] = useState(0)
  const [query, setQuery] = useState(null)
  const [objectId, setObjectId] = useState(parseInt(paramsObjectId))
  const [staticAd, setStaticAd] = useState([])
  const [lastChoiceLength, setLastChoiceLength] = useState(0);
  const [lastEnterLength, setLastEnterLength] = useState(0);
  const [openChar, setOpenChar] = useState(false)

  const isLoading = categoriesList.status === 'loading'

  useEffect(() => {
    dispatch(fetchCategoryList({paramsCategory, objectId}))
  }, [paramsSubCategory, paramsCategory, objectId]) // самый первый запрос при загрузке страницы

  const {data, loading, hasMore} = useCatalogCard(offset, paramsObjectId, paramsSubCategory, paramsCategory, query)

  useEffect(() => {
    getStaticAd(1, setStaticAd)
  }, [])


  useEffect(() => {
    const lastPath = localStorage.getItem('last_path')
    setObjectId(parseInt(paramsObjectId))
    if (lastPath !== location.pathname + location.search) {
      // setData([])
      setChoiceFilter([])
      setEnterFilter([])
      setIgnoreIds([])
      localStorage.setItem('last_path', location.pathname + location.search)
    }
  }, [location.search, paramsObjectId, paramsCategory, paramsSubCategory]) //отслеживаем изменения по запросу урла, чтобы получить данные


  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const forChunkData = [...data] // временная константа, чтобы основной стейт не перезаписывать
  const chunkedData = chunkArray(forChunkData, 4);

  useEffect(() => {
    if (categoriesList.items.length > 0)
      document.title = `Поиск ${categoriesList.items[0].name}`
  }, [categoriesList])

  const handleShowAdsByParams = async () => {
    let queryValue = ''
    if (choiceFilter.length > 0) {
      choiceFilter.map(item => {
        if (item.value.length > 1) {
          queryValue += `${item.id}=[${item.value}], `
        } else {
          queryValue += `${item.id}=${item.value}, `
        }
      })
    }
    if (enterFilter.length > 0) {
      enterFilter.map(item => {
        queryValue += `${item.id}=${item.value}, `
      })
    }
    setQuery(queryValue.slice(0, -2))
    setOffset(0)
    setShowAds(false)
  }

  const pagination = useMemo(() => {
    if (!isLoading && paramsObjectId && selectedCategory.length > 0) {
      const subName = categoriesList.items[0].subCategories.filter(item => item.id === parseInt(paramsSubCategory))[0]?.name
      const name = categoriesList.items[0].subCategories.filter(item => item.id === parseInt(paramsSubCategory))[0]?.objects.filter(item => item.id === parseInt(paramsObjectId))[0]?.name
      return <h1 className='catalogBoardPage-subtitle'>
				<span className={'main'} style={{cursor: 'pointer'}} onClick={() => navigate({
          pathname: '/category',
          search: `?subCategory=${parseInt(paramsSubCategory)}&category=${parseInt(paramsCategory)}`,
        })}>{subName?.indexOf('/') > 1 ? subName.split('/')[0] : subName}</span> / <span
        className={'active'}>{name?.indexOf('/') > 1 ? name.split('/')[0] : name}</span>
      </h1>
    }
  }, [categoriesList, selectedCategory, paramsObjectId])

  useEffect(() => {
    if (choiceFilter.length > 0 || enterFilter.length > 0) {
      setShowAds(true)
      setUserChange(true)
      if (choiceFilter.length !== lastChoiceLength) {
        setLastChoiceLength(choiceFilter.length)
      }
      if (enterFilter.length !== lastEnterLength) {
        setLastEnterLength(choiceFilter.length)
      }
    }
  }, [choiceFilter, enterFilter]) // чтоб кнопка стала активной и отправить новый запрос на бэк по параметрам

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

  const handleResetSearch = () => {
    window.location.reload()
  }

  const headerName = useMemo(() => {
    if (!isLoading) {
      if (categoriesList.items[0] !== paramsCategory)
        return <h1 className='catalogBoardPage-title'>{categoriesList.items[0].name}</h1>
    }
  }, [paramsCategory, isLoading])

  if (isLoading) {
    return <PreloaderComponent/>
  }

  return (
    <div className='container'>
      {staticAd[0]?.imageName !== undefined ?
        <Ad image={`${STATIC_HOST}/promotion/${staticAd[0]?.imageName}`} href={staticAd[0]?.href}/> : null}
      {headerName}
      {pagination}
      <div className="catalogBoardPage">
        <div className="catalogBoardPage_categories">
          <CategoryAccordion category={categoriesList.items}
                             setObjectId={setObjectId}
                             paramsObjectId={paramsObjectId}
                             paramsCategory={paramsCategory}
                             paramsSubCategory={paramsSubCategory}
                             objectId={objectId}
                             setSearchParams={setSearchParams}
                             handleCategoryClick={handleCategoryClick}
                             selectedCategory={selectedCategory}/>

          {!isLoading ?
            <div className="filters">
              <div className='buttons'>
                <button className='search'
                        onClick={showAds ? handleShowAdsByParams : null} disabled={!showAds}
                >Показать</button>
                <button className='reset'
                        onClick={userChange ? handleResetSearch : null} disabled={!userChange}
                >Сбросить</button>
              </div>
              <EnterFilter setEnterFilter={setEnterFilter}/>
              {!isLoading ? categoriesList.items[1]?.map((item, index) => item.characteristic.required ?
                item.characteristic.typeCharacteristic?.name === 'enter' ?
                  <EnterFilter name={item.characteristic.name} key={`main-enterFilter-${index}=${item.name}`}
                               id={item.characteristic.id} setEnterFilter={setEnterFilter}/> : // внутри компонентов расписано
                  <ChoiceFilter name={item.characteristic.name} data={item.characteristic.characteristicValues}
                                id={item.characteristic.id}
                                key={`main-choiceFilter-${index}=${item.name}`}
                                setChoiceFilter={setChoiceFilter}/> : null
              ) : null}

              <div className='filter_title'
                   onClick={() => setOpenChar(!openChar)}
              >{openChar ? 'Скрыть характеристики' : 'Расскрыть все характеристики'}</div>

              {
                openChar ?
                  <div className='filters_dop'>
                    {!isLoading ? categoriesList.items[1]?.map((item, index) => !(item.characteristic.required) ?
                      item.characteristic.typeCharacteristic?.name === 'enter' ?
                        <EnterFilter name={item.characteristic.name} key={`enterFilter-${index}=${item.name}`}
                                     id={item.characteristic.id} setEnterFilter={setEnterFilter}/> : // внутри компонентов расписано
                        <ChoiceFilter name={item.characteristic.name} data={item.characteristic.characteristicValues}
                                      id={item.characteristic.id}
                                      key={`choiceFilter-${index}=${item.name}`}
                                      setChoiceFilter={setChoiceFilter}/> : null
                    ) : null}
                  </div> : null

              }
            </div> : null}
        </div>

        <div className="catalogBoardPage_cards" style={{minWidth: '900px'}}>
          {
            data.length === 0 ?
              <p>Список пуст!</p> :
              chunkedData.length > 0 && chunkedData.map((chunk, index) => (
                <div className='grid' key={`chunk-${index}`} style={{gridTemplateColumns: 'repeat(5, 1fr)'}}
                     ref={lastElementRef}>
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
        </div>
      </div>
    </div>
  );
};

export default CatalogBoardPage;
