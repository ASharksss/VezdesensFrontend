import React, {useState} from 'react';
import '../../App.css'
import StarComponent from "./starComponent";
import ModalMain from "../../components/modal/modalMain";
import writeReview from "../../components/modal/writeReview";
import WriteReview from "../../components/modal/writeReview";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {pluralRusVariant} from "../../utils";


const Rating = ({data = [], type='user', userId, setDataRating, active=false}) => {
	const {isAuth, user} = useSelector(state => state.user)
	const [activeModal, setActiveModal] = useState(false)

    let average
    if (data.length > 0) {
        let ratings = data.map(item => item.grade)
        const sum = ratings.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        average = sum !== 0 ? (sum / ratings.length).toFixed(2) : 0;
    } else {
        average = 0
    }
		if (type === 'user')
			return (
					<div className='flex' style={{alignItems: 'center', justifyContent: 'space-evenly'}}>
							<span className='rating-text'>{average}</span>
							<StarComponent average={average}/>
							<p className='count_grade'> {data.length} {["отзыв", "отзыва", "отзывов"][pluralRusVariant(parseInt(data.length))]}</p>
					</div>
			);
		else
			return (
				<div className='flex' style={{alignItems: 'center'}}>
					<div className='flex items-center'>
						<span className='rating_cost'>{average}</span>
						<StarComponent average={average}/>
					</div>

					<div className='flex'>
						{isAuth ? user.items.id !== userId ?
							!active && <button className='rating_btn' onClick={() => setActiveModal(true)}>Написать отзыв</button> : null
							: <NavLink style={{textAlign: 'center'}} className='rating_btn' to={'/signin'}>Войти</NavLink>}
					</div>
					<ModalMain touched={false} activeModal={activeModal} setActiveModal={setActiveModal}
										 children={<WriteReview userId={userId} setActiveModal={setActiveModal} setDataRating={setDataRating}/>}/>
				</div>
			);
};

export default Rating;
