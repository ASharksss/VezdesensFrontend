import React, {useEffect, useState} from 'react';
import MyAd from "./myAd";
import axios from "axios";

const MyFavorite = () => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [filter, setFilter] = useState('')
	useEffect(() => {
		const getFavorite = async () => {
			setLoading(true)
			await axios.get('api/user/getFavorite')
				.then((res) => {
					setData(res.data)
					setLoading(false)
				})
				.catch(err => {
					console.log(err)
					setData([])
					setLoading(false)
				})
		}
		getFavorite()
	}, [])

	if (loading) {
		return <p>Loading...</p>
	}
	let favoriteFilterSelect, filteredFavoriteData
	if (data.length > 0) {
		favoriteFilterSelect = data.reduce((o, i) => {
			if (!o.find(v => v.ad.statusAdId == i.ad.statusAdId)) {
				o.push(i);
			}
			return o;
		}, []);
		filteredFavoriteData = data.filter(item => item.ad.statusAd.name.includes(filter))
	}
	return (
		<div>
			<select className='favorite_filter' onChange={event => setFilter(event.target.value)}>
				<option hidden>Фильтр</option>
				<option value={''}>Все</option>
				{data.length > 0 ? favoriteFilterSelect.map((item) => (
					<option value={item.ad.statusAd.name}>{item.ad.statusAd.name}</option>
				)) : null}
			</select>
			<div className="ads">
				{data.length > 0 ? filteredFavoriteData.map((item, index) => (
						<MyAd key={'active' + index} typeAd={'favoriteAd'} item={item.ad} setDataAds={setData}
									statusAd={item.ad.statusAd.name !== 'Активно' ? 'myAd_grey' : null}/>)) :
					<p>Нет данных</p>}
			</div>
		</div>
	);
};

export default MyFavorite;