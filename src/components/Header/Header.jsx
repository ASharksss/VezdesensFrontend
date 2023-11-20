import React, {useState, useEffect, useRef} from 'react';
import './header.css'
import logo from '../../asserts/logo.svg'
import categories from '../../asserts/icons/categories.svg'
import search from '../../asserts/icons/search.svg'
import geo from '../../asserts/icons/geo.svg'
import profile from '../../asserts/icons/profile.svg'
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import CategoryModal from "../categoryModal/CategoryModal";

const Header = () => {

    const [showCategory, setShowCategory] = useState(false)
    const {isAuth, user} = useSelector(state => state.user)

    const modalRef = useRef();

    useEffect(() => {
        // Добавьте слушатель события mousedown при монтировании компонента
        document.addEventListener('mousedown', handleOutsideClick);

        // Уберите слушатель события mousedown при размонтировании компонента
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleOutsideClick = (e) => {
        // Проверьте, был ли клик выполнен вне модального окна
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setShowCategory(false);
        }
    };


    return (
        <div className='container'>
            <div className="header_wrapper">
                <div className="header_logo">
                    <NavLink to='/'>
                        <img src={logo} alt="Vezdesens"/>
                    </NavLink>
                </div>
                <div className="header_content">
                    <div className="header_content-button">
                        <button className='categories-btn' onClick={() => setShowCategory(true)}>
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
                    {isAuth ? <NavLink to={`/profile/${user.items.id}`}><span>Профиль</span></NavLink> :
                        <NavLink to='/signin'><span>Войти</span></NavLink>}
                </div>
            </div>
            <div className='category-modal open' ref={modalRef}>
                {showCategory && <CategoryModal setShowCategory={setShowCategory}/>}
            </div>
        </div>
    );
};

export default Header;