import React, {useCallback, useEffect, useRef, useState} from 'react';
import _ from 'lodash';
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import useLoadingCard from "../redux/hooks/useLoadingCard";
import BorderComponent from "../components/board/borderComponent";
import Card from "../components/cards/Card";
import ad_image_xxl from "../asserts/ad_image_xxl.png";
import Ad from "../components/cards/Ad";
import ad_banner from "../asserts/ad_banner.png";
import ad_banner_2 from '../asserts/adVlaga.png'
import {fetchPremium} from "../redux/slices/boardSlice";

const HomePage = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const {premium} = useSelector(state => state.board)
    const [offset, setOffset] = useState('0|0|0')
    const [allData, setAllData] = useState([])
    const [standardCount, setStandardCount] = useState(0)
    const [standardPlusCount, setStandardPlusCount] = useState(0)
    const [vipCount, setVIPCount] = useState(0)

    const {loading, data, hasMore} = useLoadingCard(offset)

    useEffect(() => {
        if (location.pathname === '/') {
            dispatch(fetchPremium())
        }
    }, [location.pathname])

    useEffect(() => {
        if (!loading && hasMore) {
            setStandardCount(prevState => prevState + data.filter(item => item.typeAdId === 1).length)
            setStandardPlusCount(prevState => prevState + data.filter(item => item.typeAdId === 2).length)
            setVIPCount(prevState => prevState + data.filter(item => item.typeAdId === 3).length)
        }
        if (!loading && data.length > 0) {
            setAllData(prevState => {
                const combinedData = [...prevState, ...data];
                const uniqueData = _.uniqWith(combinedData, _.isEqual);
                return uniqueData;
            });
        }
    }, [loading, hasMore, data])

    const observer = useRef()
    const lastElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                if (offset !== `${standardCount}|${standardPlusCount}|${vipCount}`) {
                    setOffset(`${standardCount}|${standardPlusCount}|${vipCount}`)
                }
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore, offset, standardCount, standardPlusCount, vipCount])
    return (
        <>
            {premium.items[0] !== undefined ?
                <Card classname={'xxl'}
                      ad_image={premium.items[0].previewImageAds.length > 0 ? premium.items[0].previewImageAds : ad_image_xxl}
                      title={premium.items[0].title} address={premium.items[0].address} price={premium.items[0].price}
                      favorite={premium.items[0].favorites} date={premium.items[0].date} id={premium.items[0].id}/> : null}
            <Ad image={ad_banner}/>
            {premium.items[1] !== undefined ?
                <Card classname={'xxl'}
                      ad_image={premium.items[1].previewImageAds.length > 0 ? premium.items[1].previewImageAds : ad_image_xxl}
                      title={premium.items[1].title} address={premium.items[1].address} price={premium.items[1].price}
                      favorite={premium.items[1].favorites} date={premium.items[1].date} id={premium.items[1].id}/> : null}
            <Ad image={ad_banner_2}/>
            <BorderComponent allData={allData} lastElementRef={lastElementRef} />
        </>
    );
};

export default HomePage;