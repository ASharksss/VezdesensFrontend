import React from 'react';
import {NavLink} from "react-router-dom";
import Card from "../../cards/Card";
import {STATIC_HOST} from "../../../utils";


const CommercialBlocksLss = ({items}) => {
    let length = 0
    if (items !== undefined)
        length = items.filter((item) => (item.typeAdId === 2 || item.typeAdId === 3)).length;
    return (
        <div className='grid'
             style={{gridTemplateColumns: `repeat(${length < 3 ? '2' : '3'}, ${length < 3 ? '400px' : '1fr'})`}}>
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
                    <div className={'card l'}>
                        <span style={{
                            width: '100%',
                            position: 'absolute',
                            left: '20%',
                            transform: 'rotate(45deg)',
                            top: '70%',
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
