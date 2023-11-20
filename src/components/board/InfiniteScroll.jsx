import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

export const InfiniteScroll = ({children}) => {
	const [isFetching, setIsFetching] = useState(false);


	useEffect(() => {
		// function handleScroll() {
		// 	if (window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.offsetHeight) {
		// 		console.log("Конец страницы достигнут!");
		// 		// Debounce the function call by introducing a delay
		// 		debounce(fetchAllAds, 300); // Adjust the delay (in milliseconds) as needed
		// 	}
		// }
		//
		// function debounce(func, delay) {
		// 	let timeout;
		// 	return function () {
		// 		const context = this;
		// 		const args = arguments;
		// 		clearTimeout(timeout);
		// 		timeout = setTimeout(() => {
		// 			func.apply(context, args);
		// 		}, delay);
		// 	};
		// }
		//
		// window.addEventListener('scroll', handleScroll);
		//
		// return () => {
		// 	window.removeEventListener('scroll', handleScroll);
		// };
	}, []);

	return <div>{children}</div>;
}
