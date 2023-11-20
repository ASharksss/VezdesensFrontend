import React, {useState} from 'react';
import './myAd.css'
import ActiveAds from "./ActiveAds";
import ArchiveAd from "./ArchiveAd";

const ProfileContentAd = ({dataUser}) => {

	const [search, setSearch] = useState('')
	const [typeAd, setTypeAd] = useState('activeAd')

	const dataSearch = {
		...dataUser,
		ads: dataUser.ads.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
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
				<div className="filter">
					фильтр
				</div>
				<input type="text" onChange={e => setSearch(e.target.value)} className="profile_contend-search"
							 placeholder='Поиск'/>
			</div>
			{
				typeAd === 'archiveAd' ? <ArchiveAd dataUser={dataSearch}/> :
					typeAd === 'activeAd' ? <ActiveAds dataUser={dataSearch}/> : 'нишо'
			}
		</div>
	);
};

export default ProfileContentAd;