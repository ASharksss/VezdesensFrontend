import React from 'react';
import './preloader.css'
import logoSVG from '../../asserts/logo.svg';
import {preloaderText} from "../../utils";

const PreloaderComponent = () => {
    return (
        <div className='container_preloader'>
            <div className="loader">
                <div className='circle-preloader circle-front'></div>
                <div className='circle-preloader circle-rear'></div>
                <img src={logoSVG} alt="Логотип" width={256}/>
            </div>
            <div className='loader-text'>
                <span>{preloaderText()}</span>
            </div>
        </div>
    );
};

export default PreloaderComponent;
