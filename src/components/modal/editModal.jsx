import React, {useEffect, useRef, useState} from 'react';
import InputMask from 'react-input-mask';
import axios from "axios";
import AvatarEditor from 'react-avatar-editor'
import avatar from '../../asserts/profile/default_avatar.svg'
import loadGif from '../../asserts/load.gif'
import {AVATAR_HOST, DataURIToBlob} from "../../utils";

const EditModal = ({data}) => {
	const formData = new FormData();
	const editImageRef = useRef(null)
	const [image, setImage] = useState(null)
	const [name, setName] = useState(data.name.split(' ')[0])
	const [surname, setSurname] = useState(data.name.split(' ')[1] !== undefined ? data.name.split(' ')[1] : '')
	const [email, setEmail] = useState(data.email)
	const [phone, setPhone] = useState(data.phone)
	const [saveImage, setSaveImage] = useState(null)
	const [scale, setScale] = useState(1)
	const [rotate, setRotate] = useState(0)
	const [editImageShow, setEditImageShow] = useState(false)
	const [loadingPostData, setLoadingPostData] = useState(false)

	useEffect(() => {
		if (rotate === 360)
			setRotate(0)
	}, [rotate])

	const toDataURL = name => fetch(`${AVATAR_HOST}/${name}`)
		.then(response => response.blob())
		.then(blob => new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.onloadend = () => resolve(reader.result)
			reader.onerror = reject
			reader.readAsDataURL(blob)
		}))

	useEffect(() => {
		try {
			if (data.userAvatars.length > 0) {
				toDataURL(data.userAvatars[0].name).then(dataUrl => {
					setImage(dataUrl)
					setSaveImage(dataUrl)
				})
			}
		} catch (e) {

		}
	}, [data])

	const handleSaveImage = () => {
		if(editImageRef.current !== null) {
			const canvas = editImageRef.current.getImageScaledToCanvas()
			setSaveImage(canvas.toDataURL())
			setEditImageShow(false)
			setScale(1)
		} else {
			setImage(null)
			setSaveImage(null)
			setScale(1)
			setEditImageShow(false)
		}
	}

	const handleSubmit = async (event) => {
	  event.preventDefault()
		setLoadingPostData(true)
		formData.append('name', `${name.trim()} ${surname.trim()}`)
		formData.append('email', email)
		formData.append('phone', phone)
		if (saveImage !== null) {
			const postImage = DataURIToBlob(saveImage)
			formData.append('avatar', postImage)
		} else {
			formData.append('avatar', saveImage)
		}
		await axios({
			method: 'post',
			url: 'api/user/edit',
			data: formData,
			headers: {"Content-Type": "multipart/form-data"}
		}).then((res) => {
			if (res.data.status === 403) {
				window.alert(res.data.message)
			} else {
				setLoadingPostData(false)
				window.location.reload()
			}
		})
			.catch(err => {
				setLoadingPostData(false)
				console.log(err)
				window.alert(err.response.data.message)
			})
	}

	const handleRemoveImage = () => {
	  setImage(null)
		setSaveImage(null)
		setScale(1)
	}

	const handleUploadImage = (event) => {
		try {
			const file = event.target.files[0]
			const reader = new FileReader()
			reader.onloadend = () => {
				setImage(reader.result)
			}
			reader.readAsDataURL(file)
		} catch (e) {
			console.log(e)
		}
	}

	if (editImageShow) {
		return (
			<div className={'flex column'}>
				{image !== null ?
				<div style={{position: 'relative', backgroundColor: 'rgba(0,0,0,0.7)', display: 'inline-block', padding: 20}}>
					<AvatarEditor
						ref={(editor) => (editImageRef.current = editor)}
						image={image}
						width={250}
						height={250}
						border={50}
						borderRadius={150}
						color={[0, 0, 0, 0.5]} // RGBA
						scale={scale}
						rotate={rotate}
					/>
					<button className={'editModalImage-btn editModalRemove'}
									onClick={handleRemoveImage}>🗑</button>
					<button className={'editModalImage-btn editModalScalePlus'}
									onClick={()=> setScale(scale + 0.1)} disabled={scale >= 1.5}>+</button>
					<button className={'editModalImage-btn editModalScalePlus'}
									onClick={()=> setScale(scale + 0.1)} disabled={scale >= 1.5}>+</button>
					<button className={'editModalImage-btn editModalScaleMinus'}
									onClick={()=> setScale(scale - 0.1)} disabled={scale <= 1}>-</button>
					<button className={'editModalImage-btn editModalRotate'}
									onClick={()=> setRotate(rotate + 90)}>↺</button>
				</div> : <input type={'file'} accept={'image/png, image/jpeg'} onChange={handleUploadImage}/> }
				<div className={'row mt-20'}>
					<button onClick={handleSaveImage}>Сохранить</button>
				</div>
			</div>
		)
	}

  return (
    <form onSubmit={handleSubmit}>
			{loadingPostData ? <div className={'editProfile-loading'}>
				<img style={{position: 'relative', top: 'calc(100% / 2)'}} src={loadGif} width={'60px'} alt="Загрузка"/>
			</div> : null}
			<div className={'flex column'} style={{alignItems: 'center'}}>
				<img src={saveImage !== null ? saveImage : avatar}
						 alt="аватар" className="profile_card-img"/>
				<button className={'mt-20'} onClick={() => setEditImageShow(true)}>Изменить фото</button>
			</div>
			<div className={'flex row mt-20'} style={{textAlign: 'left'}}>
				<div className={'flex column mr-20'}>
					<label className='editProfile-label' htmlFor={'name'}>Имя</label>
					<input value={name} onChange={event => setName(event.target.value)}
								 type="text" id={'name'} className='editProfile-input' required/>
					<label className='editProfile-label' htmlFor={'email'}>Почта</label>
					<input value={email} onChange={event => setEmail(event.target.value)}
								 type="email" id={'email'} className='editProfile-input' required/>
				</div>
				<div className={'flex column'}>
					<label className='editProfile-label' htmlFor={'surName'}>Фамилия</label>
					<input value={surname} onChange={event => setSurname(event.target.value)}
								 type="text" id={'surName'} className='editProfile-input' required/>
					<label className='editProfile-label' htmlFor={'phone'}>Телефон</label>
					<InputMask value={phone} onChange={event => setPhone(event.target.value)}
										 mask="+7(999)999-99-99" id={'phone'} className='editProfile-input' required/>
				</div>
			</div>
			<div className={'flex mt-20'} style={{justifyContent: 'space-evenly'}}>
				<button type={'submit'}>Сохранить</button>
				<button type={'button'}>Отменить</button>
			</div>
    </form>
  );
};

export default EditModal;