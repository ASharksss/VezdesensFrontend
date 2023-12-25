import React from 'react';
import './button.css'

const Button = ({children, classname, icon, handleClick}) => {
  return (
    <div className='btn-connect '>
      <button className={classname} onClick={handleClick}>
        {
          classname === 'stroke' ? <p>{children}</p> :
            classname === 'activeAd' ? <p>{children}</p> :
              classname === 'show_phone' ? <p>{children}</p> :
                classname === 'like_ads' ? <p>{children}</p> :
                  classname === 'phone' || classname === 'message'
                  || classname === 'edit' || classname === 'trashBlack'
                  || classname === 'phoneTall' || classname === 'editProfile' ?
                    <img src={icon} alt="иконка"/> : null
        }
      </button>
    </div>
  );
};

export default Button;