import React from 'react';
import StarComponent from "./starComponent";


const Rating = ({data = [], type='user'}) => {
    let average
    if (data.length > 0) {
        let ratings = data.map(item => item.grade)
        const sum = ratings.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        average = sum !== 0 ? (sum / ratings.length).toFixed(2) : 0;
    } else {
        average = 0
    }
		if (type === 'user')
			return (
					<div className='flex' style={{alignItems: 'center', justifyContent: 'space-evenly'}}>
							<span style={{fontSize: '1.5rem', fontWeight: 'bolder'}}>{average}</span>
							<StarComponent average={average}/>
							<p className='count_grade'> {data.length} отзыв</p>
					</div>
			);
		else
			return (
				<div className='flex' style={{alignItems: 'center', justifyContent: 'flex-start'}}>
					<span style={{fontSize: '1.5rem', fontWeight: 'bolder'}}>{average}</span>
					<StarComponent average={average}/>
					<div style={{display: 'flex'}}>
						<button>Написать отзыв</button>
					</div>
				</div>
			);
};

export default Rating;