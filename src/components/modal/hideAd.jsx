import React from 'react';
import './modal.css'

const HideAd = ({setCheck, setActive}) => {
	return (
		<div className='hide_ad flex column center items-center'>
			<h1 className='hide_ad-title'>Вы уверены,</h1>
			<span className='hide_ad-subtitle'>что хотите снять публикацю?</span>
			<div className="flex center" >
				<button className='hide_ad-btn hide_ad-yes' onClick={() => setCheck(true)}>Да</button>
				<button className='hide_ad-btn hide_ad-no' onClick={() => setActive(false)}>Нет</button>
			</div>
		</div>
	);
};

export default HideAd;