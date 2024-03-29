import React, {useState, useEffect} from 'react';
import {useSearchParams} from "react-router-dom";
import axios from "axios";
import Card from "../components/cards/Card";
import {STATIC_HOST} from "../utils";
import ad_image from "../asserts/ad_image_small.png";

const chunkArray = (myArray, chunkSize) => {
	const results = [];
	while (myArray.length) {
		results.push(myArray.splice(0, chunkSize));
	}
	return results;
}

const SearchPage = () => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [searchParams, setSearchParams] = useSearchParams()
	const query = searchParams.get('query')

	const handleSearch = async () => {
		setLoading(true)
		const {data} = await axios(`api/ad/search?query=${query}`)
		setData(data)
	}

	useEffect(() => {
		handleSearch().then(() => setLoading(false))
	}, [query])

	if (loading) {
		return <p>Loading...</p>
	}

	const forChunkData = [...data]
	const chunkedData = chunkArray(forChunkData, 5);
	return (
		<div className='container'>
			{chunkedData.length > 0 && chunkedData.map((chunk, index) => (
				<div className='flex align-items' key={`chunk-${index}`}>
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

export default SearchPage;