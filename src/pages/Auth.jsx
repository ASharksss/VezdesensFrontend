import React from 'react';
import './pages.css'
import eyeClose from '../asserts/icons/eye.svg'
import {NavLink} from "react-router-dom";

const Auth = () => {
	return (
		<div className='auth'>
			<div className="auth_form">
				<h1 className='auth_form-title'>Вход</h1>
				<div className="auth_form-inputs">
					<label className='auth_form-label'>Телефон</label>
					<input type="text" placeholder='Введите номер телефона' className='auth_form-input'/>
					<label className='auth_form-label'>Пароль</label>
					<div className="auth_form-input">
						<input type="password" placeholder='Введите пароль' />
						<img src={eyeClose} alt="" className='auth_form-eye'/>
					</div>

					<span className='miss_password'>Забыли пароль?</span>
				</div>
				<div className="auth_form-btns">
					<button className='auth_btn login'>Войти</button>
					<NavLink to='/signin'>
						<button className='auth_btn signin'>Зарегистрироваться</button>
					</NavLink>
				</div>

			</div>
		</div>
	);
};

export default Auth;