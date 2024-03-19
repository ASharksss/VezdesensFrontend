import React, {useRef, useEffect, useState} from 'react';
import arrowSVG from '../../asserts/icons/arrow.svg'
import {useLocation} from "react-router-dom";

const SmoothScroll = ({children}) => {
    const location = useLocation();
    const { pathname, hash } = location;
    const smoothRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = smoothRef.current;
        element.scroll({top: 0});
    }, [pathname, hash]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTopValue = smoothRef.current.scrollTop;
            if (scrollTopValue > 600 && !isVisible) {
                setIsVisible(true);
            } else if (scrollTopValue <= 600 && isVisible) {
                setIsVisible(false);
            }
        }
        smoothRef.current.addEventListener('scroll', handleScroll);
        return () => {
            smoothRef.current.removeEventListener('scroll', handleScroll);
        };
    }, [isVisible]);

    const scrollToTop = () => {
        const element = smoothRef.current;
        const to = 0;
        const duration = 1000;
        const start = element.scrollTop;
        const change = to - start;
        let currentTime = 0;
        const increment = 20;

        const animateScroll = () => {
            currentTime += increment;
            element.scrollTop = Math.easeInOutQuad(currentTime, start, change, duration);
            if (currentTime < duration) {
                requestAnimationFrame(animateScroll);
            }
        };

        animateScroll();
    };

    return (
        <div ref={smoothRef} style={{height: '100vh', overflow: 'auto'}}>
            {children}
            {isVisible && <button onClick={scrollToTop} id={'buttonUp'} className='up-container'>
                <div className='up-container_content'>
                    <span className='up-container_text'>Наверх</span>
                    <img src={arrowSVG} alt="Прокрутить наверх" width={10} className='up-container_img'/>
                </div>
            </button>}
        </div>
    );
};

// Функция для плавной анимации скроллинга
Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
};

export default SmoothScroll;
