import React, {useEffect, useState} from 'react';
import {useLocation, useSearchParams} from "react-router-dom";
import axios from "axios";
import {STATIC_HOST, encryptArrayWithKey} from "../utils";
import Card from "../components/cards/Card";
import ad_image from "../asserts/ad_image_small.png";

const chunkArray = (myArray, chunkSize) => {
	const results = [];
	while (myArray.length) {
		results.push(myArray.splice(0, chunkSize));
	}
	return results;
}

const SimilarPage = () => {
	const [data, setData] = useState([])
	const [ignoreIds, setIgnoreIds] = useState([])
	const [offset, setOffset] = useState(0)
	const location = useLocation()
	let [searchParams, ] = useSearchParams();
	const objectId = searchParams.get('object')

	useEffect(() => {
		const getData = async () => {
			const response = await axios.get(`api/board/getAll?objectId=${objectId}&offset=${offset}`)
			setData(prevState => [...prevState, ...response.data.ads])
			setOffset(parseInt(response.data.blockOffset))
		}
		getData()
	}, [location.pathname, objectId])

	useEffect(() => {
		const ids = data.map(item => item.id)
		setIgnoreIds(ids)
	}, [data])

	useEffect(() => {
		console.log(encryptArrayWithKey(ignoreIds))
	}, [ignoreIds])

	const forChunkData = [...data]
	const chunkedData = chunkArray(forChunkData, 5);

	if (objectId === null) {
		return <p>Ошибка в запросе</p>
	}
	return (
		<div className='container'>
			{/* Отображаем каждую группу */}
			{chunkedData.map((chunk, index) => (
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
			{data.length === 0 && <p>Нет схожих объявлений</p>}
		</div>
	);
};

export default SimilarPage;