import React, {useEffect} from 'react';
import {Outlet, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Header from "./components/Header/Header";
import SmoothScroll from "./components/board/SmoothScroll";
import useClock from "./redux/hooks/useClock";
import TimerContainer from "./ui/timer/TimerContainer";
import CitiesModal from "./components/Header/CityModal/CitiesModal";
import ModalMain from "./components/modal/modalMain";
import {hideCities} from "./redux/slices/geoSlice";

const Layout = () => {
	const location = useLocation();

	const dispatch = useDispatch()
	const {showCitiesModal} = useSelector(state => state.geo)

	const handleCloseModal = () => {
		dispatch(hideCities())
	}

	const {hours, minutes, day, month} = useClock()

	useEffect(() => {
		if (location.pathname !== '/signin' && location.pathname !== '/signup')
			localStorage.setItem('last_path', location.pathname + location.search)
	}, [location.pathname]);

	return (
		<SmoothScroll>
			{hours !== null &&
			<div className='timer-container'>
				<TimerContainer date={{day, month, hours, minutes}}/>
			</div>}
			<div className='container'>
				{showCitiesModal ? <ModalMain activeModal={showCitiesModal} setActiveModal={handleCloseModal}><CitiesModal /></ModalMain> : null}
				{(location.pathname !== '/signin' && location.pathname !== '/signup') && <Header/> }
				<Outlet/>
			</div>
		</SmoothScroll>
	);
};

export default Layout;
