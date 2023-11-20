import React from 'react';
import './myAd.css'
import Button from "../../../../ui/buttons/button";
import edit from "../../../../asserts/icons/edit.svg";
import trash from "../../../../asserts/icons/trash.svg";
import {formatDate} from "../../../../utils";


const MyAdActionsArchive = ({dataUser}) => {
		return (
			<div className="myAd_actions">
				<Button classname={'activeAd'} children={'Актирвировать'}/>
				<br/>
				<Button classname={'edit'} icon={edit}/>
				<br/>
				<Button classname={'edit'} icon={trash}/>
				<div className="myAd_actions_archive">
					<div className="actions_row-first flex space-between semi_bold"><p className='myAd_actions-title'>Истек</p>
						<p className='myAd_actions-value'>{formatDate(dataUser.dateEndActive)}</p></div>
					<div className="actions_row flex space-between semi_bold"><p className='myAd_actions-title'>Избранное</p><p
						className='myAd_actions-value'>{dataUser.favoritesCount}</p></div>
					<div className="actions_row flex space-between semi_bold"><p className='myAd_actions-title'>Сообщения</p><p
						className='myAd_actions-value'>0</p></div>
					<div className="actions_row flex space-between semi_bold"><p className='myAd_actions-title'>Просмотров</p><p
						className='myAd_actions-value'>{dataUser.views}</p></div>
				</div>
			</div>
		);
};

export default MyAdActionsArchive;