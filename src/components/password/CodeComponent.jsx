import React, {useEffect, useState} from 'react';

const CodeComponent = ({descriptionStyle, setCode, code, handleSubmit, handleAgain}) => {
	const [seconds, setSeconds] = useState(5 * 60);
	let timer

	useEffect(() => {
		timer = setInterval(() => {
			setSeconds(prevSeconds => prevSeconds - 3);
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		if (seconds <= 0) {
			clearInterval(timer)
		}
	}, [seconds])

	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;

	return (
		<form className="auth_form" onSubmit={handleSubmit}>
			<h1 className='auth_form-title'>Введите код</h1>
			<div className="auth_form-inputs">
				<p style={descriptionStyle}>Пожалуйста, проверьте Вашу почту и введите код подтверждения</p>
				<input onChange={e => setCode(e.target.value)}
							 value={code} type="text" placeholder='Введите код'
							 className='auth_form-input' required/>
			</div>
			<div className='flex jy-end'>
				{seconds === 0 ? <button type='button' style={buttonStyle}
				onClick={handleAgain}>Отправить ещё раз</button> :
				<span>{minutes}:{remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}</span>}
			</div>
			<div className="auth_form-btns">
				<button type={'submit'} className='auth_btn signin'>Подтвердить</button>
			</div>
		</form>
	);
};

const buttonStyle = {
	fontFamily: 'Open Sans',
	fontSize: 14,
	fontWeight: 600,
	letterSpacing: '-0.01em',
	textAlign: 'left'

}

export default CodeComponent;
