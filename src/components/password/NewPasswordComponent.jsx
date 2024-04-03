import React, {useState} from 'react';
import eyeClose from "../../asserts/icons/eyeClose.svg";
import eyeOpen from "../../asserts/icons/eyeOpen.svg";

const NewPasswordComponent = ({setPassword, setRepeatPassword, repeatPassword, password, handleSubmit}) => {
	const [showPassword, setShowPassword] = useState(false)
	const [showRepeatPassword, setShowRepeatPassword] = useState(false)
	const handleShowPassword = () => setShowPassword(!showPassword)
	const handleShowRepeatPassword = () => setShowRepeatPassword(!showRepeatPassword)
	return (
		<form className="auth_form" onSubmit={handleSubmit}>
			<h1 className='auth_form-title'>Новый пароль</h1>
			<div className="auth_form-inputs">
				<p>Придумайте новый пароль для входа</p>
				<div className="auth_form-input">
					<input onChange={(e) => setPassword(e.target.value)} type={!showPassword ? "password" : "text"}
								 placeholder='Введите новый пароль' value={password}/>
					<img src={!showPassword ? eyeClose : eyeOpen} onClick={handleShowPassword}
							 className='auth_form-eye'/>
				</div>
				<div className="auth_form-input">
					<input onChange={(e) => setRepeatPassword(e.target.value)} type={!showRepeatPassword ? "password" : "text"}
								 placeholder='Введите новый пароль' value={repeatPassword}/>
					<img src={!showRepeatPassword ? eyeClose : eyeOpen} onClick={handleShowRepeatPassword}
							 className='auth_form-eye'/>
				</div>
			</div>
			<div className="auth_form-btns">
				<button type={'submit'} className='auth_btn signin'>Отправить код</button>
			</div>
		</form>
	);
};

export default NewPasswordComponent;
