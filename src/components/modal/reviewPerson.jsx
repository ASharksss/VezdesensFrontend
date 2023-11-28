import React from 'react';
import review_avatar from '../../asserts/review_avatar.svg'
import './modal.css'
import {formatDate} from "../../utils";

const ReviewPerson = ({data}) => {
	return (
		<div className='review_person'>
			<div className="review_avatar">
				<img src={review_avatar} alt="" className='review_avatar-img'/>
			</div>
			<div className="review_info">
				<span className="review_info-name">{data.user.name}</span>
				<span className="review_date">{formatDate(data.createdAt)}</span>
				<span>звездочки</span>
				<div className='review_text'>
						<span className="review_text-p">
						{data.text}
					</span>
				</div>

			</div>
		</div>
	);
};

export default ReviewPerson;