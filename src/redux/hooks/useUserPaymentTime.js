import React, {useEffect, useState} from 'react';

export default function useUserPaymentTime(date) {
    const [hours, setHours] = useState(null)
    const [minutes, setMinutes] = useState(null)
    const [seconds, setSeconds] = useState(null)
    const [disabled, setDisabled] = useState(false)

    let intervalId
    const currentDate = new Date()

    useEffect(() => {
        if (!(currentDate < date && date !== null)) return;
        intervalId = setInterval(() => {
            const dateDiff = Math.abs(date.getTime() - currentDate.getTime());
            const seconds = Math.floor(dateDiff / 1000);
            const minutes = Math.floor(seconds / 60);
            setHours(Math.floor(minutes / 60))
            setMinutes(minutes % 60)
            setSeconds(seconds % 60)
        }, 1000)
        return () => clearInterval(intervalId)
    }, [date])
    useEffect(() => {
        if (hours === 0 && minutes === 0 && seconds === 0) {
            setDisabled(true)
            clearInterval(intervalId)
        }
    }, [hours, minutes, seconds])

    return {hours, minutes, seconds, disabled}
};
