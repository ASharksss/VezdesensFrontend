import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import './bookingCalc.css'
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import axios from "axios";

const BookingCalc = ({bookingDateStart, bookingDateEnd, setBookingStartDate, setBookingEndDate, typeAd, position, setPosition}) => {

	const {items} = useSelector(state => state.ad.bookingInfo)

	const start = bookingDateStart !== null ? new Date(bookingDateStart) : null
	const end = bookingDateEnd !== null ? new Date(bookingDateEnd) : null
	const [days, setDays] = useState(0)
	const [loading, setLoading] = useState(false)
	const [valueDate, setValueDate] = useState(null)
	const [bookedDate, setBookedDate] = useState([])

	const getDateByPosition = async() => {
		await axios.get(`api/ad/getPremiumDate?position=${position}`)
			.then(res => {
				setBookedDate(res.data)
				setValueDate(null)
				setLoading(false)
			})
	}

	useEffect(() => {
		if (typeAd === 'premium') {
			setLoading(true)
			getDateByPosition()
		} else {
			setBookedDate([])
		}
	}, [position])

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
					<select className='mb-20' onChange={event => setPosition(event.target.value)}>
						<option value="top">Верхний банер</option>
						<option value="bottom">Нижний банер</option>
					</select>
					<label htmlFor="startDate" className='booking_label'>Выберите дату</label>
					{!loading ?<Calendar
						onChange={setValueDate}
						value={valueDate}
						tileDisabled={({ activeStartDate, date, view }) => {
							const clonedDate = new Date(date);
							clonedDate.setHours(0, 0, 0, 0);
							return bookedDate.some(item => {
								const startDate = new Date(item.dateStart).setHours(0,0,0,0);
								const endDate = new Date(item.dateEnd).setHours(0,0,0,0);
								return currentDate > clonedDate || (typeAd === 'premium' && (startDate <= clonedDate && clonedDate <= endDate));
							});
						}}
						allowPartialRange
						selectRange
					/> :
						<div>
							<p>Календарь прогружается</p>
						</div>}
				</div>
				<div className="booking_endDate flex column">
					<div className='mt-50'>
						<label className='label_calc'>Количество дней</label>
						<span className='booking_info-text'>{bookingDateEnd === null ? 0 :
							<span>{days}</span>}</span>
						<label className='label_calc'>Стоимость 1 дня</label>
						<span className='booking_info-text'>{items.length > 0 ? items[0].price : 0 } р</span>
						<label className='label_calc'>Общая сумма</label>
						<span className='booking_info-text'>{(bookingDateEnd === null && items.length === 0) ? null :
							<span>{items[0].price * days + ' р'}</span>}</span>
					</div>

				</div>
			</div>

		</div>
	);
};

export default BookingCalc;
