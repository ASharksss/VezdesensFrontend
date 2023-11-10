import React from 'react';
import './myAd.css'
import Button from "../../../../ui/buttons/button";
import edit from "../../../../asserts/icons/edit.svg";
import message from "../../../../asserts/icons/message.svg";
import phone from "../../../../asserts/icons/phone.svg";
import trash from "../../../../asserts/icons/trash.svg";
import {formatDate} from "../../../../utils";


const MyAdActionsFavorite = ({dataUser}) => {

  return (
    <div className="myAd_actions">


      <div className="myAd_actions_favorite">

        <p className='myAd_actions_favorite-status semi_bold'>{dataUser.statusAd.name}</p>
        <p className='myAd_actions_favorite-category'>{dataUser.object.name}</p>

        <Button classname={'phoneTall'} icon={phone}/>
        <br/>
        <Button classname={'edit'} icon={trash}/>

        <p className='myAd_actions_favorite-time'>{formatDate(new Date(dataUser.createdAt))}</p>
        <p className='myAd_actions_favorite-views'>{dataUser.views} просмотров</p>
      </div>
    </div>
  );
};

export default MyAdActionsFavorite;