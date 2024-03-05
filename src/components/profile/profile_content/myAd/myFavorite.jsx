import React, {useEffect, useState} from 'react';
import MyAd from "./myAd";
import axios from "axios";
import arrow_icon from '../../../../asserts/icons/arrow_down.svg'
import NothingYeat from '../../../nothingYeat/nothingYeat';


const MyFavorite = () => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [filter, setFilter] = useState('')
	const [open, setOpen] = useState(false)


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
			{/* <select className='favorite_filter' onChange={event => setFilter(event.target.value)}>
				<option hidden>Фильтр</option>
				<option value={''}>Все</option>
				{data.length > 0 ? favoriteFilterSelect.map((item) => (
					<option value={item.ad.statusAd.name}>{item.ad.statusAd.name}</option>
				)) : null}
			</select> */}

			<div className="favorite_filter">
							<div className="ads_filter_select" >
								<div className="flex items-center space-between ads_filter-header" onClick={() => setOpen(!open)}>
									{filter != '' ? filter : 'Фильтр' }
									<img src={arrow_icon} alt=""/>
								</div>
								<div className={ open ? 'block ads_filter_select-body' : 'filter_select-body-none'}>
								<div className='filter_select-item' value={''} onClick={() => {
										setFilter('')
										setOpen(!open)
									}}>Все</div>
								{data.length > 0 ? favoriteFilterSelect.map((item) => (
									<div className='filter_select-item' value={item.ad.statusAd.name} onClick={() => {
										setFilter(item.ad.statusAd.name)
										setOpen(!open)
									}}>{item.ad.statusAd.name}</div>
								)) : null}
								</div>
							</div>
				</div>


			<div className="ads">
				{data.length > 0 ? filteredFavoriteData.map((item, index) => (
						<MyAd key={'active' + index} typeAd={'favoriteAd'} item={item.ad} setDataAds={setData}
									statusAd={item.ad.statusAd.name !== 'Активно' ? 'myAd_grey' : null}/>)) :
					<NothingYeat message={"Вы ничего не добавили"}/>}
			</div>
		</div>
	);
};

export default MyFavorite;
