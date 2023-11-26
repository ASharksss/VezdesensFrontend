import React, {useEffect, useRef} from 'react';
import {Outlet, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllAds} from "./redux/slices/boardSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SmoothScroll from "./components/board/SmoothScroll";

const Layout = () => {
	const footerRef = useRef();
	const location = useLocation();
	const {ads} = useSelector(state => state.board)
	const dispatch = useDispatch()

	useEffect(() => {
		localStorage.setItem('last_path', location.pathname + location.search)
	}, [location.pathname]);

	useEffect(() => {
		if (location.pathname === '/') {
			const observer = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) {
						dispatch(fetchAllAds({offset: ads.offset}))
					}
				},
				{threshold: 0.001}
			);
			observer.observe(footerRef.current);
			return () => {
				observer.disconnect();
			};
		}
	}, [location.pathname, ads.items]);

	return (
		<SmoothScroll>
			<div className='container'>
				<Header/>
				<Outlet/>
				<Footer footerRef={footerRef}/>
			</div>
		</SmoothScroll>
	);
};

export default Layout;