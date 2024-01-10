import React, {useEffect, useRef, useState} from 'react';
import InputMask from 'react-input-mask';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import CreateAdItem from "../components/createAdItem/createAdItem";
import UploadPhotoPremium from "../components/uploadPhoto/uploadPhotoPremium";
import UploadPhotoVip from "../components/uploadPhoto/uploadPhotoVip";
import UploadPhotoStandartPlus from "../components/uploadPhoto/uploadPhotoStandartPlus";
import {fetchBookingInfo, fetchCharacterObjects} from "../redux/slices/adSlice";
import EnterInput from "../ui/characteristicInputs/enterInput";
import SelectInput from "../ui/characteristicInputs/selectInput";
import CheckboxInput from "../ui/characteristicInputs/checkboxInputs";
import {fetchCategory, fetchObjects, fetchSubCategories} from "../redux/slices/categorySlice";
import {DataURIToBlob, numberWithSpaces} from "../utils";
import LoadGIF from '../asserts/load.gif'
import './pages.css'
import BookingCalc from "../components/bookingCalc/bookingCalc";
import UploadImages from '../components/uploadPhoto/UploadImages';

const CreateAdPage = () => {

  const imagesRef = useRef(null)
  let formData = new FormData()
  const navigate = useNavigate()
  const [previewImage, setPreviewImage] = useState(null)
  const [saveImages, setSaveImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [typeAd, setTypeAd] = useState('standart')
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')
  const [addressData, setAddressData] = useState([])
  const [title, setTitle] = useState('')
  const [objectId, setObjectId] = useState(1)
  const [phone, setPhone] = useState('')
  const [phoneShow, setPhoneShow] = useState(1)
  const [price, setPrice] = useState('')
  const [enterValue, setEnterValue] = useState([])
  const [selectValue, setSelectValue] = useState([])
  const [bookingStartDate, setBookingStartDate] = useState(null)
  const [bookingEndDate, setBookingEndDate] = useState(null)
  const [mainImage, setMainImage] = useState('')

  const dispatch = useDispatch()

  const {categories} = useSelector(state => state.categories)
  const {character} = useSelector(state => state.ad)

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

  const handleAddress = async (event) => {
    setAddress(event.target.value)
    if (event.target.value !== '') {
      const {data} = await axios.post('api/position/search', {query: event.target.value})
      setAddressData(data)
    } else {
      setAddressData([])
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (saveImages.length === 0 || (previewImage === null && typeAd !== 'standart'))
      return window.alert('Прикрепите все нужные фотографии')
    const checkImages = checkCorrectImage()
    if (!checkImages) {
      return window.alert('Не все фотографии нужного размера')
    }
    if (typeAd === 'standart' && mainImage === '') {
      imagesRef.current.scrollIntoView({behavior: 'smooth'})
      return window.alert('Выберите основную фотографию')
    }
    setLoading(true)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('address', address)
    formData.append('price', price.replace(/\s+/g, ''))
    formData.append('typeAd', typeAd)
    formData.append('objectId', objectId)
    formData.append('bookingDateStart', new Date(bookingStartDate).toString())
    formData.append('bookingDateEnd', new Date(bookingEndDate).toString())
    formData.append('characteristicsInput', JSON.stringify(enterValue))
    formData.append('characteristicsSelect', JSON.stringify(selectValue))
    if (typeAd !== 'standart') {
      let preview = DataURIToBlob(previewImage.value)
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

  const handlePrice = (value) => {
    if (value.replace(/\s+/g, '') > 1500000000) {
      alert('Значение превышает норму')
    } else {
      const thousandPrice = numberWithSpaces(value.replace(/\s+/g, ''))
      setPrice(thousandPrice)
    }
  }

  const isLoadingCharacter = character.status === 'loading'

  useEffect(() => {
    dispatch(fetchCategory())
    document.title = 'Создание объявления'
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
            <div className="create_ad-category">
              <h2 className='create_ad-category-title'>Категория</h2>

              <select className='create_ad-select' onChange={event => dispatch(fetchSubCategories(event.target.value))}
                      required>
                <option hidden>Выберите категорию</option>
                {
                  categories.items.map((item, index) => (
                    <option key={'category' + index} value={item.id}>{item.name}</option>
                  ))
                }
              </select>
              <select className='create_ad-select' disabled={categories.subCategories.status === 'loading'}
                      onChange={event => dispatch(fetchObjects(event.target.value))} required>
                <option hidden>Выберите подкатегорию</option>
                {
                  categories.subCategories.items.map((item, index) => (
                    <option key={'subCategory' + index} value={item.id}>{item.name}</option>
                  ))
                }
              </select>
              <select className='create_ad-select' disabled={categories.subCategories.objects.status === 'loading'}
                      onChange={event => {
                        setObjectId(parseInt(event.target.value))
                        dispatch(fetchCharacterObjects(event.target.value))
                      }} required>
                <option hidden>Выберите значение</option>
                {
                  categories.subCategories.objects.items.map((item, index) => (
                    <option key={'object' + index} value={item.id}>{item.name}</option>
                  ))
                }
              </select>
            </div>

            {!isLoadingCharacter &&
              <div className="create_ad-character">
                <div className='flex column'>
                  <label className='enter_input-title'>Заголовок</label>
                  <input value={title} onChange={event => setTitle(event.target.value)}
                         type="text" className='enter_input-input' required/>
                </div>
                <div className='flex column'>
                  <label className='enter_input-title'>Цена</label>
                  <input value={price} onChange={event => handlePrice(event.target.value)}
                         type="text" className='enter_input-input' required/>
                </div>
                <h1 className='character-title'>Обязательные характеристики</h1>

                <div className='grid_character'>
                  {character.items.length > 0 &&
                    character.items.map((item, index) => (item['characteristic']['required'] ?
                        <>
                          {item['characteristic']['typeCharacteristic']['name'] === 'enter' &&
                            <EnterInput setEnterValue={setEnterValue} key={'enter' + index} data={item['characteristic']}
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
                            <EnterInput setEnterValue={setEnterValue} key={'enter' + index} data={item['characteristic']}
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



              </div>}

            <div className="create_ad-descr">
              <h1 className='create_ad-descr-title'>Описание</h1>
              <textarea onChange={event => setDescription(event.target.value)}
                        className='create_ad_descr-text' placeholder='Опишите подробнее товар' required></textarea>
            </div>


            <div className="create_ad-size">
              <h2 className='create_ad-size-title'>Размер объявления</h2>
              <CreateAdItem setTypeAd={setTypeAd} typeAd={typeAd} premium={categories.premium} categories={categories}/>
            </div>

            {typeAd !== 'standart' ? <BookingCalc typeAd={typeAd} setBookingEndDate={setBookingEndDate}
                                                  setBookingStartDate={setBookingStartDate}
                                                  bookingDateStart={bookingStartDate}
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
                            mainImage={typeAd === 'standart' ? mainImage : null}
                            setMainImage={typeAd === 'standart' ? setMainImage : null}/>
            </div>

            <div>
              <div className="create_ad-descr address">
                <h1 className='create_ad-descr-title'>Местоположение</h1>
                <input type="text" onChange={handleAddress} value={address}
                       placeholder='Введите адрес' className='create_ad_address' required/>
              </div>
              <div>
                {(addressData.length > 0 && address !== '') ? addressData.map(item => (
                  item.positionStreets ? item.positionStreets.map(itemStreet => (
                    <p onClick={() => setAddress(`${item.name}, ${itemStreet.name}`)}>{item.name}, {itemStreet.name}</p>
                  )) : <p onClick={() => setAddress(item.name + ', ')}>{item.name}</p>
                )) : null}
              </div>
            </div>


            <div className="create_ad-descr">
              <h1 className='create_ad-descr-title'>Контакты</h1>
              <div className="flex mb-40">
                <label htmlFor="" className='create_ad_label'>Телефон</label>
                <div>
                  <InputMask mask="+7(999)999-99-99" type="text" onChange={event => setPhone(event.target.value)}
                             placeholder='Введите номер' className='create_ad_phone' value={phone}/>
                  <form className="flex column created_ad-contact">
                    <div className='flex created_ad-radio'>
                      <input type="radio" id='only_messages' name='only_messages' value={1} checked={phoneShow === 1}
                             onChange={event => setPhoneShow(parseInt(event.target.value))}/>
                      <label htmlFor="only_messages" className='create_ad-contact'>Только сообщения</label>
                    </div>
                    <div className="flex created_ad-radio">
                      <input type="radio" id='only_calls' name='only_calls' value={2} checked={phoneShow === 2}
                             onChange={event => setPhoneShow(parseInt(event.target.value))}/>
                      <label htmlFor="only_calls" className='create_ad-contact'>Только звонки</label>
                    </div>
                    <div className="flex created_ad-radio">
                      <input type="radio" id='messages_and_calls' name='messages_and_calls' value={3}
                             checked={phoneShow === 3}
                             onChange={event => setPhoneShow(parseInt(event.target.value))}/>
                      <label htmlFor="messages_and_calls" className='create_ad-contact'>Звонки и сообщения</label>
                    </div>
                  </form>

                </div>


              </div>


            </div>
            <div className="create_ad_btns">
              <button className='create_ad_btn' type='submit' onClick={handleSubmit} disabled={loading}>
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