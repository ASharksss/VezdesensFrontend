import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import './bookingCalc.css'

const BookingCalc = ({bookingDateStart, bookingDateEnd, setBookingStartDate, setBookingEndDate}) => {

	const {items} = useSelector(state => state.ad.bookingInfo)

	const start = bookingDateStart !== null ? new Date(bookingDateStart) : null
	const end = bookingDateEnd !== null ? new Date(bookingDateEnd) : null
	const [days, setDays] = useState(0)

	const getDays = () => {
		//Переводим в милисекунды
		const diff = end.getTime() - start.getTime();
		// Переводим в дни
		setDays(diff / (1000 * 60 * 60 * 24) + 1)
	}

	useEffect(() => {
		if(end !== null)
			getDays()
	}, [end])

	return (
		<div className='booking'>
			<div className="flex">
				<div className="booking_startDate flex column">
					<label htmlFor="startDate" className='booking_label'>Дата начала</label>
					<input type="date" id='startDate' className='booking_input'
						onChange={(e) => setBookingStartDate(e.target.value)}/>

					<div className='mt-50'>
						<div className='flex items-center booking_info-title'><span
							className='booking_info-name'>Количество дней:</span></div>
						<div className='flex items-center booking_info-title'><span
							className='booking_info-name'>Стоимость 1 дня:</span></div>
						<div className='flex items-center booking_info-title'><span
							className='booking_info-name'>Общая стоимость: </span></div>
					</div>


				</div>
				<div className="booking_endDate flex column">
					<label htmlFor="startDate" className='booking_label'>Дата конца</label>
					<input type="date" id='startDate' className='booking_input'
						onChange={(e) => setBookingEndDate(e.target.value)}/>
					<div className='mt-50'>
						<span className='booking_info-text'>{bookingDateEnd === null ? 0 :
							<span>{days}</span>}</span>
						<span className='booking_info-text'>{items.length > 0 ? items[0].price : 0 + ' р'}</span>
						<span className='booking_info-text'>{(bookingDateEnd === null && items.length === 0) ? null :
							<span>{items[0].price * days + ' р'}</span>}</span>
					</div>

				</div>
			</div>
			<div className="booking_info flex column">
			</div>
		</div>
	);
};

export default BookingCalc;