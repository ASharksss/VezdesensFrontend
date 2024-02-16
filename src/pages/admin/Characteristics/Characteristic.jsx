import React, {useEffect, useState} from 'react';
import './character.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchTypeCharacteristic} from "../../../redux/slices/admin/characterSlice";
import {fetchCategory, fetchObjects, fetchSubCategories} from "../../../redux/slices/categorySlice";
import {fetchCharacterObjects} from "../../../redux/slices/adSlice";
import axios from "axios";


const Characteristic = () => {

  const dispatch = useDispatch()
  const [typeId, setTypeId] = useState()
  const [charName, setCharName] = useState()
  const [characteristicValue, setCharacteristicValue] = useState('')
  const [objectId, setObjectId] = useState(1)
  const [isRequired, setIsRequired] = useState(false)
  const [characteristicValueAll, setCharacteristicValueAll] = useState([])


  const {typeCharacteristic} = useSelector(state => state.characteristics)
  const {categories} = useSelector(state => state.categories)

  useEffect(() => {
    dispatch(fetchTypeCharacteristic())
    dispatch(fetchCategory())
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = {
      objectId: objectId,
      typeId: typeId,
      charName: charName,
      charValueAll: characteristicValueAll,
      required: isRequired
    }
    await axios.post('api/characteristic/createAll', data).then((res) => {
      alert('Всё чики-пики')
    })
    setCharacteristicValue('')
    setCharacteristicValueAll('')
    setCharName('')
  }

  const showCharacterictics = () => {
    if(characteristicValue !== ''){
      setCharacteristicValueAll([])
      if(characteristicValue.indexOf(';') > 0) {
        const filtered = characteristicValue.split(';')
        const timeArray = []
        filtered.map(item => {
          if(item.trim() !== '')
            timeArray.push(item.trim())
        })
        setCharacteristicValueAll(timeArray)
      } else if (characteristicValue.indexOf('\n') > 0) {
        const filtered = characteristicValue.split('\n')
        const timeArray = []
        filtered.map(item => {
          if(item.trim() !== '')
            timeArray.push(item.trim())
        })
        setCharacteristicValueAll(timeArray)
      }
    }
 }

 useEffect(() => {
   showCharacterictics()
 }, [characteristicValue])

  const handleRemoveCharacteristic = (itemIndex) => {
    const filteredArray = characteristicValueAll.filter((item, index) => index !== itemIndex)
    setCharacteristicValueAll(filteredArray)
  }

  return (
    <div className='container'>
      <div className="char_center">

        <select className='char-input' onChange={event => dispatch(fetchSubCategories(event.target.value))}>
          <option hidden>Выберите категорию</option>
          {
            categories.items.map((item, index) => (
              <option key={'category' + index} value={item.id}>{item.name}</option>
            ))
          }
        </select>
        <select className='char-input' disabled={categories.subCategories.status === 'loading'}
                onChange={event => dispatch(fetchObjects(event.target.value))}>
          <option hidden>Выберите подкатегорию</option>
          {
            categories.subCategories.items.map((item, index) => (
              <option key={'subCategory' + index} value={item.id}>{item.name}</option>
            ))
          }
        </select>
        <select className='char-input' disabled={categories.subCategories.objects.status === 'loading'}
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


        <select className='char-input' onChange={(e) => setTypeId(e.target.value)}>
          <option hidden>Выберите тип характеристики</option>
          {
            typeCharacteristic.items.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))
          }
        </select>


        <label className='char-label'>Название характеристики</label>
        <input value={charName} type="text" placeholder='Название характеристики' className='char-input'
               onChange={(e) => setCharName(e.target.value)}/>
        <div>
          <input id='required-label' type="checkbox" placeholder='Название характеристики' className='char-input'
                 onChange={() => setIsRequired(!isRequired)} style={{marginRight: 5}}/>
          <label className='char-label' htmlFor='required-label'>Обязательное поле</label>
        </div>

        <div className="flex">
          {
            typeId == 2 || typeId == 3 ?
              <div className='flex column'>
                <label className='char-label'>Введите варианты значений (с новой строки или через "<code>;</code>")</label>
                <textarea value={characteristicValue} style={{border: '1px solid rgba(0,0,0,0.5)'}} onChange={(e) => setCharacteristicValue(e.target.value)} cols="30" rows="10"></textarea>
                <button onClick={() => showCharacterictics()}>Показать</button>
              </div>
              : null
          }
          <div className='character-list'>
            <ol>
              { characteristicValueAll.length > 0 ?
                characteristicValueAll.map((item, index) => (
                    <li className='flex'>{item} <button className='red' onClick={() => handleRemoveCharacteristic(index)}> X </button></li>
                )) : null
              }
            </ol>
          </div>
        </div>

        <button type='submit' className='char_submit' onClick={handleSubmit}> Отправить</button>

      </div>

    </div>
  );
};

export default Characteristic;