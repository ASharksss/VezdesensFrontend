import React, {useEffect, useState} from 'react';
import './modal.css'
import back_btn from '../../asserts/icons/back_btn.svg'
import StarComponent from "../../ui/rating/starComponent";
import axios from "axios";

const WriteReview = ({userId, setActiveModal, setDataRating}) => {
	const [average, setAverage] = useState(1)
	const [text, setText] = useState('')

	const handleChangeText = (event) => {
	  setText(event.target.value)
	}

	const handleExit = () => {
		setActiveModal(false)
		setText('')
		setAverage(1)
	}

	const handleSubmit = async (event) => {
	  event.preventDefault()
		const data = {
			sellerId: userId,
			text,
			grade: average
		}
		await axios.post('api/user/review', data).then((res) => {
			setDataRating(res.data)
			handleExit()
		})
	}
	const handleChangeStar = (index, type) => {
		switch (type) {
			case 'full':
				setAverage(index + 1)
				break
			case 'empty':
				setAverage(index + 2)
				break
			default:
				break
		}
	}
	return (
		<div className='write_review'>
			<button className='flex items-center back_btn' onClick={handleExit} >
				<img src={back_btn} alt=""/>
				<span className='write_review-btn'>Назад</span>
			</button>

			<div className='write_review-main'>
				<h1 className='write_review-title'>Ваш отзыв о пользователе</h1>
				<form className='flex column' onSubmit={handleSubmit}>
					<span className='write_review-subtitle'>Оцените ваши впечатление продавце</span>
					<div className='flex'>
						<StarComponent average={average} type={'write'} handleClick={handleChangeStar}/>
						<span className='write_review-stars'>Поставьте оценку</span>
					</div>

					<textarea placeholder="Напишите отзыв..." className='write_review-textarea'
										onChange={handleChangeText} required value={text}></textarea>
					<button type={'submit'} className='write_review-submit'>Отправить отзыв</button>
				</form>

			</div>

		</div>
	);
};

export default WriteReview;