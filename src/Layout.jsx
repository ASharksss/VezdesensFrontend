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

	useEffect(() => {
		localStorage.setItem('last_path', location.pathname + location.search)
	}, [location.pathname]);
	let lastOffset = '0|0|0'
	const loading = ads.status === 'loading'
	if (!loading)
		lastOffset = ads.offset

	const handleObserver = async (vision=false) => {
		if (vision && ads.offset !== lastOffset) {
			await dispatch(fetchAllAds({offset: ads.offset})).then((res) => {
				lastOffset = `${parseInt(res.payload.blockOffset)}|${parseInt(res.payload.commercialOffset)}|${parseInt(res.payload.vipOffset)}`
			})
		}
	}
	const observer = new IntersectionObserver(
		async ([entry]) => {
			if (entry.isIntersecting) {
				await handleObserver(entry.isIntersecting)
			}
		},
		{threshold: 0.001}
	);

	useEffect(() => {
		if (location.pathname === '/' && !loading) {
			const interval = setInterval(async () => {
				console.log(lastOffset)
				await dispatch(fetchAllAds({offset: lastOffset})).then((res) => {
					lastOffset = `${parseInt(res.payload.blockOffset)}|${parseInt(res.payload.commercialOffset)}|${parseInt(res.payload.vipOffset)}`
				})
			}, 10000);
			return () => clearInterval(interval);
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