import React, {useEffect} from 'react';
import Header from "./components/Header/Header";
import {Outlet, useLocation} from "react-router-dom";
import Footer from "./components/Footer/Footer";

const Layout = () => {
	const location = useLocation();
	useEffect(() => {
		localStorage.setItem('last_path', location.pathname)
	}, [location.pathname]);
	return (
		<div className='container'>
			<Header/>
			<Outlet/>
			<Footer/>
		</div>
	);
};

export default Layout;