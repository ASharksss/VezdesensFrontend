import React, {useEffect, useState} from 'react';
import _ from 'lodash'
import './board.css'
import {useDispatch, useSelector} from "react-redux";
import Card from "../cards/Card";
import Ad from "../cards/Ad";
import CommercialBlocksXl from "./BoardBlocks/CommercialBlocksXL";
import ad_image_xxl from '../../asserts/ad_image_xxl.png'
import {fetchAllAds} from "../../redux/slices/boardSlice";
import {group} from "../../utils";
import {useLocation} from "react-router-dom";
import UnionBoard from "./BoardBlocks/UnionBoard";

const Board = () => {
	const location = useLocation();
	const dispatch = useDispatch()
	const {ads} = useSelector(state => state.board)
	const [newDataReceived, setNewDataReceived] = useState(false);
	const [blockData, setBlockData] = useState([]);
	const [commercialData, setCommercialData] = useState([]);
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
		if ((!loading && blockData.length > 0) || newDataReceived) {
			const {resultBlock, resultCommercial} = group(newData, 5, newData.length);
			const missingValuesBlockData = resultBlock.filter(groupValue => !blockData.some(adsData => _.isEqual(groupValue, adsData)))
			const missingValuesCommercialData = resultCommercial.filter(groupValue => !commercialData.some(adsData => _.isEqual(groupValue, adsData)))
			if (missingValuesBlockData.length > 0) {
				setBlockData(prevState => {
					if (prevState.length === 0)
						return [...prevState, ...missingValuesBlockData]
					const allArraysHaveFiveElements = prevState.every(array => array.length === 5);
					if (allArraysHaveFiveElements)
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
					const allArraysHaveFiveElements = prevState.every(array => array.length === 3);
					if (allArraysHaveFiveElements)
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
			<Card classname={'xxl'} ad_image={ad_image_xxl}/>
			<Ad/>
			<CommercialBlocksXl/>
			<Ad/>
			{(blockData.length > 0 && commercialData.length > 0) ?
				<UnionBoard blockData={blockData} commercialData={commercialData}/> : null}
		</>
	);
};

export default Board;