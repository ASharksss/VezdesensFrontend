import React from 'react';
import './stub.css'
import logo from '../../asserts/logo.svg'
import dog from '../../asserts/dog.webm'

const Stub = () => {
  return (
    <div className='stub_wrapper'>

        <div className='stub_header'>
          <img src={logo} alt=""/>
        </div>
        <p className='stub_text'>К сожалению, пока доступна только компьютерная версия :(</p>
        <video width={200} autoPlay={true} loop={true} playsInline={true} disablePictureInPicture={true} muted>
          <source src={dog} type="video/webm"/>
        </video>
        <p className='stub_small_text'>Мы работаем над этим, честно</p>

    </div>
  );
};

export default Stub;