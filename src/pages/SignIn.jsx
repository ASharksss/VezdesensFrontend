import React, {useState} from 'react';
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
                    }
                })
        }
    }

    return (
        <div className='auth'>
            <div className="auth_form">
								<NavLink to='/'>
									<button className='auth_btn signup' style={{border: 'none'}}>← На главную</button>
								</NavLink>
                <h1 className='auth_form-title'>Вход</h1>
                <div className="auth_form-inputs" onSubmit={handleSubmit}>
                    <label className='auth_form-label'>Логин</label>
                    <input onChange={handleSetUsername} type="text" placeholder='Введите логин или почту'
                           className='auth_form-input'/>
                    {(errorSubmit && login === '') && <span style={{color: 'red'}}>Поле не заполнено</span>}
                    <label className='auth_form-label'>Пароль</label>
                    <div className="auth_form-input">
                        <input onChange={handleSetPassword} type={!showPassword ? "password" : "text"}
                               placeholder='Введите пароль'/>
                        <img src={!showPassword ? eyeClose : eyeOpen} onClick={handleShowPassword}
                             className='auth_form-eye'/>
                    </div>
                    {(errorSubmit && password === '') && <span style={{color: 'red'}}>Поле не заполнено</span>}
                    {user.status === 'error' && <span style={{color: 'red'}}>{user.errorMsg}</span>}
                    <span className='miss_password'>Забыли пароль?</span>
                </div>
                <div className="auth_form-btns">
                    <button type={'submit'} className='auth_btn signin' onClick={handleSubmit}>Войти</button>
                    <NavLink to='/signup'>
                        <button className='auth_btn signup'>Зарегистрироваться</button>
                    </NavLink>
                </div>

            </div>
        </div>
    );
};

export default SignIn;