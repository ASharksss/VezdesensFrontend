import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import axios from "axios";
import Rating from "../../ui/rating/rating";
import Button from "../../ui/buttons/button";
import ModalMain from "../modal/modalMain";
import RatingModal from "../modal/ratingModal";
import EditModal from "../modal/editModal";
import isCompanySVG from '../../asserts/is_company.svg'

const ProfileCard = ({avatar, dataUser}) => {
	const [modalShow, setModalShow] = useState(false)
	const [editModal, setEditModel] = useState(false)
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
		<>
			<div className='profile_card flex items-center'>
				<div>
					<img src={avatar} alt="аватар" className="profile_card-img"/>
				</div>
				<div className="profile_card-info">
					<div className={'flex'}>
						<h1 className='profile_card-name bold'>{dataUser.name}</h1>
					</div>
					{dataUser?.isCompany ?
						<div className="flex mb-10">
							<h1 className='profile_card-companyName'>{dataUser?.companyName}</h1>
							<img src={isCompanySVG} height={15} width={15} title={dataUser?.companyName} style={{marginLeft: 10}}
									 alt={dataUser?.companyName ? dataUser.companyName : 'Название компании'}/>
						</div> : null}
					{isAuth ? <p className='profile_card-number'>{dataUser.phone}</p> : null}
				</div>
			</div>
			<div className="flex rating_info" style={{cursor: 'pointer'}} onClick={() => setModalShow(true)}>
				<Rating data={dataUser.ratings} type='user'/>
			</div>
			{isAuth ? user.items.id === dataUser.id ?<div>
				<Button classname={'stroke'} children={'Редактировать'} handleClick={() => {setEditModel(true)}}/>
			</div> : null : null}
			{
				modalShow ?
					<ModalMain touched={false} activeModal={modalShow} setActiveModal={setModalShow}
										 children={<RatingModal data={dataRating} userId={dataUser.id} setDataRating={setDataRating}
																						setActiveModal={setModalShow}/>}/> : null
			}
			{
				editModal ?
					<ModalMain activeModal={editModal} setActiveModal={setEditModel}
										 children={<EditModal data={dataUser} setModal={setEditModel}/>} /> : null
			}

		</>

	);
};

export default ProfileCard;
