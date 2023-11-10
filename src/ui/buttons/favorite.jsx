import React from 'react';
import favorite from '../../asserts/icons/favorite.svg'

const Favorite = ({classname, id}) => {
  const handleFavorite = () => {
    console.log('card', id)
  }
  return (
    <div className={classname} onClick={() => handleFavorite()}>
      <img src={favorite} alt="в избранное"/>
    </div>
  );
};

export default Favorite;