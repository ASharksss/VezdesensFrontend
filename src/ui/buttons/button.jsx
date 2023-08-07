import React from 'react';
import './button.css'

const Button = ({children, classname, icon}) => {
  return (
    <div className='btn-connect'>
      <button className={classname}>
        <img src={icon} alt="иконка"/>
      </button>
    </div>
  );
};

export default Button;