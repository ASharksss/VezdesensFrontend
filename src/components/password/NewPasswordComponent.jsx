import React from 'react';

const NewPasswordComponent = () => {
	return (
		<form className="auth_form" onSubmit={() => {}}>
			<h1 className='auth_form-title'>Забыли пароль?</h1>
			<div className="auth_form-inputs">
				<p>Введите почту для получение одноразового кода</p>
				<input type="text" placeholder='Введите код'
							 className='auth_form-input' required/>
			</div>
			<div className="auth_form-btns">
				<button type={'submit'} className='auth_btn signin'>Отправить код</button>
			</div>
		</form>
	);
};

export default NewPasswordComponent;
