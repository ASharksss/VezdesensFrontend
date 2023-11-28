import React from 'react';
import cardImg from '../../asserts/cardImg.png';
import Rating from "../../ui/rating/rating";
import StarComponent from "../../ui/rating/starComponent";

const statusBar = {
	"--height": "25px",
	"--fill-color": "#B5B7BD",
	"--fill-color2": "black",
	"--size": "100%",
	height: "5px",
	width: "50%",
	color: 'transparent',
	backgroundColor: "#eaeaea",
	borderRadius: "calc(var(--height) / 2)",
	borderTopRightRadius: "0",
	borderBottomRightRadius: "0",
	margin: '10px 25px',
	backgroundImage:
		"linear-gradient(to right, var(--fill-color) calc(var(--size, 100%) - calc(var(--height, 25px) / 2)), transparent 1%)"
};

const RatingModal = ({data}) => {
	if (data === undefined) {
		return <p>Loading...</p>
	}
	const statusBarFive = {
		...statusBar,
		"--size": `${Math.floor(data.filter(item => item.grade === 5).length / (data.length / 100))}%`
	};
	const statusBarFour = {
		...statusBar,
		"--size": `${Math.floor(data.filter(item => item.grade === 4).length / (data.length / 100))}%`
	};
	const statusBarThree = {
		...statusBar,
		"--size": `${Math.floor(data.filter(item => item.grade === 3).length / (data.length / 100))}%`
	};
	const statusBarTwo = {
		...statusBar,
		"--size": `${Math.floor(data.filter(item => item.grade === 2).length / (data.length / 100))}%`
	};
	const statusBarOne = {
		...statusBar,
		"--size": `${Math.floor(data.filter(item => item.grade === 1).length / (data.length / 100))}%`
	};
	return (
		<div className='rating_modal'>
			<h1 className='rating_modal-title'>Отзывы о пользователе</h1>
			<div className='rating_modal-text'>
				<Rating type='ratings' data={data}/>
				<div style={{marginTop: '10px'}}>
					<div style={{display: 'flex', marginTop: '10px'}}>
						<StarComponent average={5}/>
						<span style={statusBarFive}>5</span>
						<span style={{color: '#B5B7BD'}}>{data.filter(item => item.grade === 5).length}</span>
					</div>
					<div style={{display: 'flex', marginTop: '10px'}}>
						<StarComponent average={4}/>
						<span style={statusBarFour}></span>
						<span style={{color: '#B5B7BD'}}>{data.filter(item => item.grade === 4).length}</span>
					</div>
					<div style={{display: 'flex', marginTop: '10px'}}>
						<StarComponent average={3}/>
						<span style={statusBarThree}></span>
						<span style={{color: '#B5B7BD'}}>{data.filter(item => item.grade === 3).length}</span>
					</div>
					<div style={{display: 'flex', marginTop: '10px'}}>
						<StarComponent average={2}/>
						<span style={statusBarTwo}></span>
						<span style={{color: '#B5B7BD'}}>{data.filter(item => item.grade === 2).length}</span>
					</div>
					<div style={{display: 'flex', marginTop: '10px'}}>
						<StarComponent average={1}/>
						<span style={statusBarOne}></span>
						<span style={{color: '#B5B7BD'}}>{data.filter(item => item.grade === 1).length}</span>
					</div>
				</div>
				<div style={{display: 'flex', marginTop: '20px'}}>
					<p>{data.length} отзывов</p>
				</div>
				<div>
					{data.map((item, index) =>
						<div className='flex' key={`card-${index}=${item.id}`}>
							<p>{item.text}</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default RatingModal;