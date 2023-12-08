import React, {useEffect, useState} from 'react';
import InputMask from 'react-input-mask';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import CreateAdItem from "../components/createAdItem/createAdItem";
import UploadPhotoPremium from "../components/uploadPhoto/uploadPhotoPremium";
import UploadPhotoVip from "../components/uploadPhoto/uploadPhotoVip";
import UploadPhotoStandartPlus from "../components/uploadPhoto/uploadPhotoStandartPlus";
import UploadPhotoStandart from "../components/uploadPhoto/uploadPhotoStandart";
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

  let formData = new FormData()
  const navigate = useNavigate()
  const [previewImage, setPreviewImage] = useState(null)
  const [saveImages, setSaveImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [typeAd, setTypeAd] = useState('standart')
  const [description, setDescription] = useState('')
  const [geolocation, setGeolocation] = useState('')
  const [title, setTitle] = useState('')
  const [objectId, setObjectId] = useState(1)
  const [phone, setPhone] = useState('')
  const [price, setPrice] = useState('')
  const [enterValue, setEnterValue] = useState([])
  const [selectValue, setSelectValue] = useState([])
  const [bookingStartDate, setBookingStartDate] = useState(null)
  const [bookingEndDate, setBookingEndDate] = useState(null)

  const dispatch = useDispatch()

  const {categories} = useSelector(state => state.categories)
  const {character} = useSelector(state => state.ad)

  const checkCorrectImage = () => {
    saveImages.map(item => {
      if(!item.change) {
        return false
      }
    })
    return previewImage.change
  }

  const handleSubmit = async () => {
    if(saveImages.length === 0 || previewImage === null)
      return window.alert('Прикрепите все нужные фотографии')
    const checkImages = checkCorrectImage()
    if (!checkImages) {
      return window.alert('Не все фотографии нужного размера')
    }
    setLoading(true)
    const date = new Date()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('address', geolocation)
    formData.append('price', price.replace(/\s+/g, ''))
    formData.append('typeAd', typeAd)
    formData.append('objectId', objectId)
    formData.append('bookingDateStart', new Date(bookingStartDate).toString())
    formData.append('bookingDateEnd', new Date(bookingEndDate).toString())
    formData.append('characteristicsInput', JSON.stringify(enterValue))
    formData.append('characteristicsSelect', JSON.stringify(selectValue))
    let preview = DataURIToBlob(previewImage.value)
    formData.append('previewImage', preview)
    saveImages.map((item) => {
      let image = DataURIToBlob(item.value)
      formData.append('images', image)
    })
    for (const value of formData.values()) {
      console.log(value);
    }
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
      window.alert('Ooops')
      console.log(err)
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
          <div className="create_ad_wrapper">
            <div className="create_ad-category">
              <h2 className='create_ad-category-title'>Категория</h2>

              <select className='create_ad-select' onChange={event => dispatch(fetchSubCategories(event.target.value))}>
                <option hidden>Выберите категорию</option>
                {
                  categories.items.map((item, index) => (
                    <option key={'category' + index} value={item.id}>{item.name}</option>
                  ))
                }
              </select>
              <select className='create_ad-select' disabled={categories.subCategories.status === 'loading'}
                      onChange={event => dispatch(fetchObjects(event.target.value))}>
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
                      }}>
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

                <h1 className='character-title'>Обязательные характеристики</h1>
                <div className='flex column'>
                  <label className='enter_input-title'>Заголовок</label>
                  <input value={title} onChange={event => setTitle(event.target.value)}
                         type="text" className='enter_input-input'/>
                </div>
                <div className='flex column'>
                  <label className='enter_input-title'>Цена</label>
                  <input value={price} onChange={event => handlePrice(event.target.value)}
                         type="text" className='enter_input-input'/>
                </div>
                {character.items.length > 0 &&
                  character.items.map((item, index) => (
                    <>
                      {item['characteristic']['typeCharacteristic']['name'] === 'enter' &&
                        <EnterInput setEnterValue={setEnterValue} key={'enter' + index} data={item['characteristic']}
                                    id={item['characteristicId']}/>}
                      {item['characteristic']['typeCharacteristic']['name'] === 'select' &&
                        <SelectInput setSelectValue={setSelectValue} key={'select' + index}
                                     data={item['characteristic']} id={item['characteristicId']}/>}
                      {item['characteristic']['typeCharacteristic']['name'] === 'checkbox' &&
                        <CheckboxInput setCheckboxValue={setSelectValue} key={'checkbox' + index}
                                       data={item['characteristic']} id={item['characteristicId']}/>}
                    </>
                  ))
                }

                <h1 className='character-title'>Дополнительные характеристики</h1>


              </div>}

            <div className="create_ad-descr">
              <h1 className='create_ad-descr-title'>Описание</h1>
              <textarea onChange={event => setDescription(event.target.value)}
                        className='create_ad_descr-text' placeholder='Опишите подробнее товар'></textarea>
            </div>


            <div className="create_ad-size">
              <h2 className='create_ad-size-title'>Размер объявления</h2>
              <CreateAdItem setTypeAd={setTypeAd} typeAd={typeAd} premium={categories.premium} categories={categories}/>
            </div>

            {typeAd !== 'standart' ? <BookingCalc typeAd={typeAd} setBookingEndDate={setBookingEndDate}
                         setBookingStartDate={setBookingStartDate}
                        bookingDateStart={bookingStartDate} bookingDateEnd={bookingEndDate}/> : null}
            
            {typeAd !== '' &&
              <div className="upload_photo">
                <h1 className='upload_photo-h1'>Загрузка фото</h1>
					      {/* внутри стандартного расписаны производимые действия */}
					      {/* previewImage: null */}
                {
                  typeAd === 'premium' ? <UploadPhotoPremium editedImage={previewImage} setEditedImage={setPreviewImage}/> :
                    typeAd === 'vip' ? <UploadPhotoVip editedImage={previewImage} setEditedImage={setPreviewImage}/> :
                      typeAd === 'standartPlus' ? <UploadPhotoStandartPlus editedImage={previewImage} setEditedImage={setPreviewImage}/> :
                        typeAd === 'standart' ? <UploadPhotoStandart editedImage={previewImage} setEditedImage={setPreviewImage}/> : null
                }
              </div>}

            <UploadImages cropData={saveImages} setCropData={setSaveImages}/>

            <div className="create_ad-descr">
              <h1 className='create_ad-descr-title'>Местоположение</h1>
              <input type="text" onChange={event => setGeolocation(event.target.value)}
                     placeholder='Введите адрес' className='create_ad_address'/>
            </div>


            <div className="create_ad-descr">
              <h1 className='create_ad-descr-title'>Контакты</h1>
              <div className="flex mb-40">
                <label htmlFor="" className='create_ad_label'>Телефон</label>
                <div>
                  <InputMask mask="+7(999)999-99-99" type="text" onChange={event => setPhone(event.target.value)}
                             placeholder='Введите номер' className='create_ad_phone' value={phone}/>
                  <form className="flex column created_ad-contact">
                    <div className='flex created_ad-radio' >
                      <input type="radio" id='only_messages' name='only_messages'/>
                      <label htmlFor="only_messages" className='create_ad-contact'>Только сообщения</label>
                    </div>
                    <div className="flex created_ad-radio">
                      <input type="radio" id='only_calls' name='only_calls'/>
                      <label htmlFor="only_calls" className='create_ad-contact'>Только звонки</label>
                    </div>
                    <div className="flex created_ad-radio">
                      <input type="radio" id='messages_and_calls' name='messages_and_calls'/>
                      <label htmlFor="messages_and_calls" className='create_ad-contact'>Звонки и сообщения</label>
                    </div>
                  </form>

                </div>


              </div>


            </div>
            <div className="create_ad_btns">
              <button className='create_ad_btn' onClick={() => handleSubmit()} disabled={loading}>
                {loading ? <><img src={LoadGIF} width={32} alt={"Отправка"}/> Отправка...</> : 'Разместить'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAdPage;