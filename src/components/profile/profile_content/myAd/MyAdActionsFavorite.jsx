import React, {useState} from 'react';
import './myAd.css'
import Button from "../../../../ui/buttons/button";
import phone from "../../../../asserts/icons/phone.svg";
import trash from "../../../../asserts/icons/trash.svg";
import {formatDate} from "../../../../utils";
import axios from "axios";
import ModalMain from "../../../modal/modalMain";
import PhoneModal from "../../../modal/phoneModal";


const MyAdActionsFavorite = ({dataUser, setDataAds, statusAd}) => {
  const [showPhone, setShowPhone] = useState(false)
  const handleRemoveFavorite = async () => {
    const {data} = await axios.delete(`api/ad/removeFavorite?adId=${dataUser.id}`)
    setDataAds(data)
    window.location.reload();
  }

  const handleShowPhone = () => {
    setShowPhone(true)
  }
  return (
    <div className="myAd_actions">
      <div className="myAd_actions_favorite">
        <p className='myAd_actions_favorite-status semi_bold'>
          <span className={statusAd === 'myAd_grey' ? 'myAd_grey-red' : '' }>{dataUser.statusAd.name}</span>
        </p>
        <p className='myAd_actions_favorite-category'>{dataUser.object.name}</p>
        {statusAd === 'myAd_grey' ? (
          <>
          <Button classname={'phoneTall'} icon={phone} handleClick={handleShowPhone} disabled={true} />
          <br/>
          <Button classname={'edit'} icon={trash} handleClick={handleRemoveFavorite} styles={{ position: "relative", zIndex: 3   }}/>
          </>
        ) : (
          <>
          <Button classname={'phoneTall'} icon={phone} handleClick={handleShowPhone} disabled={false}/>
          <br/>
          <Button classname={'edit'} icon={trash} handleClick={handleRemoveFavorite} />
          </>
        )}
        
        <p className='myAd_actions_favorite-time'>{formatDate(new Date(dataUser.createdAt))}</p>
        <p className='myAd_actions_favorite-views'>{dataUser.views} просмотров</p>
      </div>

      <ModalMain activeModal={showPhone} setActiveModal={setShowPhone}
                 children={<PhoneModal phone={dataUser.user.phone}/>}/>
    </div>
  );
};

export default MyAdActionsFavorite;