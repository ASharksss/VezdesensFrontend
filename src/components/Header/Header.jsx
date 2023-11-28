import React, {useEffect, useState} from 'react';
import './header.css'
import logo from '../../asserts/logo.svg'
import categories from '../../asserts/icons/categories.svg'
import searchSVG from '../../asserts/icons/search.svg'
import geo from '../../asserts/icons/geo.svg'
import profile from '../../asserts/icons/profile.svg'
import {useSelector} from "react-redux";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import CategoryModalTemplate from "../modal/categoryModal/categoryModalTemplate";
import CategoryModal from "../modal/categoryModal/categoryModal";
import axios from "axios";

const Header = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const {isAuth, user} = useSelector(state => state.user)
	const [activeModalCat, setActiveModalCat] = useState(false)
	const [search, setSearch] = useState('')
	const [categoriesData, setCategoriesData] = useState([])

	useEffect(() => {
		const getCategories = async () => {
			const {data} = await axios.get(`api/categories/getCategoriesList`)
			setCategoriesData(data)
		}
		if (activeModalCat) {
			getCategories()
		}
	}, [activeModalCat])

	const handleSearch = () => {
	  navigate({
			pathname: '/search',
			search: `query=${search}`
		})
	}
	
	const handleExit = () => {
		let cookies = document.cookie.split(";");
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i];
			let eqPos = cookie.indexOf("=");
			let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
			document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
			document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		}
		window.location.reload()
	}

	useEffect(() => {
		setActiveModalCat(false)
	}, [location.pathname, location.search])

	return (
		<div className='container'>
			<div className={activeModalCat ? "header_wrapper z2 l_radius" : "header_wrapper header_shadow l_radius r_radius"}>
				<div className="header_logo">
					<NavLink to='/'>
						<img src={logo} alt="Vezdesens"/>
					</NavLink>
				</div>
				<div className="header_content">
					<div className="header_content-button">
						<button className='categories-btn' onClick={() => setActiveModalCat(true)}>
							<img src={categories} alt=""/>
							<span className='categories_btn-text'>Категории</span>
						</button>
					</div>
					<div className="header_content-main">
						<div className="header_content-ads">
							<button>Продать как компания</button>
							<button>Мои объявления</button>
							<NavLink to={isAuth ? '/createAd' : '/signin'} className='create_ad-btn'>Подать объявление</NavLink>
						</div>
						<div className="header_content-search">
							<input type="text" placeholder='Искать объявления' className='search-input'
										 onChange={event => setSearch(event.target.value)}/>
							<button className='search-btn' onClick={handleSearch}>
								<img src={searchSVG} alt="Поиск"/>
							</button>
						</div>
					</div>
					<div className="header_content-geo">
						<img src={geo} alt="гео"/>
						<span className='header_geo-name'>Казань</span>
					</div>
				</div>
				<div className="flex column header_profile">
					<div className='flex'>
						<img src={profile} alt="Профиль"/>
						{isAuth ? <NavLink to={`/profile/${user.items.id}`}><span>Профиль</span></NavLink> :
							<NavLink to='/signin'><span>Войти</span></NavLink>}
					</div>
					{isAuth ? <button onClick={handleExit}>Выйти</button> : null}
				</div>
			</div>
			<div>
				{activeModalCat ? <CategoryModalTemplate activeModalCat={activeModalCat} setActiveModalCat={setActiveModalCat}
															 children={<CategoryModal data={categoriesData}/>}/> : null}
			</div>
		</div>
	);
};

export default Header;