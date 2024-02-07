import { useEffect, useState } from "react";
import _ from 'lodash';
import axios from "axios";

export default function useCatalogCard(offset, object, subCategory, category, query) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [data, setData] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setData([])
    }, [offset, object, subCategory, category, query])

    useEffect(() => {
        setLoading(true)
        setHasMore(false)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            url: '/api/search',
            params: {offset, object, subCategory, category, query},
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setData(prevState => {
                const combinedData = [...prevState, ...res.data.ads];
                const uniqueData = _.uniqWith(combinedData, _.isEqual);
                return uniqueData;
            });
            setHasMore(res.data.ads.length > 15)
            setLoading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
    }, [offset, object, subCategory, category, query])
    return {loading, error, data, hasMore}
}
