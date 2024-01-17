import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {v4 as uuidv4} from 'uuid';
import EnterInput from "../ui/characteristicInputs/enterInput";
import SelectInput from "../ui/characteristicInputs/selectInput";
import CheckboxInput from "../ui/characteristicInputs/checkboxInputs";
import UploadImages from "../components/uploadPhoto/UploadImages";
import {DataURIToBlob, numberWithSpaces, STATIC_HOST} from "../utils";
import LoadGIF from "../asserts/load.gif";
import UploadPhotoPremium from "../components/uploadPhoto/uploadPhotoPremium";
import UploadPhotoVip from "../components/uploadPhoto/uploadPhotoVip";
import UploadPhotoStandartPlus from "../components/uploadPhoto/uploadPhotoStandartPlus";

const CardEditPage = () => {
  const navigate = useNavigate()
  let formData = new FormData()
  const [cardData, setCardData] = useState({})
  const [saveImages, setSaveImages] = useState([])
  const [previewImage, setPreviewImage] = useState('')
  const [mainImage, setMainImage] = useState(null)
  const [exception, setException] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingPage, setLoadingPage] = useState(false)
  const [characteristicData, setCharacteristicData] = useState([])
  const [adCharacteristic, setAdCharacteristic] = useState([])
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [enterValue, setEnterValue] = useState([])
  const [selectValue, setSelectValue] = useState([])
  const {id} = useParams()
  const handleGetInfo = async () => {
    setLoadingPage(true)
    await axios.get(`api/ad/getEditAd/${id}`)
      .then(res => {
        setCardData(res.data)
        setTitle(res.data.title)
        setDescription(res.data.description)
        setPrice(numberWithSpaces(res.data.price))
        setCharacteristicData(res.data.object.characteristicObjects)
        setAdCharacteristic([res.data.adCharacteristicInputs, res.data.adCharacteristicSelects])
        return res.data
      })
      .catch(err => {
        setException(true)
        setLoadingPage(false)
      })
  }

  const handlePrice = (value) => {
    if (value.replace(/\s+/g, '') > 1500000000) {
      alert('Значение превышает норму')
    } else {
      const thousandPrice = numberWithSpaces(value.replace(/\s+/g, ''))
      setPrice(thousandPrice)
    }
  }

  const toDataURL = name => fetch(`${STATIC_HOST}/${name}`)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    }))

  useEffect(() => {
    if (adCharacteristic.length > 0) {
      const timeArray = characteristicData
      const groupByCharacteristicId = adCharacteristic[1].reduce((acc, {characteristic, characteristicValue}) => {
        const id = characteristic.id;
        const valueId = characteristicValue.id;
        if (!acc[id]) {
          acc[id] = [];
        }
        acc[id].push(valueId);
        return acc;
      }, {});
      timeArray.map((state) => {
        adCharacteristic[0].map(item => {
          if (item.characteristic.id === state.characteristicId) {
            state['value'] = item.value
          }
        })
        Object.keys(groupByCharacteristicId).forEach(function (key, value) {
          if (parseInt(key) === state.characteristicId) {
            if (state.characteristic.typeCharacteristic.name === 'select')
              state['value'] = groupByCharacteristicId[key][0]
            else
              state['value'] = groupByCharacteristicId[key]
          }
        });
      })
      setCharacteristicData(timeArray)
      setLoadingPage(false)
      cardData.imageAds.map(item => {
        toDataURL(item.name).then(async dataUrl => {
          const v4Key = uuidv4()
          setSaveImages(prevState => [...prevState, {key: v4Key, value: dataUrl}])
        })
      })
      if (cardData.typeAdId !== 1)
        cardData.previewImageAds.length > 0 && cardData.previewImageAds.map(item => {
          toDataURL(item.name).then(dataUrl => {
            setPreviewImage({change:false, value: dataUrl})
          })
        })
    }
  }, [adCharacteristic])

  useEffect(() => {
    if (saveImages.length > 0) {
      if (cardData.typeAdId === 1) {
        let imageValue = undefined
        cardData.previewImageAds.length > 0 && cardData.previewImageAds.map(item => {
          toDataURL(item.name).then(dataUrl => {
            imageValue = dataUrl
          })
        })
        console.log(imageValue)
      }
    }
  }, [saveImages])

  useEffect(() => {
    document.title = `Редактирование`
    handleGetInfo()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('price', price.replace(/\s+/g, ''))
    formData.append('characteristicsInput', JSON.stringify(enterValue))
    formData.append('characteristicsSelect', JSON.stringify(selectValue))
    if (cardData.typeAdId !== 1) {
      let preview = DataURIToBlob(previewImage.value)
      formData.append('previewImage', preview)
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
      url: 'api/ad/editAd/' + id,
      data: formData,
      headers: {"Content-Type": "multipart/form-data"}
    }).then((res) => {
      if (res.data.status === 403) {
        window.alert(res.data.message)
      } else {
        setLoading(false)
        navigate(`/card/${id}`)
        window.location.reload()
      }
    })
      .catch(err => {
        console.log(err)
        window.alert(err.response.data.message)
      })
    setLoading(false)
  }

  if (loadingPage) {
    return (
      <div className={'container'}>
        <p>Загрузка данных...</p>
      </div>
    )
  }

  if (exception) {
    return (
      <div className={'container'}>
        <p>Нет доступа к редактированию карточки</p>
      </div>
    )
  }

  return (
    <div className='container'>
      <div className='create_ad'>
        <h1 className='create_ad-title'>Редактирование объявления</h1>
        <form className="create_ad_wrapper" onSubmit={handleSubmit}>

          <div className="create_ad-character">
            <div className="flex column ">
              <h1 className='character-title'>Основные характеристики</h1>
              <div className="grid character_grid">
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
                {characteristicData.length > 0 &&
                  characteristicData.map((item, index) => (item['characteristic']['required'] ?
                      <React.Fragment key={`main-${index}`}>
                        {item['characteristic']['typeCharacteristic']['name'] === 'enter' &&
                          <EnterInput setEnterValue={setEnterValue} key={'enter' + item['characteristicId'] + index}
                                      data={item['characteristic']}
                                      id={item['characteristicId']} isRequired={true} mainValue={item['value']}/>}
                        {item['characteristic']['typeCharacteristic']['name'] === 'select' &&
                          <SelectInput setSelectValue={setSelectValue} key={'select' + item['characteristicId'] + index}
                                       isRequired={true}
                                       data={item['characteristic']} id={item['characteristicId']}
                                       mainValue={item['value']}/>}
                        {item['characteristic']['typeCharacteristic']['name'] === 'checkbox' &&
                          <CheckboxInput setCheckboxValue={setSelectValue}
                                         key={'checkbox' + item['characteristicId'] + index}
                                         isRequired={true}
                                         data={item['characteristic']} id={item['characteristicId']}
                                         mainValue={item['value']}/>}
                      </React.Fragment> : null
                  ))
                }
              </div>

            </div>

            <div className="flex column">
              <h1 className='character-title'>Дополнительные характеристики</h1>
              <div className="grid character_grid">
                {characteristicData.length > 0 &&
                  characteristicData.map((item, index) => (!item['characteristic']['required'] ?
                      <React.Fragment key={`additionally-${index}`}>
                        {item['characteristic']['typeCharacteristic']['name'] === 'enter' &&
                          <EnterInput setEnterValue={setEnterValue} key={'enter' + item['characteristicId'] + index}
                                      data={item['characteristic']}
                                      id={item['characteristicId']} isRequired={false} mainValue={item['value']}/>}
                        {item['characteristic']['typeCharacteristic']['name'] === 'select' &&
                          <SelectInput setSelectValue={setSelectValue} key={'select' + item['characteristicId'] + index}
                                       isRequired={false}
                                       data={item['characteristic']} id={item['characteristicId']}
                                       mainValue={item['value']}/>}
                        {item['characteristic']['typeCharacteristic']['name'] === 'checkbox' &&
                          <CheckboxInput setCheckboxValue={setSelectValue}
                                         key={'checkbox' + item['characteristicId'] + index}
                                         isRequired={false}
                                         data={item['characteristic']} id={item['characteristicId']}
                                         mainValue={item['value']}/>}
                      </React.Fragment> : null
                  ))
                }
              </div>

            </div>
          </div>

          <div className="create_ad-descr">
            <h1 className='create_ad-descr-title'>Описание</h1>
            <textarea onChange={event => setDescription(event.target.value)}
                      value={description} className='create_ad_descr-text' placeholder='Опишите подробнее товар'
                      required></textarea>
          </div>
          <div className='mt-50'>
            {
              cardData.typeAdId === 4 ? <UploadPhotoPremium editedImage={previewImage} setEditedImage={setPreviewImage}/> :
                  cardData.typeAdId === 3 ? <UploadPhotoVip editedImage={previewImage} setEditedImage={setPreviewImage}/> :
                      cardData.typeAdId === 2 ? <UploadPhotoStandartPlus editedImage={previewImage} setEditedImage={setPreviewImage}/> : null
            }
          </div>
          <UploadImages cropData={saveImages} setCropData={setSaveImages} mainSrcData={saveImages}
                        mainImage={mainImage} setMainImage={setMainImage}/>
          <div className="create_ad_btns">
            <button className='create_ad_btn' type='submit' onClick={() => {
            }} disabled={loading}>
              {loading ? <><img src={LoadGIF} width={32} alt={"Отправка"}/> Отправка...</> : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </div>


  );
};

export default CardEditPage;