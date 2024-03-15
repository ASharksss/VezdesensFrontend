import React, {useState} from 'react';
import InputMask from 'react-input-mask';
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import './pages.css'
import eyeClose from '../asserts/icons/eyeClose.svg'
import eyeOpen from '../asserts/icons/eyeOpen.svg'
import {fetchRegistrationCompany} from "../redux/slices/userSlice";

const SignUpCompanies = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [inn, setInn] = useState('')
  const [companyName, setCompanyName] = useState('')
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
    event.preventDefault()
    setError('')
    const data = {
      login, name: `${name} ${surName}`, phone, email, password, companyName, inn
    }
    dispatch(fetchRegistrationCompany(data))
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
  return (
    <div className='auth'>
      <form className="auth_form" onSubmit={handleSubmit}>
        <h1 className='auth_form-title'>Регистрация</h1>
        <div className="auth_form-inputs">
          <div className='flex'>
            <div className='reg_company-div'>
              <label className='block auth_form-label'>ИНН</label>
              <input type="text" placeholder='Введите ИНН' className='auth_form-input' required
                     onChange={event => setInn(event.target.value)} value={inn}/>
            </div>
            <div className='reg_company-div'>
              <label className='block auth_form-label'>Наименование компании</label>
              <input type="text" placeholder='Название компании' className='auth_form-input' required disabled
                     onChange={event => setCompanyName(event.target.value)} value={companyName}/>
            </div>
          </div>
          <div className='flex'>
            <div className='reg_company-div'>
              <label className='block auth_form-label'>Фамилия</label>
              <input type="text" placeholder='Введите фамилию' className='auth_form-input' required
                     onChange={event => setSurName(event.target.value)} value={surName}/>
            </div>
            <div className='reg_company-div'>
              <label className='block auth_form-label'>Имя</label>
              <input type="text" placeholder='Введите имя' className='auth_form-input' required
                     onChange={event => setName(event.target.value)} value={name}/>
            </div>
          </div>

          <div className="flex">
            <div className='reg_company-div'>
              <label className='block auth_form-label'>Логин</label>
              <input type="text" placeholder='Введите логин' className='auth_form-input' required
                     onChange={event => setLogin(event.target.value)} value={login}/>
            </div>
            <div className='reg_company-div'>
              <label className='block auth_form-label'>Телефон</label>
              <InputMask mask="+7(999)999-99-99" className='auth_form-input' placeholder='Введите номер телефона' required
                         onChange={event => setPhone(event.target.value)} value={phone}/>
            </div>

          </div>

          <div className="flex">
            <div className='reg_company-div'>
              <label className='block auth_form-label'>Почта</label>
              <input type="email" placeholder='Введите почту' className='auth_form-input' required
                     onChange={event => setEmail(event.target.value)} value={email}/>
            </div>
            <div className='reg_company-div'>
              <label className='block auth_form-label'>Пароль</label>
              <div className="auth_form-input">
                <input type={!showPassword ? "password" : "text"} placeholder='Введите пароль' required
                       onChange={event => setPassword(event.target.value)} value={password}/>
                <img src={!showPassword ? eyeClose : eyeOpen} onClick={handleShowPassword}
                     className='auth_form-eye'/>
              </div>
            </div>

          </div>

          {error !== '' ? <p style={{color: 'red'}}>{error}</p> : null}

          <NavLink to='/signin' className='auth_link'>
            <span className='miss_password'>Уже есть аккаунт?</span>
          </NavLink>
        </div>
        <div className="auth_form-btns">
          <button type='submit' className='auth_btn signin'>Зарегистрироваться</button>
        </div>

      </form>
    </div>
  );
};

export default SignUpCompanies;
