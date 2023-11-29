import React, {useEffect, useRef, useState} from 'react';
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
	const [lastOffset, setLastOffset] = useState('0|0|0')

	useEffect(() => {
		localStorage.setItem('last_path', location.pathname + location.search)
	}, [location.pathname]);
	const loading = ads.status === 'loading'

	const handleObserver = async (vision=false) => {
		if (location.pathname === '/') {
			if ((vision && ads.offset !== lastOffset) || vision) {
				await dispatch(fetchAllAds({offset: ads.offset})).then((res) => {
					setLastOffset(`${parseInt(res.payload.blockOffset)}|${parseInt(res.payload.commercialOffset)}|${parseInt(res.payload.vipOffset)}`)
				})
			}
		}
	}
	const observer = new IntersectionObserver(
		async ([entry]) => {
			if (entry.isIntersecting) {
				let timer = setTimeout(async () => await handleObserver(entry.isIntersecting), 1000)
				return () => clearTimeout(timer)
			}
		},
		{threshold: 0.001}
	);

	useEffect(() => {
		if (location.pathname === '/' && !loading) {
			const interval = setInterval(async () => {
				if (location.pathname === '/') {
					await dispatch(fetchAllAds({offset: lastOffset})).then((res) => {
						setLastOffset(`${parseInt(res.payload.blockOffset)}|${parseInt(res.payload.commercialOffset)}|${parseInt(res.payload.vipOffset)}`)
					})
				}
			}, 10000);
			return () => clearInterval(interval);
		} else {
			setLastOffset('0|0|0')
		}
	}, [loading]);

	useEffect(() => {
		if (location.pathname === '/') {
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