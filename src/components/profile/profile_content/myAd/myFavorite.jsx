import React from 'react';
import MyAd from "./myAd";

const MyFavorite = ({dataUser}) => {
  return (
    <div>
      <select className='favorite_filter'>
        <option>Категория 1</option>
        <option>Категория 2</option>
        <option>категория 3</option>
      </select>
      <div className="ads">
        <MyAd typeAd={'favoriteAd'} dataUser={dataUser}/>
      </div>
    </div>
  );
};

export default MyFavorite;