import React, {useEffect, useState} from 'react';
import {Outlet, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Header from "./components/Header/Header";
import SmoothScroll from "./components/board/SmoothScroll";
import useClock from "./redux/hooks/useClock";
import TimerContainer from "./ui/timer/TimerContainer";
import CitiesModal from "./components/Header/CityModal/CitiesModal";
import ModalMain from "./components/modal/modalMain";
import {hideCities} from "./redux/slices/geoSlice";
import Footer from "./components/Footer/Footer";

const Layout = () => {
	const location = useLocation();

	const dispatch = useDispatch()
	const {showCitiesModal} = useSelector(state => state.geo)

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	const handleCloseModal = () => {
		dispatch(hideCities())
	}

	const {hours, minutes, day, month, seconds} = useClock()

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		if (location.pathname !== '/signin' && location.pathname !== '/signup' && location.pathname !== '/forgot-password')
			localStorage.setItem('last_path', location.pathname + location.search)
	}, [location.pathname]);

	return (
		<SmoothScroll>
			{hours !== null &&
			<div className='timer-container'>
				{windowWidth >= 1600 ? <TimerContainer date={{day, month, hours, minutes, seconds}}/> : null}
			</div>}
			<div className='container'>
				{showCitiesModal ? <ModalMain activeModal={showCitiesModal} setActiveModal={handleCloseModal}><CitiesModal /></ModalMain> : null}
				{(location.pathname !== '/signin' && location.pathname !== '/signup' && location.pathname !== '/forgot-password' && location.pathname !== '/company/register') && <Header/> }
				<Outlet/>
				{(location.pathname !== '/signin' && location.pathname !== '/signup' && location.pathname !== '/' && location.pathname !== '/createAd' && location.pathname !== '/forgot-password') && <Footer /> }
			</div>
		</SmoothScroll>
	);
};

export default Layout;
