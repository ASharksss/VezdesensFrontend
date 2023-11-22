import React, {useRef} from 'react';

const SmoothScroll = ({children}) => {
	const ref = useRef(null);

	const scrollToTop = () => {
		const element = ref.current;
		const to = 0;
		const duration = 1000;
		const start = element.scrollTop;
		const change = to - start;
		let currentTime = 0;
		const increment = 20;

		const animateScroll = () => {
			currentTime += increment;
			element.scrollTop = Math.easeInOutQuad(currentTime, start, change, duration);
			if (currentTime < duration) {
				requestAnimationFrame(animateScroll);
			}
		};

		animateScroll();
	};

	return (
		<div ref={ref} style={{height: '100vh', overflow: 'auto'}}>
			{children}
			<button onClick={scrollToTop}>Прокрутить наверх</button>
		</div>
	);
};

// Функция для плавной анимации скроллинга
Math.easeInOutQuad = function (t, b, c, d) {
	t /= d / 2;
	if (t < 1) return (c / 2) * t * t + b;
	t--;
	return (-c / 2) * (t * (t - 2) - 1) + b;
};

export default SmoothScroll;