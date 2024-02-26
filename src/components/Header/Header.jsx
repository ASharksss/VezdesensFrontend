import React, {useEffect, useState} from 'react';
import './header.css'
import logo from '../../asserts/logo.svg'
import categories from '../../asserts/icons/categories.svg'
import searchSVG from '../../asserts/icons/search.svg'
import geo from '../../asserts/icons/geo.svg'
import profile from '../../asserts/icons/profile.svg'
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import CategoryModalTemplate from "../modal/categoryModal/categoryModalTemplate";
import CategoryModal from "../modal/categoryModal/categoryModal";
import SubMenu from "./SubMenu";
import {showCities} from "../../redux/slices/geoSlice";

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const {isAuth, user} = useSelector(state => state.user)
  const {mainCity} = useSelector(state => state.geo)

  const [activeModalCat, setActiveModalCat] = useState(false)
  const [search, setSearch] = useState('')
  const [categoriesData, setCategoriesData] = useState([])
  const [openSubMenu, setOpenSubMenu] = useState(false)

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

  useEffect(() => {
    setActiveModalCat(false)
    setOpenSubMenu(false)
  }, [location.pathname, location.search])

  return (
    <div className='container mr-b'>
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
                  <button onClick={() => alert('Функция временно не доступна')}>Продать как компания</button>
                  {isAuth ?
                    <button onClick={() => navigate({pathname: `/profile/${user.items.id}`, hash: '#ads'})}><span>Мои объявления</span></button> :
                    <button onClick={() => navigate(`/signin`)}><span>Мои объявления</span></button>}
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
              <div className="header_content-geo" onClick={() => dispatch(showCities())}>
                <img src={geo} alt="гео"/>
                <span className='header_geo-name'>{mainCity}</span>
              </div>
            </div>
            <div className="flex column header_profile">
              <div className='flex'>
                <img src={profile} alt="Профиль"/>
                {isAuth ? <>
                    {/*<NavLink to={`/profile/${user.items.id}`}>*/}
                    <span className='header_profile-text' onClick={() => setOpenSubMenu(!openSubMenu)}>Профиль</span>
                    {/*   </NavLink>*/}

                  </> :
                  <NavLink to='/signin'><span className='subMenu_list-item'>Войти</span></NavLink>}
              </div>
              {
                openSubMenu ?  <SubMenu setOpenSubMenu={setOpenSubMenu}/> : ''
              }
            </div>

          </div>
        <div>
          {activeModalCat ? <CategoryModalTemplate activeModalCat={activeModalCat}
                                                   setActiveModalCat={setActiveModalCat}
                                                   children={<CategoryModal data={categoriesData}/>}/> : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
