import React, {useEffect, useMemo, useState} from 'react';
import _ from 'lodash'
import './board.css'
import {useDispatch, useSelector} from "react-redux";
import Card from "../cards/Card";
import SmallBlocks from "./BoardBlocks/SmallBlocks";
import Ad from "../cards/Ad";
import CommercialBlocksXl from "./BoardBlocks/CommercialBlocksXL";
import ad_image_xxl from '../../asserts/ad_image_xxl.png'
import {fetchAllAds} from "../../redux/slices/boardSlice";
import {group} from "../../utils";
import {useLocation} from "react-router-dom";
import CommercialBlocksLss from "./BoardBlocks/CommercialBlocksLSS";
import UnionBoard from "./BoardBlocks/UnionBoard";

const Board = () => {
	const location = useLocation();
	const dispatch = useDispatch()
	const {ads} = useSelector(state => state.board)
	const [newDataReceived, setNewDataReceived] = useState(false);
	const [allAdsData, setAllAdsData] = useState([]);
	const [newData, setNewData] = useState([])

	useEffect(() => {
		if (location.pathname === '/') {
			dispatch(fetchAllAds({offset: ads.offset}))
		}
	}, [location.pathname])
	const loading = ads.status === 'loading'

	useEffect(() => {
		if (ads.status === 'loaded') {
			setNewDataReceived(true);
			const missingValues = ads.items.filter(value => !newData.includes(value))
			if (missingValues.length > 0) {
				setNewData([...missingValues])
			}
		}
	}, [ads.status, ads.items])

	useEffect(() => {
		if ((!loading && allAdsData.length > 0) || newDataReceived) {
			const groupData = group(newData, 5, newData.length);
			const missingValuesData = groupData.filter(groupValue => !allAdsData.some(adsData => _.isEqual(groupValue, adsData)))
			if (missingValuesData.length > 0) {
				setAllAdsData(prevState => {
					if (prevState.length === 0)
						return [...prevState, ...missingValuesData]
					const allArraysHaveFiveElements = prevState.every(array => array.length === 5);
					if (allArraysHaveFiveElements)
						return [...prevState, ...missingValuesData];
					else {
						return prevState.map(array => {
								if (array.length < 5) {
									return missingValuesData[0];
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
			<Card classname={'xxl'} ad_image={ad_image_xxl}/>
			<Ad/>
			<CommercialBlocksXl/>
			<Ad/>
			{allAdsData.length > 0 ? <UnionBoard allAdsData={allAdsData} /> : null}
		</>
	);
};

export default Board;