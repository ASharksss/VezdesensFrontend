import React, {useMemo} from 'react';
import Card from "../cards/Card";
import {STATIC_HOST} from "../../utils";

const BorderComponent = ({allData, lastElementRef}) => {
    const createTable = useMemo(() => {
        const combined = [];
        let timeCombined = [];

        allData.forEach((item, index) => {
            timeCombined.push(
                <div key={`card-${index}`} ref={index === allData.length - 1 ? lastElementRef : null}>
                    {item.typeAdId === 1 && (
                        <Card
                            classname={'xs'}
                            ad_image={`${STATIC_HOST}/${item.previewImageAds[0]?.name}`}
                            title={item.title}
                            address={item.address}
                            price={item.price}
                            favorite={item.favorites}
                            date={item.date}
                            id={item.id}
                        />
                    )}
                    {(item.typeAdId === 2 || item.typeAdId === 3) && (
                        <Card
                            classname={item.typeAdId === 2 ? 's' : item.typeAdId === 3 ? 'l' : 's'}
                            ad_image={`${STATIC_HOST}/${item.previewImageAds[0]?.name}`}
                            title={item.title}
                            address={item.address}
                            price={item.price}
                            favorite={item.favorites}
                            date={item.date}
                            id={item.id}
                        />
                    )}
                </div>
            );

            if ((index + 1) % 5 === 0 || index === allData.length - 1) {
                combined.push([...timeCombined]);
                timeCombined = [];
            }
        });

        return combined;
    }, [allData, lastElementRef]);

    return (
        <div>
            {createTable.map((item, index) => (
                <div className="grid" key={`grid-${index}`} style={{gridTemplateColumns: `repeat(${((index + 1) % 5 === 0 || (index + 1) % 4 === 0) ? '3' : '5'}, 1fr)`, gap: 10}}>
                    {item}
                </div>
            ))}
        </div>
    );
};

export default BorderComponent;