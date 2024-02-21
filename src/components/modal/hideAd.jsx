import React from 'react';
import './modal.css'

const HideAd = ({setCheck, setActive}) => {
	return (
		<>
		<div className='position-absolute-tp'>
		<button className='close-btn' onClick={() => setActive(false)}>&nbsp;</button>
		</div>
		<div className='flex column center items-center'>
			<h1 className='hide_title'>Вы уверены,</h1>
			<span className='hide_subtitle'>что хотите снять публикацю?</span>
			<div className="flex center" >
				<button className='hide_btn hide_ad-yes' onClick={() => setCheck(true)}>Да</button>
				<button className='hide_btn hide_ad-no' onClick={() => setActive(false)}>Нет</button>
			</div>
		</div>
		</>
	);
};

export default HideAd;