import React from 'react';
import Button from "../../../../ui/buttons/button";
import trash from '../../../../asserts/icons/trashWhite.svg'
import {pluralRusVariant} from "../../../../utils";
import axios from "axios";

const SelectedMessages = ({count, removeChat}) => {
	return (
		<div className='selectedMessages flex items-center space-between'>
			<p className='selectedMessages-text'>{count} {["чат", "чата", "чатов"][pluralRusVariant(count)]}</p>
			<Button classname={'trashBlack'} icon={trash} handleClick={removeChat}/>
		</div>
	);
};

export default SelectedMessages;
