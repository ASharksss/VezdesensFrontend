import React, {useState} from 'react';
import './myAd.css'
import '../../../categoryAccordion/categoryAccordion.css'
import ActiveAds from "./ActiveAds";
import ArchiveAd from "./ArchiveAd";
import search_icon from '../../../../asserts/icons/myads_search_icon.svg'
import arrow_icon from '../../../../asserts/icons/arrow_down.svg'

const ProfileContentAd = ({dataUser, setDataAds}) => {

	const [search, setSearch] = useState('')
	const [typeAd, setTypeAd] = useState('activeAd')
	const [open, setOpen] = useState(false)

	const dataSearch = {
		...dataUser,
		ads: dataUser.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
	}

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
							<div className="ads_filter_select">
								<div className="flex items-center space-between ads_filter-header" onClick={() => setOpen(!open)}>
									Сначала новые
									<img src={arrow_icon} alt=""/>
								</div>
								<div className={ open ? 'block ads_filter_select-body' : 'filter_select-body-none'}>
									<div className='filter_select-item' onClick={() => setOpen(!open)}>Сначала новые</div>
									<div className='filter_select-item' onClick={() => setOpen(!open)}>Сначала старые</div>
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
				typeAd === 'archiveAd' ? <ArchiveAd dataUser={dataSearch} setDataAds={setDataAds}/> :
					typeAd === 'activeAd' ? <ActiveAds dataUser={dataSearch} setDataAds={setDataAds}/> : 'нишо'
			}
		</div>
	);
};

export default ProfileContentAd;