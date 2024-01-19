import React from 'react';
import {NavLink} from "react-router-dom";
import './modal.css'
import {AVATAR_HOST, formatDate} from "../../utils";
import StarComponent from "../../ui/rating/starComponent";

const ReviewPerson = ({data}) => {
	return (
		<div className='review_person'>
			<div className="review_avatar">
				<img src={`${AVATAR_HOST}/${data.user.userAvatars[0]?.name}`} style={{borderRadius: '50%'}} alt="" className='review_avatar-img'/>
			</div>
			<div className="review_info">
				<NavLink to={`/profile/${data.user.id}`} className="review_info-name">{data.user.name}</NavLink>
				<span className="review_date">{formatDate(data.createdAt)}</span>
				<StarComponent average={data.grade}/>
				<div className='review_text'>
						<span className="review_text-p" style={{whiteSpace: 'pre-line'}}>
						{data.text}
					</span>
				</div>

			</div>
		</div>
	);
};

export default ReviewPerson;