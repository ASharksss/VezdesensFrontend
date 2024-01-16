import React, {useCallback, useEffect, useRef, useState} from 'react';
import _ from 'lodash';
import useLoadingCard from "../redux/hooks/useLoadingCard";
import BorderComponent from "../components/board/borderComponent";

const HomePage = () => {
    const [offset, setOffset] = useState('0|0|0')
    const [allData, setAllData] = useState([])
    const [standardCount, setStandardCount] = useState(0)
    const [standardPlusCount, setStandardPlusCount] = useState(0)
    const [vipCount, setVIPCount] = useState(0)

    const {loading, data, hasMore} = useLoadingCard(offset)

    useEffect(() => {
        if (!loading && hasMore) {
            setStandardCount(prevState => prevState + data.filter(item => item.typeAdId === 1).length)
            setStandardPlusCount(prevState => prevState + data.filter(item => item.typeAdId === 2).length)
            setVIPCount(prevState => prevState + data.filter(item => item.typeAdId === 3).length)
        }
        if (!loading && data.length > 0) {
            setAllData(prevState => {
                const combinedData = [...prevState, ...data];
                const uniqueData = _.uniqWith(combinedData, _.isEqual);
                return uniqueData;
            });
        }
    }, [loading, hasMore, data])

    const observer = useRef()
    const lastElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                if (offset !== `${standardCount}|${standardPlusCount}|${vipCount}`) {
                    setOffset(`${standardCount}|${standardPlusCount}|${vipCount}`)
                }
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore, offset, standardCount, standardPlusCount, vipCount])
    return (
        <div>
            <BorderComponent allData={allData} lastElementRef={lastElementRef} />
        </div>
    );
};

export default HomePage;