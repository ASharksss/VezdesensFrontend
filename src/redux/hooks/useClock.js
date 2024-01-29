import { useEffect, useState } from "react";

const monthsArray = ["янв", "февр", "март", "апр", "май", "июнь", "июль", "авг", "сент", "окт", "нояб", "дек"]

export default function useClock() {
    const [hours, setHours] = useState(null)
    const [minutes, setMinutes] = useState(null)
    const [seconds, setSeconds] = useState(null)
    const [month, setMonth] = useState(null)
    const [day, setDay] = useState(null)


    useEffect(() => {
        setInterval(() => {
            const date = new Date()
            const dateSplit = date.toLocaleTimeString().split(':')
            setHours(dateSplit[0])
            setMinutes(dateSplit[1])
            setSeconds(dateSplit[2])
            setMonth(monthsArray[date.getMonth()])
            setDay(date.getDate())
        }, 1000)
    }, [])

    return {hours, minutes, day, month, seconds}
}
