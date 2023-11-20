import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchAllAds} from "../../redux/slices/boardSlice";

const Footer = () => {
	const [isVisible, setIsVisible] = useState(false);
	const componentRef = useRef();
	const {ads} = useSelector(state => state.ads)
	const dispatch = useDispatch()

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
                    dispatch(fetchAllAds(ads.offset))
				}
			},
			{ threshold: 0.001 }
		);
		observer.observe(componentRef.current);
		return () => {
			observer.disconnect();
		};
	}, []);
	return (
		<div style={{border: '1px solid black', width: '100%', height: '300px', marginTop: '20px'}} ref={componentRef}>
			{isVisible && <p>Этот текст будет виден, когда компонент появится в области просмотра.</p>}
		</div>
	);
};

export default Footer;