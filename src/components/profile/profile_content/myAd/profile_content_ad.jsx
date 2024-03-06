import React, {useEffect, useRef, useState} from 'react';
import './myAd.css'
import '../../../categoryAccordion/categoryAccordion.css'
import ActiveAds from "./ActiveAds";
import ArchiveAd from "./ArchiveAd";
import search_icon from '../../../../asserts/icons/myads_search_icon.svg'
import arrow_icon from '../../../../asserts/icons/arrow_down.svg'

const ProfileContentAd = ({dataUser, setDataAds}) => {

	const choiceRef = useRef(null)
	const [statusActive, setStatusActive] = useState(false);
	const [statusArchive, setStatusArchive] = useState(false);
	const [search, setSearch] = useState('')
	const [typeAd, setTypeAd] = useState('activeAd')
	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState([...dataUser])
	const [choice, setChoice] = useState('old')
	const [choiceTitle, setChoiceTitle] = useState('Сначала старые')

	let dataSearch = {
		...data,
		ads: data.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
	}

	const handleClickOutside = (event) => {
		if (choiceRef.current && !choiceRef.current.contains(event.target))
			setOpen(false)
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	useEffect(() => {
		if (choice === 'new') {
			setLoading(true)
			setData(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
		} else if (choice === 'old') {
			setLoading(true)
			setData(data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)))
		} else if (choice === 'views_down') {
			setLoading(true)
			setData(data.sort((a, b) => new Date(a.views) - new Date(b.views)))
		} else if (choice === 'views_up') {
			setLoading(true)
			setData(data.sort((a, b) => new Date(b.views) - new Date(a.views)))
		}
	}, [choice])

	const checkStatus = () => {
		for (let i = 0; i < dataSearch.ads.length; i++) {
		  if (dataSearch.ads[i].statusAdId === 2) {
			setStatusActive(true);
		  }
		  if (dataSearch.ads[i].statusAdId === 4 || dataSearch.ads[i].statusAdId === 3 ) {
			setStatusArchive(true);
		  }
		}
	  };
	useEffect(() => {
		checkStatus();
	});

	useEffect(() => {
		if (loading)
			setLoading(false)
	}, [loading])

	

	return (
		<div className='profile_content_ad'>
			<div className="flex space-between items-center">
				<div className="profile_content-link">
					<button style={typeAd === 'activeAd' ? {
						borderBottom: '4px solid black',
						paddingRight: '15px',
						width: '100px',
						height: '40px'
					} : {borderBottom: '2px solid #0000002e', paddingRight: '15px', width: '100px', height: '40px'}}
									onClick={() => setTypeAd('activeAd')}>Активные
					</button>
					<button style={typeAd === 'archiveAd' ? {
						borderBottom: '4px solid black',
						paddingLeft: '15px',
						width: '100px',
						height: '40px'
					} : {borderBottom: '2px solid #0000002e', paddingLeft: '15px', width: '100px', height: '40px'}}
									onClick={() => setTypeAd('archiveAd')}>Архив
					</button>
				</div>
				<div className='flex'>
					<div className="content_ads_filter">
						<div className="filter">
							<div className="ads_filter_select" ref={choiceRef}>
								<div className="flex items-center space-between ads_filter-header" onClick={() => setOpen(!open)}>
									{choiceTitle}
									<img src={arrow_icon} alt=""/>
								</div>
								<div className={ open ? 'block ads_filter_select-body' : 'filter_select-body-none'}>
									<div className='filter_select-item' onClick={() => {
										setChoice('old')
										setChoiceTitle('Сначала старые')
										setOpen(!open)
									}}>Сначала старые</div>
									<div className='filter_select-item' onClick={() => {
										setChoice('new')
										setChoiceTitle('Сначала новые')
										setOpen(!open)
									}}>Сначала новые</div>
									<div className='filter_select-item' onClick={() => {
										setChoice('views_down')
										setChoiceTitle('По просмотрам ↑')
										setOpen(!open)
									}}>По просмотрам ↑</div>
									<div className='filter_select-item' onClick={() => {
										setChoice('views_up')
										setChoiceTitle('По просмотрам ↓')
										setOpen(!open)
									}}>По просмотрам ↓</div>
								</div>
							</div>
						</div>
					</div>
					<div className="profile_contend-search">
						<input type="text" onChange={e => setSearch(e.target.value)}
									 style={{width: '150px'}}
									 placeholder='Поиск'/>
						<img src={search_icon} alt="" className='block'/>
					</div>
				</div>


			</div>
			{
				typeAd === 'archiveAd' ? <ArchiveAd dataUser={dataSearch} setDataAds={setDataAds} loading={loading} status={statusArchive}/> :
					typeAd === 'activeAd' ? <ActiveAds dataUser={dataSearch} setDataAds={setDataAds} loading={loading} status={statusActive}/> : 'нишо'
			}
		</div>
	);
};

export default ProfileContentAd;