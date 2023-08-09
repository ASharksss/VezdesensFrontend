import React from 'react';
import favorite from '../../asserts/icons/favorite.svg'

const Favorite = ({classname}) => {
  return (
    <div className={classname}>
      <img src={favorite} alt="в избранное"/>
    </div>
  );
};

export default Favorite;