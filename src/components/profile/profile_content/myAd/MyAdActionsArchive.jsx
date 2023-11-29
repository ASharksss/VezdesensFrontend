import React, {useState} from 'react';
import './myAd.css'
import Button from "../../../../ui/buttons/button";
import edit from "../../../../asserts/icons/edit.svg";
import trash from "../../../../asserts/icons/trash.svg";
import axios from "axios";
import {useSelector} from "react-redux";
import ModalMain from "../../../modal/modalMain";
import ReturnAd from "../../../modal/returnAd";

const MyAdActionsArchive = ({dataUser, setDataAds}) => {

	const [active, setActive] = useState(false)

	const {user, isAuth} = useSelector(state => state.user)
	const handlePublish = async () => {
		setActive(true)

	}
	const handleRemove = async () => {
		const check = window.confirm('Удалить объявление?')
		if (check) {
			const {data} = await axios.delete(`api/ad/remove?adId=${dataUser.id}`)
			setDataAds(data)
		}
	}
	return (
		<div className="myAd_actions">
			{isAuth ? user.items.id === dataUser.userId ?
				<>
					<Button classname={'activeAd'} children={'Актирвировать'} handleClick={handlePublish}/>
					<br/>
					<Button classname={'edit'} icon={edit}/>
					<br/>
					<Button classname={'edit'} icon={trash} handleClick={handleRemove}/>
				</> : null : null}
			<div className="myAd_actions_archive">
				{isAuth ? user.items.id === dataUser.userId ?
					<>
						<div className="actions_row-first flex space-between semi_bold"><p className='myAd_actions-title'>Истек</p>
							<p className='myAd_actions-value'>{new Date(new Date(dataUser.dateEndActive) - new Date()).getDate()} дня</p>
						</div>
						<div className="actions_row flex space-between semi_bold">
							<p className='myAd_actions-title'>Избранное</p>
							<p className='myAd_actions-value'>{dataUser.favoritesCount}</p>
						</div>
						<div className="actions_row flex space-between semi_bold">
							<p className='myAd_actions-title'>Сообщения</p>
							<p className='myAd_actions-value'>0</p>
						</div>
					</> : null : null}
				<div className="actions_row flex space-between semi_bold"><p className='myAd_actions-title'>Просмотров</p><p
					className='myAd_actions-value'>{dataUser.views}</p></div>
			</div>
			<ModalMain activeModal={active} setActiveModal={setActive} children={<ReturnAd/>} />

		</div>
	);
};

export default MyAdActionsArchive;