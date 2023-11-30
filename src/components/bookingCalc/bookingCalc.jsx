import React, {useState} from 'react';
import './bookingCalc.css'

const BookingCalc = () => {

  const [sumDate, setSumDate] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()


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
                   setSumDate(new Date(new Date(endDate) - new Date(startDate)).getDay())
                 }}/>
        </div>
      </div>

      <div className="booking_info flex column">
        <div className="flex"><span className='booking_info-title'>Количество дней: </span><span>{endDate}</span></div>
        <div className="flex"><span className='booking_info-title'>Стоимость 1 дня: </span><span></span></div>
        <div className="flex"><span className='booking_info-title'>Общая стоимость: </span><span></span></div>

      </div>

    </div>
  );
};

export default BookingCalc;