import React, {useEffect, useMemo, useState} from 'react';
import Card from "../cards/Card";
import {STATIC_HOST} from "../../utils";
import SmallBlocks from "./BoardBlocks/SmallBlocks";
import CommercialBlocksLss from "./BoardBlocks/CommercialBlocksLSS";

const BorderComponent = ({allData, lastElementRef}) => {
    const [data, setData] = useState([])
    const [lastDataLength, setLastDataLength] = useState(0)

    useEffect(() => {
        if (allData.length > 0) {
            setData(prevState => [...prevState, allData.slice(lastDataLength, allData.length + 1)])
            setLastDataLength(allData.length)
        }
    }, [allData])

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
            {data.map((datas, indexDatas) => (
                <div ref={indexDatas === data.length - 1 ? lastElementRef : null} key={`grid-${indexDatas}`}>
                    <SmallBlocks items={datas} />
                    <CommercialBlocksLss items={datas}/>
                </div>
            ))}
        </div>
    );
};

export default BorderComponent;