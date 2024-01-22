import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import './bookingCalc.css'
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const booked = [{start: '2024-01-23T00:00:00.000', end: '2024-01-25T00:00:00.000'}, {start: '2024-01-31T00:00:00.000', end: '2024-02-12T00:00:00.000'}]

const BookingCalc = ({bookingDateStart, bookingDateEnd, setBookingStartDate, setBookingEndDate}) => {

	const {items} = useSelector(state => state.ad.bookingInfo)

	const start = bookingDateStart !== null ? new Date(bookingDateStart) : null
	const end = bookingDateEnd !== null ? new Date(bookingDateEnd) : null
	const [days, setDays] = useState(0)
	const [valueDate, setValueDate] = useState(null)

	useEffect(() => {
		if (valueDate !== null) {
			setBookingStartDate(valueDate[0] !== null ? valueDate[0] : null)
			setBookingEndDate(valueDate[1] !== null ? valueDate[1] : null)
		}
	}, [valueDate])

	const currentDate = new Date().setHours(0,0,0,0)
	const getDays = () => {
		//Переводим в милисекунды
		const diff = end.getTime() - start.getTime();
		// Переводим в дни
		setDays(Math.floor(diff / (1000 * 60 * 60 * 24)))
	}

	useEffect(() => {
		if(end !== null)
			getDays()
	}, [end])

	return (
		<div className='booking'>
			<h1 className='booking-title'>Бронирование рекламного баннера</h1>
			<div className="flex">
				<div className="booking_startDate flex column">
					<label htmlFor="startDate" className='booking_label'>Выберите дату</label>
					<Calendar
						onChange={setValueDate}
						value={valueDate}
						tileDisabled={({ activeStartDate, date, view }) => {
							const clonedDate = new Date(date);
							clonedDate.setHours(0, 0, 0, 0);
							return booked.some(item => {
								const startDate = new Date(item.start);
								const endDate = new Date(item.end);
								return currentDate > clonedDate || (startDate <= clonedDate && clonedDate <= endDate);
							});
						}}
						allowPartialRange
						selectRange
					/>

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
					<div className='mt-50'>
						<span className='booking_info-text'>{bookingDateEnd === null ? 0 :
							<span>{days}</span>}</span>
						<span className='booking_info-text'>{items.length > 0 ? items[0].price : 0 + ' р'}</span>
						<span className='booking_info-text'>{(bookingDateEnd === null && items.length === 0) ? null :
							<span>{items[0].price * days + ' р'}</span>}</span>
					</div>

				</div>
			</div>

		</div>
	);
};

export default BookingCalc;