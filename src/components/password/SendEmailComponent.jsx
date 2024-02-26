import React from 'react';

const SendEmailComponent = ({descriptionStyle, handleSubmit, setEmail, email}) => {
	return (
		<form className="auth_form" onSubmit={handleSubmit}>
			<h1 className='auth_form-title'>Забыли пароль?</h1>
			<div className="auth_form-inputs">
				<p style={descriptionStyle}>Введите почту для получение одноразового кода</p>
				<input onChange={e => setEmail(e.target.value)}
							 value={email} type="email" placeholder='Введите почту'
							 className='auth_form-input' required/>
			</div>
			<div className="auth_form-btns">
				<button type={'submit'} className='auth_btn signin'>Отправить код</button>
			</div>
		</form>
	);
};

export default SendEmailComponent;
