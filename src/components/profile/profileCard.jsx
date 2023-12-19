import React, {useEffect, useState} from 'react';
import Rating from "../../ui/rating/rating";
import Button from "../../ui/buttons/button";
import ModalMain from "../modal/modalMain";
import RatingModal from "../modal/ratingModal";
import {useSelector} from "react-redux";
import axios from "axios";

const ProfileCard = ({avatar, dataUser}) => {
	const [modalShow, setModalShow] = useState(false)
	const [dataRating, setDataRating] = useState()
	const {isAuth, user} = useSelector(state => state.user)

	useEffect(() => {
		if (modalShow === true) {
			axios.get(`api/user/review/${dataUser.id}`)
				.then(res => {
					setDataRating(res.data)
				}).catch(err => {
				console.log(err)
				window.alert('Ошибка получения рейтинга')
			})
		}
	}, [modalShow])

	return (
		<div>
			<div className='profile_card flex items-center'>
				<div>
					<img src={avatar} alt="аватар" className="profile_card-img"/>
				</div>
				<div className="profile_card-info">
					<h1 className='profile_card-name bold'>{dataUser.name}</h1>
					{isAuth ? <p className='profile_card-number'>{dataUser.phone}</p> : null}
				</div>
			</div>
			<div className="flex rating_info" style={{cursor: 'pointer'}} onClick={() => setModalShow(true)}>
				<Rating data={dataUser.ratings} type='user'/>
			</div>
			{isAuth ? user.items.id === dataUser.userId ?
				<div className='mt-20'>
					<Button classname={'stroke'} children={'Редактировать'}/>
				</div> : null : null}
			{
				modalShow ?
					<ModalMain activeModal={modalShow} setActiveModal={setModalShow}
										 children={<RatingModal data={dataRating} userId={dataUser.id} setDataRating={setDataRating}
																						setActiveModal={setModalShow}/>}/> : null
			}
		</div>

	);
};

export default ProfileCard;