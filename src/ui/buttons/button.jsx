import React from 'react';
import './button.css'

const Button = ({children, classname, icon, handleClick, disabled, styles, iconHeight=18, iconWidth=18}) => {
  return (
    <div className='btn-connect '  style={styles}>
      <button className={classname} onClick={handleClick} disabled={disabled} >
        {
          classname === 'stroke' ? <p>{children}</p> :
            classname === 'activeAd' ? <p>{children}</p> :
              classname === 'show_phone' ? <p>{children}</p> :
                classname === 'like_ads' ? <p>{children}</p> :
                  classname === 'phone' || classname === 'message' || classname === 'message_l'
                  || classname === 'edit' || classname === 'trashBlack' || classname === 'phone_l'
                  || classname === 'phoneTall' || classname === 'editProfile' ?
                    <img src={icon} alt="иконка" height={iconHeight} width={iconWidth}/> : null
        }
      </button>
    </div>
  );
};

export default Button;
