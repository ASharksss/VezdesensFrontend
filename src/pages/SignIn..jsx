import React from 'react';
import './pages.css'
import eyeClose from "../asserts/icons/eye.svg";
import {NavLink} from "react-router-dom";

const SignIn = () => {
	return (
		<div className='auth'>
			<div className="auth_form">
				<h1 className='auth_form-title'>Регистрация</h1>
				<div className="auth_form-inputs">
					<label className='auth_form-label'>ФИО</label>
					<input type="text" placeholder='Введите номер телефона' className='auth_form-input'/>
					<label className='auth_form-label'>Телефон</label>
					<input type="text" placeholder='Введите номер телефона' className='auth_form-input'/>
					<label className='auth_form-label'>Почта</label>
					<input type="email" placeholder='Введите номер телефона' className='auth_form-input'/>
					<label className='auth_form-label'>Пароль</label>
					<div className="auth_form-input">
						<input type="password" placeholder='Введите пароль'/>
						<img src={eyeClose} alt="" className='auth_form-eye'/>
					</div>

					<NavLink to='/auth' className='auth_link'>
						<span className='miss_password'>Уже есть аккаунт?</span>
					</NavLink>
				</div>
				<div className="auth_form-btns">

					<NavLink to='/signin' className='auth_link'>
						<button className='auth_btn login'>Зарегистрироваться</button>
					</NavLink>
				</div>

			</div>
		</div>
	);
};

export default SignIn;