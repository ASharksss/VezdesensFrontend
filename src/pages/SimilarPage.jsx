import React, {useEffect, useState} from 'react';
import {useLocation, useSearchParams} from "react-router-dom";
import axios from "axios";
import {STATIC_HOST, encryptArrayWithKey, getStaticAd} from "../utils";
import Card from "../components/cards/Card";
import ad_image from "../asserts/ad_image_small.png";
import Ad from '../components/cards/Ad';

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
	const [staticAd, setStaticAd] = useState([])


	const getData = async () => {
		const lastPath = localStorage.getItem('last_path')
		const responseOffset = lastPath !== location.pathname + location.search ? offset : 0
		const response = await axios.get(`api/board/getAll?objectId=${objectId}&offset=${responseOffset}`)
		setData(prevState => [...prevState, ...response.data.ads])
		setOffset(parseInt(response.data.blockOffset))
	}

	useEffect(() => {
		const lastPath = localStorage.getItem('last_path')
		if (lastPath !== location.pathname + location.search) {
			setData([])
			setIgnoreIds([])
			localStorage.setItem('last_path', location.pathname + location.search)
			getData()
		} else {
			getData()
		}
	}, [location.search, objectId])

	useEffect(() => {
		const ids = data.map(item => item.id)
		setIgnoreIds(ids)
	}, [data])
	useEffect(() => {
		getStaticAd(1, setStaticAd)
	  }, [])

	// useEffect(() => {
	// 	console.log(encryptArrayWithKey(ignoreIds))
	// }, [ignoreIds])

	const forChunkData = [...data]
	const chunkedData = chunkArray(forChunkData, 5);

	if (objectId === null) {
		return <p>Ошибка в запросе</p>
	}
	return (
		
		<div className="container">
            <Ad image={`${STATIC_HOST}/promotion/${staticAd[0]?.imageName}`} href={staticAd[0]?.href}/>
			{chunkedData.length > 0 && chunkedData.map((chunk, index) => (
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
			{data.length === 0 && <p>Нет схожих объявлений</p>}
		</div>
	);
};

export default SimilarPage;