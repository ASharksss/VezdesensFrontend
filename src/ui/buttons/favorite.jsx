import React, {useEffect, useState} from 'react';
import favoriteSVG from '../../asserts/icons/favorite.svg'
import isFavoriteSVG from '../../asserts/icons/isFavorite.svg'
import favoriteHover from '../../asserts/icons/favoriteHover.svg'
import axios from "axios";

const Favorite = ({classname, id, favorite}) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isFavorite, setIsFavorite] = useState(false);
	const handleFavorite = async () => {
			if (isFavorite) {
				await axios.delete(`api/ad/removeFavorite?adId=${id}`)
					.then((res) => {
						setIsFavorite(false)
					})
			} else {
				await axios.get(`api/ad/inFavorite?adId=${id}`)
					.then((res) => {
						setIsFavorite(true)
					})
			}
	}
	const handleMouseEnter = () => {
		setIsHovered(true);
	}

	const handleMouseLeave = () => {
		setIsHovered(false);
	}

	useEffect(() => {
		if (favorite !== undefined) {
			if (favorite.length > 0) {
				setIsFavorite(true)
			}
		}
	}, [id])

	return (
		<div className={isFavorite ? classname + ' active' : classname}
				 onMouseEnter={handleMouseEnter}
				 onMouseLeave={handleMouseLeave}
				 onClick={() => handleFavorite()}>
			<img src={isFavorite ? isFavoriteSVG : !isHovered ? favoriteSVG : favoriteHover} alt="в избранное"/>
		</div>
	);
};

export default Favorite;