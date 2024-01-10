import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Button from "../../../../ui/buttons/button";
import edit from "../../../../asserts/icons/edit.svg";
import ModalMain from "../../../modal/modalMain";
import HideAd from "../../../modal/hideAd";
import {pluralRusVariant} from "../../../../utils";

const MyAdActionsActive = ({dataUser, setDataAds}) => {
	const navigate = useNavigate()
	const {user, isAuth} = useSelector(state => state.user)
	const [active, setActive] = useState(false)
	const [check, setCheck] = useState(false)

	const fetchArchive = async () => {
		const {data} = await axios.get(`api/ad/archive/${dataUser.id}`);
		setDataAds(data);
	}

	useEffect(() => {
		if (check) {
			fetchArchive()
		}
		setActive(false)
	}, [check])
	const handleArchive = async () => {
		setActive(true)
	}
	const handleClick = (idCart) => {
	  navigate(`/card/${idCart}/edit`)
	}
	return (
		<div className="myAd_actions">
			{isAuth ? user.items.id === dataUser.userId ?
				<>
					<div className="actions_row-first flex space-between semi_bold">
						<p className='myAd_actions-title'>Осталось</p>
						<p className='myAd_actions-value'>{new Date(new Date(dataUser.dateEndActive) - new Date()).getDate()} {["день", "дня", "дней"][pluralRusVariant(new Date(new Date(dataUser.dateEndActive) - new Date()).getDate())]}</p>
					</div>
					<div className="actions_row flex space-between ">
						<p className='myAd_actions-title semi_bold'>Избранное</p>
						<p className='myAd_actions-value'>{dataUser.favoritesCount}</p>
					</div>
					<div className="actions_row flex space-between ">
						<p className='myAd_actions-title semi_bold'>Сообщения</p>
						<p className='myAd_actions-value'>0</p>
					</div>
				</> : null : null}
			<div className="actions_row flex space-between "><p className='myAd_actions-title semi_bold'>Просмотров</p><p
				className='myAd_actions-value'>{dataUser.views}</p></div>
			<div className="myAd_btn-edit">
				{isAuth ? user.items.id === dataUser.userId ? <Button handleClick={() => handleClick(dataUser.id)} classname={'edit'} icon={edit}/> : null : null}
			</div>
			<br/>
			{isAuth ? user.items.id === dataUser.userId ?
				<Button classname={'stroke'} children={'Снять с публикации'} handleClick={handleArchive}/> : null : null}
			<ModalMain activeModal={active} setActiveModal={setActive} children={<HideAd setCheck={setCheck} setActive={setActive}/>}/>
		</div>
	);
};

export default MyAdActionsActive;