import React from 'react';
import StarComponent from "./starComponent";


const Rating = ({data = [], type = 'user'}) => {
    let average
    if (type === 'user') {
        let ratings = data.map(item => item.grade)
        const sum = ratings.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        average = sum !== 0 ? (sum / ratings.length).toFixed(2) : 0;
    } else {
        average = 0
    }
    return (
        <div className='flex' style={{alignItems: 'center', justifyContent: 'space-evenly'}}>
            <span style={{fontSize: '1.5rem', fontWeight: 'bolder'}}>{average}</span>
            <StarComponent average={average}/>
            <p className='count_grade'> {data.length} отзыв</p>
        </div>
    );
};

export default Rating;