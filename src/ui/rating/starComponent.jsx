import React from 'react';
import fullStarSVG from "../../asserts/icons/stars/fullStar.svg";
import halfStarSVG from "../../asserts/icons/stars/halfStar.svg";
import emptyStarSVG from "../../asserts/icons/stars/emptyStar.svg";

const StarComponent = ({average}) => {
	const fullStars = Math.floor(average);
	const halfStars = average - fullStars >= 0.5;
	const emptyStars = 5 - fullStars - (halfStars ? 1 : 0);
	return (
		<div >
			{[...Array(fullStars)].map((_, index) => (
				<img key={`full-${index}`} src={fullStarSVG} alt="Full Star" width='26'/>
			))}
			{halfStars && <img src={halfStarSVG} alt="Half Star" width='26'/>}
			{[...Array(emptyStars)].map((_, index) => (
				<img key={`empty-${index}`} src={emptyStarSVG} alt="Empty Star" width='26'/>
			))}
		</div>
	);
};

export default StarComponent;