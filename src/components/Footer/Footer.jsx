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
				// entry.isIntersecting будет true, если целевой элемент видим в области просмотра
				if (entry.isIntersecting) {
					setIsVisible(true);
					// Вы можете вызвать здесь функцию или выполнить другие действия при достижении компонента
					debounce(dispatch(fetchAllAds(parseInt(ads.page) + 1)), 300)
				}
			},
			// Настройки для IntersectionObserver (в данном случае, отслеживаем, когда 50% элемента видно)
			{ threshold: 0.01 }
		);

		// Начать отслеживание целевого элемента
		observer.observe(componentRef.current);

		// Очистка IntersectionObserver при размонтировании компонента
		return () => {
			observer.disconnect();
		};
		function debounce(func, delay) {
			let timeout;
			return function () {
				const context = this;
				const args = arguments;
				clearTimeout(timeout);
				timeout = setTimeout(() => {
					func.apply(context, args);
				}, delay);
			};
		}
	}, []);
	return (
		<div style={{border: '1px solid black', width: '100%', height: '300px', marginTop: '20px'}} ref={componentRef}>
			{isVisible && <p>Этот текст будет виден, когда компонент появится в области просмотра.</p>}
		</div>
	);
};

export default Footer;