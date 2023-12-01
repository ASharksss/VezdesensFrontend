import React, {useEffect, useState} from 'react';
import './bookingCalc.css'
import {useSelector} from "react-redux";

const BookingCalc = ({typeAd}) => {

  const {bookingInfo} = useSelector(state => state.ad)
  const [priceOneDay, setPriceOneDay] = useState()
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const start = new Date(startDate)
  const end = new Date(endDate)
  const [days, setDays] = useState(0)

  const getDays = () => {
    //Переводим в милисекунды
    const diff = end.getTime() - start.getTime();
    // Переводим в дни
    setDays(diff / (1000 * 60 * 60 * 24))
  }

  useEffect(() => {
    getDays()
  }, [start, end])


  return (
    <div className='booking'>
      <div className="flex">
        <div className="booking_startDate flex column">
          <label htmlFor="startDate" className='booking_label'>Дата начала</label>
          <input type="date" id='startDate' className='booking_input'
                 onChange={(e) => setStartDate(e.target.value)}/>
        </div>
        <div className="booking_endDate flex column">
          <label htmlFor="startDate" className='booking_label'>Дата конца</label>
          <input type="date" id='startDate' className='booking_input'
                 onChange={(e) => {
                   setEndDate(e.target.value)
                 }}/>
        </div>
      </div>

      <div className="booking_info flex column">
        <div className='flex items-center booking_info-title'><span className='booking_info-name'>Количество дней: </span>
          <span className='booking_info-text'>{days}</span></div>
        <div className='flex items-center booking_info-title'><span className='booking_info-name'>Стоимость 1 дня: </span>

          {bookingInfo.items.map((item) => {
            return <span className='booking_info-text'>{item.price + ' р'}</span>
          })}

        </div>
        <div className='flex items-center booking_info-title'><span className='booking_info-name'>Общая стоимость: </span>
          <span className='booking_info-text'>
            {
              bookingInfo.items.map((item) => {
                return <span className='booking_info-text'>{item.price*days + ' р'}</span>
              })
            }
          </span>
        </div>

      </div>

    </div>
  );
};

export default BookingCalc;