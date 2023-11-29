import React, {useEffect, useState} from 'react';
import _ from 'lodash'
import './board.css'
import {useDispatch, useSelector} from "react-redux";
import Card from "../cards/Card";
import Ad from "../cards/Ad";
import ad_image_xxl from '../../asserts/ad_image_xxl.png'
import {fetchAllAds, fetchPremium} from "../../redux/slices/boardSlice";
import {group} from "../../utils";
import {useLocation} from "react-router-dom";
import UnionBoard from "./BoardBlocks/UnionBoard";

const Board = () => {
	const location = useLocation();
	const dispatch = useDispatch()
	const {ads, premium} = useSelector(state => state.board)
	const [newDataReceived, setNewDataReceived] = useState(false);
	const [blockData, setBlockData] = useState([]);
	const [commercialData, setCommercialData] = useState([]);
	const [newData, setNewData] = useState([])

	useEffect(() => {
		if (location.pathname === '/') {
			dispatch(fetchAllAds({offset: ads.offset}))
			dispatch(fetchPremium())
		}
	}, [location.pathname])
	const loading = ads.status === 'loading'

	useEffect(() => {
		if (ads.status === 'loaded') {
			setNewDataReceived(true);
			setNewData(ads.items)
		}
	}, [ads.status, ads.items])

	useEffect(() => {
		if ((!loading && blockData.length > 0) || newDataReceived) {
			const {resultBlock, resultCommercial} = group(newData, 5, newData.length);
			const missingValuesBlockData = resultBlock.filter(groupValue => !blockData.some(adsData => _.isEqual(groupValue, adsData)))
			const missingValuesCommercialData = resultCommercial.filter(groupValue => !commercialData.some(adsData => _.isEqual(groupValue, adsData)))
			if (missingValuesBlockData.length > 0) {
				setBlockData(prevState => {
					if (prevState.length === 0)
						return [...prevState, ...missingValuesBlockData]
					const allArraysHaveElements = prevState.every(array => array.length === 5);
					if (allArraysHaveElements)
						return [...prevState, ...missingValuesBlockData];
					else {
						return prevState.map(array => {
							if (array.length < 5) {
								return missingValuesBlockData[0];
							} else {
								return array;
							}
						})
					}
				})
			}
			if (missingValuesCommercialData.length > 0) {
				setCommercialData(prevState => {
					if (prevState.length === 0)
						return [...prevState, ...missingValuesCommercialData]
					const allArraysHaveElements = prevState.every(array => array.length === 3);
					if (allArraysHaveElements)
						return [...prevState, ...missingValuesCommercialData];
					else {
						return prevState.map(array => {
							if (array.length < 3) {
								return missingValuesCommercialData[0];
							} else {
								return array;
							}
						})
					}
				})
			}
		}
	}, [newData, loading, newDataReceived]);
	return (
		<>
			{premium.items[0] !== undefined ?
				<Card classname={'xxl'}
							ad_image={premium.items[0].imageAds.length > 0 ? premium.items[0].imageAds : ad_image_xxl}
							title={premium.items[0].title} address={premium.items[0].address} price={premium.items[0].price}
							favorite={premium.items[0].favorites} date={premium.items[0].date} id={premium.items[0].id}/> : null}
			<Ad/>
			{premium.items[1] !== undefined ?
				<Card classname={'xxl'}
							ad_image={premium.items[1].imageAds.length > 0 ? premium.items[1].imageAds : ad_image_xxl}
							title={premium.items[1].title} address={premium.items[1].address} price={premium.items[1].price}
							favorite={premium.items[1].favorites} date={premium.items[1].date} id={premium.items[1].id}/> : null}
			<Ad/>
			{(blockData.length > 0 || commercialData.length > 0) ?
				<UnionBoard blockData={blockData} commercialData={commercialData}/> : null}
			{loading ? <p>Загрузка...</p> : null}
		</>
	);
};

export default Board;