import React, {useEffect, useState} from 'react';
import './pages.css'
import PreloaderComponent from "../components/Preloader/PreloaderComponent";
import SendEmailComponent from "../components/password/SendEmailComponent";
import axios from "axios";
import CodeComponent from "../components/password/CodeComponent";
import NewPasswordComponent from "../components/password/NewPasswordComponent";
import {useNavigate} from "react-router-dom";

const ForgotPassword = () => {
	const navigate = useNavigate()

	const [loading, setLoading] = useState(false)
	const [step, setStep] = useState(1)
	const [email, setEmail] = useState('')
	const [code, setCode] = useState('')
	const [error, setError] = useState('')
	const [password, setPassword] = useState('')
	const [repeatPassword, setRepeatPassword] = useState('')

	useEffect(() => {
		document.title = 'Восстановление пароля'
	}, [])

	const handleSendEmail = async (event) => {
		setError('')
		setLoading(true)
		event.preventDefault()
		await axios.post('api/user/password/rebase', {email})
			.then(res => {
				window.alert(res.data.message)
				setLoading(false)
				setStep(2)
			})
			.catch(err => {
				setError(err.response.data.message)
				setLoading(false)
			})
	}

	const handleSendCode = async (event) => {
		setError('')
		setLoading(true)
		event.preventDefault()
		await axios.post('api/user/password/code', {code})
			.then(() => {
				setLoading(false)
				setStep(3)
			})
			.catch(err => {
				setError(err.response.data.message)
				setLoading(false)
			})
	}

	const handleChangePassword = async (event) => {
		event.preventDefault()
		setError('')
		if (password !== repeatPassword) return setError('Пароли не совпадают!');
		setLoading(true)
		await axios.post('api/user/password/change', {code, password})
			.then(res => {
				window.alert(res.data.message)
				setLoading(false)
				navigate('/signin')
			})
			.catch(err => {
				setError(err.response.data.message)
				setLoading(false)
			})
	}

	if (loading)
		return (
			<div style={{display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
				<PreloaderComponent />
			</div>
		)

	return (
		<div className='auth'>
			{step === 1 ?
				<SendEmailComponent descriptionStyle={descriptionStyle} handleSubmit={handleSendEmail} setEmail={setEmail} email={email}/>
				: step === 2 ?
					<CodeComponent code={code} setCode={setCode} handleSubmit={handleSendCode} descriptionStyle={descriptionStyle} handleAgain={handleSendEmail} />
					:
					<NewPasswordComponent setPassword={setPassword} password={password} repeatPassword={repeatPassword} setRepeatPassword={setRepeatPassword} handleSubmit={handleChangePassword}/>
			}
			{error !== '' && <span style={{color: 'red'}}>{error}</span>}
		</div>
	);
};

const descriptionStyle = {
	fontFamily: 'Open Sans',
	fontSize: 14,
	fontWeight: 400,
	width: 340,
	letterSpacing: '0em',
	textAlign: 'left'
}

export default ForgotPassword;
