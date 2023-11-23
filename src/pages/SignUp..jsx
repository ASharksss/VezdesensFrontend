import React, {useState} from 'react';
import InputMask from 'react-input-mask';
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import './pages.css'
import eyeClose from '../asserts/icons/eyeClose.svg'
import eyeOpen from '../asserts/icons/eyeOpen.svg'
import {fetchRegistration} from "../redux/slices/userSlice";

const SignUp = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [showPassword, setShowPassword] = useState(false)
	const [name, setName] = useState('')
	const [login, setLogin] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleShowPassword = (event) => {
		setShowPassword(!showPassword)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		const data = {
			login, name, phone, email, password
		}
		dispatch(fetchRegistration(data))
			.then((res) => {
				if (res.error === undefined) {
					const pathname = localStorage.getItem('last_path') || '/'
					navigate(pathname)
				}
			})
	}
	return (
		<div className='auth'>
			<form className="auth_form" onSubmit={handleSubmit}>
				<h1 className='auth_form-title'>Регистрация</h1>
				<div className="auth_form-inputs">
					<label className='auth_form-label'>ФИО</label>
					<input type="text" placeholder='Введите ФИО' className='auth_form-input' required
								 onChange={event => setName(event.target.value)} value={name}/>
					<label className='auth_form-label'>Логин</label>
					<input type="text" placeholder='Введите логин' className='auth_form-input' required
								 onChange={event => setLogin(event.target.value)} value={login}/>
					<label className='auth_form-label'>Телефон</label>
					<InputMask mask="+7(999)999-99-99" className='auth_form-input' placeholder='Введите номер телефона' required
										 onChange={event => setPhone(event.target.value)} value={phone}/>
					<label className='auth_form-label'>Почта</label>
					<input type="email" placeholder='Введите почту' className='auth_form-input' required
								 onChange={event => setEmail(event.target.value)} value={email}/>
					<label className='auth_form-label'>Пароль</label>
					<div className="auth_form-input">
						<input type={!showPassword ? "password" : "text"} placeholder='Введите пароль' required
									 onChange={event => setPassword(event.target.value)} value={password}/>
						<img src={!showPassword ? eyeClose : eyeOpen} onClick={handleShowPassword}
								 className='auth_form-eye'/>
					</div>

					<NavLink to='/auth' className='auth_link'>
						<span className='miss_password'>Уже есть аккаунт?</span>
					</NavLink>
				</div>
				<div className="auth_form-btns">
					<button type='submit' className='auth_btn login'>Зарегистрироваться</button>
				</div>

			</form>
		</div>
	);
};

export default SignUp;