import React from 'react';
import {NavLink} from "react-router-dom";
import Card from "../../cards/Card";
import {STATIC_HOST} from "../../../utils";


const CommercialBlocksLss = ({items}) => {
    let length = 0
    let countL = 0, countStPl = 0
    if (items !== undefined) {
        countL = items.filter((item) => (item.typeAdId === 3)).length;
        countStPl = items.filter((item) => (item.typeAdId === 2)).length;
        length = countL + countStPl
    }
    return (
        <div className='grid'
             style={{gridTemplateColumns: `repeat(${length === 1 ? '2' : '3'}, ${length === 1 ? '400px' : '1fr'})`}}>
            {items !== undefined && items.map((item, index) => ((item.typeAdId === 2 || item.typeAdId === 3) &&
                <Card key={`card-${index}`}
                      classname={item.typeAdId === 2 && 's' || item.typeAdId === 3 && 'l'}
                      ad_image={`${STATIC_HOST}/${item.commercialImageAds[0]?.name}`}
                      title={item.title}
                      address={item.address}
                      price={item.price}
                      favorite={item.favorites}
                      date={item.date}
                      id={item.id}
                />
            ))}
            {items !== undefined && (length === 2 || length === 1) ? (
                <NavLink to='/createAd' target='_blank'>
                    <div className={`card ${countL === 0 ? 'l' : 's'}`}>
                        <span style={{
                            width: '100%',
                            position: 'absolute',
                            left: `${countL === 0 ? '20%' : 0}`,
                            transform: 'rotate(45deg)',
                            top: `${countL === 0 ? 70 : 50}%`,
                            fontSize: '26px',
                            fontWeight: 700
                        }}>Место для вашей карточки</span>
                    </div>
                </NavLink>
            ) : null}
        </div>
    );
};

export default CommercialBlocksLss;
