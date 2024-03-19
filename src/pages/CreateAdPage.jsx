import React, {useEffect, useRef, useState} from 'react';
import InputMask from 'react-input-mask';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import CreateAdItem from "../components/createAdItem/createAdItem";
import UploadPhotoPremium from "../components/uploadPhoto/uploadPhotoPremium";
import UploadPhotoVip from "../components/uploadPhoto/uploadPhotoVip";
import UploadPhotoStandartPlus from "../components/uploadPhoto/uploadPhotoStandartPlus";
import {fetchBookingInfo, fetchCategoryForCharacter, fetchCharacterObjects} from "../redux/slices/adSlice";
import EnterInput from "../ui/characteristicInputs/enterInput";
import SelectInput from "../ui/characteristicInputs/selectInput";
import CheckboxInput from "../ui/characteristicInputs/checkboxInputs";
import {fetchCategory, fetchObjects, fetchSubCategories, newFetchCategory} from "../redux/slices/categorySlice";
import {DataURIToBlob, numberWithSpaces} from "../utils";
import LoadGIF from '../asserts/load.gif'
import './pages.css'
import BookingCalc from "../components/bookingCalc/bookingCalc";
import UploadImages from '../components/uploadPhoto/UploadImages';
import arrow_icon from "../asserts/icons/arrow_down.svg"
import ModalMain from "../components/modal/modalMain";
import CitiesModal from "../components/Header/CityModal/CitiesModal";

const CreateAdPage = () => {

	const navigate = useNavigate()
	const imagesRef = useRef(null)
	let formData = new FormData()

	const [saveImages, setSaveImages] = useState([])
	const [previewImage, setPreviewImage] = useState(null)
	const [mainImage, setMainImage] = useState('')
	const [loading, setLoading] = useState(false)
	const [typeAd, setTypeAd] = useState('standart')
	const [description, setDescription] = useState('')
	const [address, setAddress] = useState('')
	const [addressData, setAddressData] = useState([])
	const [title, setTitle] = useState('')
	const [objectId, setObjectId] = useState(1)
	const [phoneShow, setPhoneShow] = useState(0)
	const [price, setPrice] = useState('')
	const [enterValue, setEnterValue] = useState([])
	const [selectValue, setSelectValue] = useState([])
	const [bookingStartDate, setBookingStartDate] = useState(null)
	const [bookingEndDate, setBookingEndDate] = useState(null)
	const [position, setPosition] = useState('top')

	const [topic, setTopic] = useState('')
	const [subTopic, setSubTopic] = useState('')
	const [subValueTopic, setSubValueTopic] = useState('')
	const [open, setOpen] = useState(false)
	const [addressOpen, setAddressOpen] = useState(false)
	const [subOpen, setSubOpen] = useState(false)
	const [subValueOpen, setSubValueOpen] = useState(false)

	const rootEl = useRef(null);

	const dispatch = useDispatch()

	const {categories} = useSelector(state => state.categories)
	const {character} = useSelector(state => state.ad)
	const {user} = useSelector(state => state.user)

	const checkCorrectImage = () => {
		saveImages.map(item => {
			if (!item.change) {
				return false
			}
		})
		if (typeAd !== 'standart') {
			return previewImage.change
		} else {
			return true
		}
	}

	// const handleAddress = async (event) => {
	// 	setAddress(event.target.value)
	// 	if (event.target.value !== '') {
	// 		const {data} = await axios.post('api/position/search', {query: event.target.value})
	// 		setAddressData(data)
	// 		setOpen(true);
	// 	} else {
	// 		setAddressData([])
	// 		setOpen(false)
	// 	}
	// }

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (saveImages.length === 0 || (previewImage === null && typeAd !== 'standart'))
			return window.alert('Прикрепите все нужные фотографии')
		const checkImages = checkCorrectImage()
		if (!checkImages) {
			return window.alert('Не все фотографии нужного размера')
		}
		if (mainImage === '') {
			imagesRef.current.scrollIntoView({behavior: 'smooth'})
			return window.alert('Выберите основную фотографию')
		}
		if (!title){
			return window.alert('Отсуствует заговловок')
		}
		if(!topic || !subTopic || !subValueTopic){
			return window.alert('Вы не выбрали категорию или подкатегорию')
		}
		setLoading(true)
		formData.append('title', title)
		formData.append('description', description)
		formData.append('address', address)
		formData.append('price', price.replace(/\s+/g, ''))
		formData.append('typeAd', typeAd)
		formData.append('objectId', objectId)
		formData.append('showPhone', phoneShow)
		formData.append('bookingDateStart', new Date(bookingStartDate).toString())
		formData.append('bookingDateEnd', new Date(bookingEndDate).toString())
		formData.append('characteristicsInput', JSON.stringify(enterValue))
		formData.append('characteristicsSelect', JSON.stringify(selectValue))
		if (typeAd !== 'standart') {
			let commercial = DataURIToBlob(previewImage.value)
			formData.append('commercialImage', commercial)
			let preview = DataURIToBlob(saveImages.filter(item => item.key === mainImage)[0]['value'])
			formData.append('previewImage', preview)
			formData.append('position', position)
		} else {
			let preview = DataURIToBlob(saveImages.filter(item => item.key === mainImage)[0]['value'])
			formData.append('previewImage', preview)
		}
		saveImages.map((item) => {
			let image = DataURIToBlob(item.value)
			formData.append('images', image)
		})
		await axios({
			method: 'post',
			url: 'api/ad/createAd',
			data: formData,
			headers: {"Content-Type": "multipart/form-data"}
		}).then((res) => {
			console.log(res.data)
			if (res.data.status === 403) {
				window.alert(res.data.message)
			} else {
				window.alert('Карточка успешна создана')
				setLoading(false)
				navigate(`/card/${res.data.ad.id}`)
			}
		})
			.catch(err => {
				console.log(err)
				window.alert(err.response.data.message)
			})
		setLoading(false)
	}

	const ChangedTopci = (topic) => {
		setSubTopic('');
		setSubValueTopic('');
	};
	const changedSubTopic = (subTopic) => {
		setSubValueTopic('');
	}

	const handlePrice = (value) => {
		if (value.replace(/\s+/g, '') > 1500000000) {
			alert('Значение превышает норму')
		} else {
			const thousandPrice = numberWithSpaces(value.replace(/\s+/g, ''))
			setPrice(thousandPrice)
		}
	}

	const handleSetAddress = (city, region, district) => {
	  	setAddress(`${district}, ${region}, ${city}`)
		setAddressOpen(false)
	}

	const isLoadingCharacter = character.status === 'loading'

	useEffect(() => {
		dispatch(fetchCategory())
		document.title = 'Создание объявления'
		const onClick = e => rootEl.current.contains(e.target) || setOpen(false) || setSubOpen(false) || setSubValueOpen(false);
  		document.addEventListener('click', onClick);
  		return () => document.removeEventListener('click', onClick);
	}, [])

	useEffect(() => {
		dispatch(fetchBookingInfo(typeAd))
		setPreviewImage(null)
	}, [typeAd])


	return (
		<div>
			<div className="container">
				<div className="create_ad">
					<h1 className='create_ad-title'>Подать объявление</h1>
					<form className="create_ad_wrapper" onSubmit={handleSubmit}>
						<div className="create_ad-category" >
							<h2 className='create_ad-category-title'>Категория</h2>
							{/* Страый селектор  */}
							{/* <select className='create_ad-select' onChange={event => {
								dispatch(newFetchCategory())
								setEnterValue([])
								setSelectValue([])
								dispatch(fetchCategoryForCharacter())
								dispatch(fetchSubCategories(event.target.value))
							}}
											required>
								<option hidden>Выберите категорию</option>
								{
									categories.items.map((item, index) => (
										<option key={'category' + index} value={item.id}>{item.name}</option>
									))
								}
							</select> */}
							<div className='jy-start' ref={rootEl}>
							<div className="Edited_appeal-select" >
								<div className="flex items-center space-between Edited_filter-header w-250 mr-r" onClick={() => setOpen(!open)} required>
                 					{/* Вывожу значние topic  */}
									{topic ? topic.indexOf('/') > 0 ? topic.split('/')[1] : topic : 'Выберите категорию' }
									<img src={arrow_icon} alt=""/>
								</div>
								<div className={ open ? 'block Edited_filter_select-body' : 'filter_select-body-none'}>
										{
										categories.items.map((item, index) => item.id !== 2 && (
										// Предаю значиение item.name после topic присваиваю значиение при клике
										<div className='Edited_filter_select-item' key={'category' + index} value={item.id}
											onClick={() => {
											setTopic(item.name)
											setOpen(!open)
										  ChangedTopci()
											dispatch(newFetchCategory())
											setEnterValue([])
											setSelectValue([])
											dispatch(fetchCategoryForCharacter())
											dispatch(fetchSubCategories(item.id))
											}}>{item.name}</div>
										))
										}
								</div>
							</div>
							{/* <select className='create_ad-select' disabled={categories.subCategories.status === 'loading'}
											onChange={event => {
												dispatch(fetchCategoryForCharacter())
												setEnterValue([])
												setSelectValue([])
												dispatch(fetchObjects(event.target.value))
											}} required>
								<option hidden>Выберите подкатегорию</option>
								{
									categories.subCategories.items.map((item, index) => (
										<option key={'subCategory' + index}
														value={item.id}>{item.name.indexOf('/') > 0 ? item.name.split('/')[1] : item.name}</option>
									))
								}
							</select> */}
							<div className="Edited_appeal-select" >
								<div className="flex items-center space-between Edited_filter-header mr-r" onClick={() => topic ? setSubOpen(!subOpen) : null} required>
                 					{/* Вывожу значние topic  */}
									{subTopic.indexOf('/') > 0 ? subTopic.split('/')[1] : subTopic ? subTopic :'Выберите подкатегорию' }
									<img src={arrow_icon} alt=""/>
								</div>
								<div className={ subOpen ? 'block Edited_filter_select-body' : 'filter_select-body-none'}>
										{
										categories.subCategories.items.map((item, index) => (
										// Предаю значиение item.name после topic присваиваю значиение при клике
										<div className='Edited_filter_select-item' key={'subCategory' + index} value={item.id} onClick={() => {
											setSubTopic(item.name)
											setSubOpen(!subOpen)
											changedSubTopic()
											dispatch(fetchCategoryForCharacter())
											setEnterValue([])
											setSelectValue([])
											dispatch(fetchObjects(item.id))
											}}>{item.name.indexOf('/') > 0 ? item.name.split('/')[1] : item.name}</div>
										))
										}
								</div>

							</div>
							{/*	<select className='create_ad-select' disabled={categories.subCategories.objects.status === 'loading'}
												onChange={event => {
													setObjectId(parseInt(event.target.value))
													setEnterValue([])
													setSelectValue([])
													dispatch(fetchCharacterObjects(event.target.value))
												}} required>
									<option hidden>Выберите значение</option>
									{
										categories.subCategories.objects.items.map((item, index) => (
											<option key={'object' + index} value={item.id}>{item.name.indexOf('/') > 0 ? item.name.split('/')[1] : item.name}</option>
										))
									}
								</select> */}
							<div className="Edited_appeal-select" >
								<div className="flex items-center space-between Edited_filter-header w-250 mr-r" onClick={() => subTopic ?  setSubValueOpen(!subValueOpen) : null} required>
                 					{/* Вывожу значние topic  */}
									<p className='Edited_filter-header-p'>
										{subValueTopic.indexOf('/') > 0 ? subValueTopic.split('/')[1] : subValueTopic ? subValueTopic :'Выберите Значение' }
									</p>
									<img src={arrow_icon} alt=""/>
								</div>
								<div className={ subValueOpen ? 'block Edited_filter_select-body' : 'filter_select-body-none'}>
										{
										categories.subCategories.objects.items.map((item, index) => (
										// Предаю значиение item.name после topic присваиваю значиение при клике
										<div className='Edited_filter_select-item' key={'object' + index} value={item.id} onClick={() => {
											setSubValueTopic(item.name)
											setSubValueOpen(!subValueOpen)
											setObjectId(parseInt(item.id))
											setEnterValue([])
											setSelectValue([])
											dispatch(fetchCharacterObjects(item.id))
											}}>{item.name.indexOf('/') > 0 ? item.name.split('/')[1] : item.name}</div>
										))
										}
								</div>
							</div>
							</div>

						</div>

						<div className="create_ad-character">
							<div className='flex'>
								<div className='flex column'>
									<label className='enter_input-title '>Заголовок</label>
									<input value={title} onChange={event => setTitle(event.target.value)}
												 type="text" className='enter_input-input create_ad-z' maxLength={100} required/>
								</div>
								<div className='flex column ml-20'>
									<label className='enter_input-title'>Цена</label>
									<input value={price} onChange={event => handlePrice(event.target.value)}
												 type="text" className='enter_input-input' required
												 id='numericInput'
												 />
								</div>
							</div>
							{!isLoadingCharacter && <>
								<h1 className='character-title'>Обязательные характеристики</h1>
								<div className='grid_character'>
									{character.items.length > 0 &&
										character.items.map((item, index) => (item['characteristic']['required'] ?
												<>
													{item['characteristic']['typeCharacteristic']['name'] === 'enter' &&
														<EnterInput setEnterValue={setEnterValue} key={'enter' + index}
																				data={item['characteristic']}
																				id={item['characteristicId']} isRequired={true}/>}
													{item['characteristic']['typeCharacteristic']['name'] === 'select' &&
														<SelectInput setSelectValue={setSelectValue} key={'select' + index} isRequired={true}
																				 data={item['characteristic']} id={item['characteristicId']}/>}
													{item['characteristic']['typeCharacteristic']['name'] === 'checkbox' &&
														<CheckboxInput setCheckboxValue={setSelectValue} key={'checkbox' + index} isRequired={true}
																					 data={item['characteristic']} id={item['characteristicId']}/>}
												</> : null
										))
									}
								</div>


								<h1 className='character-title'>Дополнительные характеристики</h1>
								<div className='grid_character'>
									{character.items.length > 0 &&
										character.items.map((item, index) => (!item['characteristic']['required'] ?
												<>
													{item['characteristic']['typeCharacteristic']['name'] === 'enter' &&
														<EnterInput setEnterValue={setEnterValue} key={'enter' + index}
																				data={item['characteristic']}
																				id={item['characteristicId']} isRequired={false}/>}
													{item['characteristic']['typeCharacteristic']['name'] === 'select' &&
														<SelectInput setSelectValue={setSelectValue} key={'select' + index} isRequired={false}
																				 data={item['characteristic']} id={item['characteristicId']}/>}
													{item['characteristic']['typeCharacteristic']['name'] === 'checkbox' &&
														<CheckboxInput setCheckboxValue={setSelectValue} key={'checkbox' + index} isRequired={false}
																					 data={item['characteristic']} id={item['characteristicId']}/>}
												</> : null
										))
									}
								</div>
							</>}

						</div>

						<div className="create_ad-descr">
							<h1 className='create_ad-descr-title'>Описание</h1>
							<p className='create_ad-descr-subtitle'>Вы можете изменять размер блока, потянув за правый нижний угол</p>
							<textarea onChange={event => setDescription(event.target.value)}
												className='create_ad_descr-text' placeholder='Опишите подробнее товар' required></textarea>
						</div>


						<div className="create_ad-size">
							<h2 className='create_ad-size-title'>Размер объявления</h2>
							<CreateAdItem setTypeAd={setTypeAd} typeAd={typeAd}/>
						</div>

						{typeAd !== 'standart' ? <BookingCalc typeAd={typeAd} setBookingEndDate={setBookingEndDate}
															setBookingStartDate={setBookingStartDate} position={position}
															bookingDateStart={bookingStartDate} setPosition={setPosition}
															bookingDateEnd={bookingEndDate}/> : null}

						{typeAd !== '' &&
							<div className="upload_photo">
								<h1 className='upload_photo-h1'>Загрузка фото</h1>
								{/* внутри стандартного расписаны производимые действия */}
								{/* previewImage: null */}
								{
									typeAd === 'premium' ?
										<UploadPhotoPremium editedImage={previewImage} setEditedImage={setPreviewImage}/> :
										typeAd === 'vip' ? <UploadPhotoVip editedImage={previewImage} setEditedImage={setPreviewImage}/> :
											typeAd === 'standartPlus' ?
												<UploadPhotoStandartPlus editedImage={previewImage} setEditedImage={setPreviewImage}/> : null
								}
							</div>}
						<span className='upload_photo-title'>Фото для карточки объявления </span>
						<div ref={imagesRef}>
							<UploadImages cropData={saveImages} setCropData={setSaveImages}
														mainImage={mainImage}
														setMainImage={setMainImage}/>
						</div>

						<div>
							<div className="create_ad-descr address" onClick={() => setAddressOpen(true)}>
								<h1 className='create_ad-descr-title'>Местоположение</h1>
								<input type='text' placeholder='Выберите город' value={address} style={{cursor: 'pointer'}}
									   className='create_ad_address' required
									   onFocus={() => setAddressOpen(true)} />

								{/* {(addressData.length > 0 && address !== '') ? addressData.map(item => (
									item.positionStreets ? item.positionStreets.map(itemStreet => (
										<p onClick={() => setAddress(`${item.name}, ${itemStreet.name}`)}>{item.name}, {itemStreet.name}</p>
									)) : <p onClick={() => setAddress(item.name + ', ')}>{item.name}</p>
								)) : null} */}

								{/*<div className={open ? 'adress-promation' : 'adress-promation ds-none'}>*/}
								{/*{(addressData.length > 0 && address !== '') ? addressData.map(item => (*/}
								{/*	item.positionStreets ? item.positionStreets.map(itemStreet => (*/}
								{/*		<div className='Edited_filter_select-item' onClick={() => {*/}
								{/*			setAddress(`${item.name}, ${itemStreet.name}`)*/}
								{/*			setAddressData([])*/}
								{/*			setOpen(!open)*/}
								{/*		}}>*/}
								{/*		{"г. " + item.name}, {itemStreet.name}*/}
								{/*		</div>*/}
								{/*	))*/}
								{/*	:*/}
								{/*	<div className='Edited_filter_select-item' onClick={() => {*/}
								{/*			setAddress("г. " + item.name + ', ')*/}
								{/*			setAddressData([])*/}
								{/*			setOpen(!open)*/}
								{/*		}}>*/}
								{/*		{item.name}*/}
								{/*	</div>*/}
								{/*)) : null}*/}
								{/*</div>*/}

							</div>
						</div>
						{addressOpen ? <ModalMain activeModal={addressOpen} setActiveModal={setAddressOpen}><CitiesModal handleAddress={handleSetAddress}/></ModalMain> : null}

						<div className="create_ad-descr">
							<h1 className='create_ad-descr-title'>Контакты</h1>
							<div className="flex mb-40">
								<label htmlFor="" className='create_ad_label'>Телефон</label>
								<div>
									<InputMask mask="+7(999)999-99-99" type="text" value={user.items.phone} disabled
														 placeholder='Введите номер' className='create_ad_phone'/>
									<form className="flex column created_ad-contact">
										<div className='flex created_ad-radio'>
											<input type="radio" id='only_messages' name='only_messages' value={2} checked={phoneShow === 2}
														 onChange={event => setPhoneShow(parseInt(event.target.value))}
														 className='mob-input'
														 />
											<label htmlFor="only_messages" className='create_ad-contact'>Только сообщения</label>
										</div>
										<div className="flex created_ad-radio">
											<input type="radio" id='only_calls' name='only_calls' value={1} checked={phoneShow === 1}
														 onChange={event => setPhoneShow(parseInt(event.target.value))}
														 className='mob-input'
														 />
											<label htmlFor="only_calls" className='create_ad-contact'>Только звонки</label>
										</div>
										<div className="flex created_ad-radio">
											<input type="radio" id='messages_and_calls' name='messages_and_calls' value={0}
														 checked={phoneShow === 0}
														 onChange={event => setPhoneShow(parseInt(event.target.value))}
														 className='mob-input'
														 />
											<label htmlFor="messages_and_calls" className='create_ad-contact'>Звонки и сообщения</label>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div className="create_ad_btns">
							<button className='create_ad_btn' type='submit'  disabled={loading}>
								{loading ? <><img src={LoadGIF} width={32} alt={"Отправка"}/> Отправка...</> : 'Разместить'}
							</button>
						</div>

					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateAdPage;
