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
