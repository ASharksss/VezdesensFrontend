import React, {useState} from 'react';
import './myAd.css'
import Button from "../../../../ui/buttons/button";
import phone from "../../../../asserts/icons/phone.svg";
import trash from "../../../../asserts/icons/trash.svg";
import {formatDate} from "../../../../utils";
import axios from "axios";
import ModalMain from "../../../modal/modalMain";
import PhoneModal from "../../../modal/phoneModal";


const MyAdActionsFavorite = ({dataUser, setDataAds}) => {
	const [showPhone, setShowPhone] = useState(false)
	const handleRemoveFavorite = async () => {
		const {data} = await axios.delete(`api/ad/removeFavorite?adId=${dataUser.id}`)
		setDataAds(data)
	}

	const handleShowPhone = () => {
	  setShowPhone(true)
	}

  return (
    <div className="myAd_actions">
      <div className="myAd_actions_favorite">
        <p className='myAd_actions_favorite-status semi_bold'>{dataUser.statusAd.name}</p>
        <p className='myAd_actions_favorite-category'>{dataUser.object.name}</p>
        <Button classname={'phoneTall'} icon={phone} handleClick={handleShowPhone}/>
        <br/>
        <Button classname={'edit'} icon={trash} handleClick={handleRemoveFavorite}/>
        <p className='myAd_actions_favorite-time'>{formatDate(new Date(dataUser.createdAt))}</p>
        <p className='myAd_actions_favorite-views'>{dataUser.views} просмотров</p>
      </div>

			<ModalMain activeModal={showPhone} setActiveModal={setShowPhone}
								 children={<PhoneModal phone={dataUser.user.phone}/>}/>
    </div>
  );
};

export default MyAdActionsFavorite;