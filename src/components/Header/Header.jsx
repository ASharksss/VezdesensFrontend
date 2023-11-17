import React from 'react';
import './header.css'
import logo from '../../asserts/logo.svg'
import categories from '../../asserts/icons/categories.svg'
import search from '../../asserts/icons/search.svg'
import geo from '../../asserts/icons/geo.svg'
import profile from '../../asserts/icons/profile.svg'

const Header = () => {
	return (
		<div className='container'>
			<div className="header_wrapper">
				<div className="header_logo">
					<img src={logo} alt="Vezdesens"/>
				</div>
				<div className="header_content">
					<div className="header_content-button">
						<button className='categories-btn'>
							<img src={categories} alt=""/>
							<span className='categories_btn-text'>Категории</span>
						</button>
					</div>
					<div className="header_content-main">
						<div className="header_content-ads">
							<button>Продать как компания</button>
							<button>Мои объявления</button>
							<button className='create_ad-btn'>Подать объявление</button>
						</div>
						<div className="header_content-search">
							<input type="text" placeholder='Искать объявления' className='search-input'/>
							<button className='search-btn'>
								<img src={search} alt="Поиск"/>
							</button>
						</div>
					</div>
					<div className="header_content-geo">
						<img src={geo} alt="гео"/>
						<span className='header_geo-name'>Казань</span>
					</div>
				</div>
				<div className="header_profile">
					<img src={profile} alt="Профиль"/>
					<span>Профиль</span>
				</div>
			</div>
		</div>
	);
};

export default Header;