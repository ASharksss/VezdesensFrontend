import React from 'react';
import './button.css'

const Button = ({children, classname, icon}) => {
    return (
        <div className='btn-connect '>
            <button className={classname}>
                {
                    classname === 'show_more' ? <p>{children}</p > :
                        classname === 'phone' || classname === 'message' ?
                            <img src={icon} alt="иконка"/> : 'нишо'
                }
            </button>
        </div>
    );
};

export default Button;