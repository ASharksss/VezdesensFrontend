import React, {useState, useEffect} from 'react';
import InputMask from 'react-input-mask';
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import './pages.css'
import eyeClose from '../asserts/icons/eyeClose.svg'
import eyeOpen from '../asserts/icons/eyeOpen.svg'
import {fetchRegistration} from "../redux/slices/userSlice";
import {STATIC_HOST} from "../utils";

const SignUp = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [showPassword, setShowPassword] = useState(false)
	const [agree, setAgree] = useState(false)
	const [name, setName] = useState('')
	const [surName, setSurName] = useState('')
	const [login, setLogin] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const handleShowPassword = (event) => {
		setShowPassword(!showPassword)
	}

	const handleSubmit = async (event) => {
		if (!agree) return window.alert('Надо ознакомиться с правилами сайта и принять их');
		event.preventDefault()
		setError('')
		const data = {
			login, name: `${name} ${surName}`, phone, email, password
		}
		dispatch(fetchRegistration(data))
			.then((res) => {
				if (res.error) {
					setError(res.error.message)
				}
				if (res.error === undefined) {
					const pathname = localStorage.getItem('last_path') || '/'
					navigate(pathname)
					window.location.reload()
				}
			})
	}
	useEffect(() => {
		document.title = 'Vezdesens - Регистрация'
	}, [])
	return (
		<div className='auth'>
			<form className="auth_form" onSubmit={handleSubmit}>
				<h1 className='auth_form-title'>Регистрация</h1>
				<div className="auth_form-inputs">
					<label className='auth_form-label'>Фамилия</label>
					<input type="text" placeholder='Введите фамилию' className='auth_form-input' required
								 onChange={event => setSurName(event.target.value)} value={surName}/>
					<label className='auth_form-label'>Имя</label>
					<input type="text" placeholder='Введите имя' className='auth_form-input' required
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
					{error !== '' ? <p style={{color: 'red'}}>{error}</p> : null}

					<NavLink to='/signin' className='auth_link'>
						<span className='miss_password'>Уже есть аккаунт?</span>
					</NavLink>
				</div>
				<div className="auth_form-btns">
					<div className="mb-20 flex">
						<input type="checkbox" id='agreeRules' name='agreeRules'
							   onChange={() => setAgree(prevState => !prevState)}
							   className='mob-input' value={agree}
						/>
						<label htmlFor="agreeRules" className='create_ad-contact'>
							<span>
								Я ознакомился с <Link to={`${STATIC_HOST}/docs/Personal_data_processing_policy_vezdesens.pdf`}
													  target={'_blank'}>политикой обработки данных</Link>
							</span>
						</label>
					</div>
					<button type='submit' className={`auth_btn signin${!agree ? ' disabled' : ''}`} disabled={!agree}>Зарегистрироваться</button>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
