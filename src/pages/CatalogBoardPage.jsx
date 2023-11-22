import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
// import {} from 'react-router-dom'
import axios from "axios";
import './pages.css'
import CardService from "../components/cards/CardService";
import CategoryAccordion from "../components/categoryAccordion/categoryAccordion";
import Ad from "../components/cards/Ad";
import {fetchCategoryList} from "../redux/slices/categorySlice";

const CatalogBoardPage = () => {
    // const history = useHistory();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [objectId, setObjectId] = useState(null)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const {categoriesList} = useSelector(state => state.categories)
    useEffect(() => {
        dispatch(fetchCategoryList())
    }, [])

    useEffect(() => {
        const getObjects = async () => {
            setLoading(true)
            await axios.get(`api/categories/getObjects?subCategoryId=${objectId}`)
                .then((res) => {
                    setData(res.data)
                    setLoading(false)
                }).catch(err => {
                    console.log(err)
                    setData([])
                    setLoading(false)
                })
        }

        getObjects()

    }, [objectId])

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };


    return (
        <div className='container'>
            <Ad/>

            {/*<BreadCrumbs/>*/}
            <h1 className='catalogBoardPage-title'>Работа</h1>
            <div className="catalogBoardPage">

                <div className="catalogBoardPage_categories">
                    <CategoryAccordion category={categoriesList.items}
                                       setObjectId={setObjectId}
                                       handleCategoryClick={handleCategoryClick}
                                       selectedCategory={selectedCategory}/></div>
                <div className="catalogBoardPage_cards">
                    {loading ?
                        <p>Loading...</p> :
                        data.length === 0 ?
                            <p>Список пуст!</p> :
                            <CardService data={data}/>}
                </div>
            </div>
        </div>
    );
};

export default CatalogBoardPage;