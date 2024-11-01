import React, {useState, useEffect} from 'react';
import './pages.css'
import eyeClose from '../asserts/icons/eyeClose.svg'
import eyeOpen from '../asserts/icons/eyeOpen.svg'
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogin} from "../redux/slices/userSlice";

const SignIn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)
    const [showPassword, setShowPassword] = useState(false)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [errorSubmit, setErrorSubmit] = useState(false)

    const handleShowPassword = (event) => {
        setShowPassword(!showPassword)
    }

    const handleSetUsername = (event) => {
        if (errorSubmit && password !== '') {
            setErrorSubmit(false)
        }
        setLogin(event.target.value)
    }

    const handleSetPassword = (event) => {
        if (errorSubmit && login !== '') {
            setErrorSubmit(false)
        }
        setPassword(event.target.value)
    }

    const handleSubmit = (event) => {
				event.preventDefault()
				console.log(event)
        if (login === '' || password === '') {
            setErrorSubmit(true)
        } else {
            const data = {
                login: login,
                password: password
            }
            dispatch(fetchLogin(data))
                .then((res) => {
                    if (res.error === undefined) {
                        const pathname = localStorage.getItem('last_path') || '/'
                        navigate(pathname)
                        window.location.reload()
                    }
                })
        }
    }
	useEffect(() => {
		document.title = 'Vezdesens - Вход'
	}, [])

    return (
        <div className='auth'>
            <form className="auth_form" onSubmit={handleSubmit}>
								<NavLink to='/'>
									<button type={'button'} className='auth_back_btn signup' style={{border: 'none'}}>← На главную</button>
								</NavLink>
                <h1 className='auth_form-title'>Вход</h1>
                <div className="auth_form-inputs">
                    <label className='auth_form-label' htmlFor={'username'}>Логин</label>
                    <input onChange={handleSetUsername} type="text" placeholder='Введите логин или почту'
                           className='auth_form-input' id={'username'}/>
                    {(errorSubmit && login === '') && <span style={{color: 'red'}}>Поле не заполнено</span>}
                    <label className='auth_form-label' htmlFor={'password'}>Пароль</label>
                    <div className="auth_form-input">
                        <input onChange={handleSetPassword} type={!showPassword ? "password" : "text"}
                               placeholder='Введите пароль' id={'password'}/>
                        <img src={!showPassword ? eyeClose : eyeOpen} onClick={handleShowPassword}
                             className='auth_form-eye'/>
                    </div>
                    {(errorSubmit && password === '') && <span style={{color: 'red'}}>Поле не заполнено</span>}
                    {user.status === 'error' && <span style={{color: 'red'}}>{user.errorMsg}</span>}
                    <NavLink className='miss_password' to='/forgot-password'>
                        Забыли пароль?
                    </NavLink>
                </div>
                <div className="auth_form-btns">
                    <button type={'submit'} className='auth_btn signin' onClick={handleSubmit}>Войти</button>
                    <NavLink to='/signup'>
                        <button type={'button'} className='auth_btn signup'>Зарегистрироваться</button>
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export default SignIn;
