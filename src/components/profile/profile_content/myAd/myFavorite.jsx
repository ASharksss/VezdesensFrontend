import React from 'react';
import MyAd from "./myAd";

const MyFavorite = () => {
  return (
    <div>
      <select className='favorite_filter'>
        <option>Категория 1</option>
        <option>Категория 2</option>
        <option>категория 3</option>
      </select>
      <div className="ads">
        <MyAd typeAd={'favoriteAd'}/>
        <MyAd typeAd={'favoriteAd'}/>
        <MyAd typeAd={'favoriteAd'}/>
      </div>
    </div>
  );
};

export default MyFavorite;