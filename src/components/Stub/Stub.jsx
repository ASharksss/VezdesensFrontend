import React from 'react';
import './stub.css'
import logo from '../../asserts/logo.svg'

const Stub = () => {
  return (
    <div className='stub_wrapper'>
      <div className='stub_header'>
        <img src={logo} alt=""/>
      </div>
     <p className='stub_text'>К сожалению, пока доступна только компьютерная версия :(</p>
    </div>
  );
};

export default Stub;