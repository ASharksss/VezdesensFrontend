import React from 'react';
import Rating from "../../ui/rating/rating";
import Button from "../../ui/buttons/button";

const ProfileCard = ({avatar, dataUser }) => {

  return (
    <div>
      <div className='profile_card flex items-center'>
        <div>
          <img src={avatar} alt="аватар" className="profile_card-img"/>
        </div>
        <div className="profile_card-info">
          <h1 className='profile_card-name bold'>{dataUser.name}</h1>
          <p className='profile_card-number'>{dataUser.phone}</p>
        </div>
      </div>
      <Rating data={dataUser.ratings}/>
      <div className='mt-20'>
        <Button classname={'stroke'} children={'Редактировать'}/>
      </div>
    </div>

  );
};

export default ProfileCard;