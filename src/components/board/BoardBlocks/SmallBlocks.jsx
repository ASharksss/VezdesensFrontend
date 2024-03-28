import React from 'react';
import Card from "../../cards/Card";
import ad_image from '../../../asserts/ad_image_small.png'
import {STATIC_HOST} from "../../../utils";

const SmallBlocks = ({items}) => {
    return (
        <div className='grid' style={{
            gridTemplateColumns: 'repeat(5, 1fr)'
        }}>
            {items !== undefined && items.map((item, index) => ( item.typeAdId === 1 &&
                <Card key={`card-${index}`}
                      classname={'xs' }
                      ad_image={`${STATIC_HOST}/${item.previewImageAds[0]?.name}`}
                      title={item.title}
                      address={item.address}
                      price={item.price}
                      favorite={item.favorites}
                      date={item.date}
                      id={item.id}
                      show={item.showPhone}
                />
            ))}
        </div>
    );
};

export default SmallBlocks;
