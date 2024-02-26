import React from 'react';

const TimerContainer = ({date}) => (
    <svg width="117" height="231" viewBox="0 0 117 231" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M97 65V186C97 202.569 83.5685 216 67 216H15C6.71573 216 0 222.716 0 231V50C0 41.7157 6.71573 35 15 35H67C83.5685 35 97 48.4315 97 65Z"
            fill="#676767"/>
        <g filter="url(#filter0_d_83_1609)">
            <path
                d="M97 104V60C97 43.4315 83.5685 30 67 30H15C6.71573 30 0 23.2843 0 15V119C0 127.284 6.71573 134 15 134H67C83.5685 134 97 120.569 97 104Z"
                fill="#161616"/>
        </g>
        <text fill='white' textAnchor='middle' x='35%' fontSize='32px' fontWeight='700' y='35%' fontStyle='italic' fontFamily='Open Sans'>{date.day}</text>
        <text fill='white' textAnchor='middle' x='35%' y='46%' fontSize='24px' fontWeight='700' fontStyle='italic' fontFamily='Open Sans'>{date.month}</text>
        <text fill='white' textAnchor='middle' x='35%' fontSize='25px' fontWeight='700' y='77%' fontStyle='italic' fontFamily='Open Sans'>{date.hours}{parseInt(date.seconds) % 2 === 0 ? ':' : '.'}{date.minutes}</text>
        <defs>
            <filter id="filter0_d_83_1609" x="-40" y="0" width="157" height="179" filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                               result="hardAlpha"/>
                <feOffset dx="-10" dy="15"/>
                <feGaussianBlur stdDeviation="15"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_83_1609"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_83_1609" result="shape"/>
            </filter>
        </defs>
    </svg>

);

export default TimerContainer;
