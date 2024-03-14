import {useState, useEffect} from "react";
import axios from "axios";

export default function useGetMessages(order) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [data, setData] = useState([])
    useEffect(() => {
        setData([])
    }, [])

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            url: '/api/chat/getMessages',
            params: {order},
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setData(res.data);
            setLoading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
    }, [order])
    return {loading, error, data, setData}
}
