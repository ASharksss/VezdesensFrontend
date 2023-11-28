import React from 'react';
import './modal.css'
import back_btn from '../../asserts/icons/back_btn.svg'

const WriteReview = () => {
	return (
		<div className='write_review'>
			<button className='flex items-center back_btn' >
				<img src={back_btn} alt=""/>
				<span className='write_review-btn'>Назад</span>
			</button>

			<div className='write_review-main'>
				<h1 className='write_review-title'>Ваш отзыв о пользователе</h1>
				<div className='flex column'>
					<span className='write_review-subtitle'>Оцените ваши впечатление продавце</span>
					<div className='flex'>
						<span>Звездочки</span>
						<span className='write_review-stars'>Поставьте оценку</span>
					</div>

					<textarea placeholder="Напишите отзыв..." className='write_review-textarea'></textarea>
					<button className='write_review-submit'>Отправить отзыв</button>
				</div>

			</div>

		</div>
	);
};

export default WriteReview;