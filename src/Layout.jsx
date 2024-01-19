import React, {useEffect} from 'react';
import {Outlet, useLocation} from "react-router-dom";
import Header from "./components/Header/Header";
import SmoothScroll from "./components/board/SmoothScroll";

const Layout = () => {
	const location = useLocation();

	useEffect(() => {
		if (location.pathname !== '/signin' && location.pathname !== '/signup')
			localStorage.setItem('last_path', location.pathname + location.search)
	}, [location.pathname]);

	return (
		<SmoothScroll>
			<div className='container'>
				{(location.pathname !== '/signin' && location.pathname !== '/signup') && <Header/> }
				<Outlet/>
			</div>
		</SmoothScroll>
	);
};

export default Layout;