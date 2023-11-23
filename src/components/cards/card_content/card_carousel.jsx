import React, {useState} from 'react';
import CarouselStyle from './Carousel.module.css'
import {STATIC_HOST} from "../../../utils";

const CardCarousel = ({images}) => {
	const [slideIndex, setSlideIndex] = useState(0);

	const nextSlide = () => {
		setSlideIndex((slideIndex + 1) % 3);
	};

	const prevSlide = () => {
		setSlideIndex((slideIndex - 1 + 3) % 3);
	};
	return (
		<div className={CarouselStyle.carousel}>
			<div className={CarouselStyle.carouselSlide}>
				{images[0].name !== undefined ?
					images.map((item, index) => <img key={`imageCard-${index}=${item.id}`} src={`${STATIC_HOST}/${item.name}`}/>)
					: <img src={images} alt="Slide 1" />}
			</div>
			{(images[0].name !== undefined && images.length > 1) ? <>
				<button onClick={prevSlide}>Previous</button>
				<button onClick={nextSlide}>Next</button>
			</> : null}
		</div>
	);
};

export default CardCarousel;