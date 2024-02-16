import React from 'react';
import {NavLink} from "react-router-dom";

const AddPage = () => {
  return (
    <div className='container'>
      <div className="char_center">
        <NavLink to='/addCategory'>
          <button className='addPage_btn'>Добавить категории</button>
        </NavLink>
        <NavLink to='/addSubCategory'>
          <button className='addPage_btn'>Добавить Подкатегории</button>
        </NavLink>
        <NavLink to='/addObject'>
          <button className='addPage_btn'>Добавить Объекты</button>
        </NavLink>
        <NavLink to='/characteristic'>
          <button className='addPage_btn'>Добавить Характеристики</button>
        </NavLink>
      </div>
    </div>
  );
};

export default AddPage;