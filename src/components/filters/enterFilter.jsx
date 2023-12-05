import React from 'react';
import './filters.css'

const EnterFilter = () => {
  return (
    <div className='filter_item'>
      <span className='filter_label'>Цена <span>Р</span></span>
      <div className="flex">
        <input type="text" className='filter_input' placeholder='от'/>
        <input type="text" className='filter_input' placeholder='до'/>
      </div>
    </div>
  );
};

export default EnterFilter;