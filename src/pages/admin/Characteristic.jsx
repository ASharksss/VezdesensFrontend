import React, {useEffect, useState} from 'react';
import './character.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchTypeCharacteristic} from "../../redux/slices/admin/characterSlice";
import {fetchCategory, fetchObjects, fetchSubCategories} from "../../redux/slices/categorySlice";
import {fetchCharacterObjects} from "../../redux/slices/adSlice";
import axios from "axios";


const Characteristic = () => {

  const dispatch = useDispatch()
  const [typeId, setTypeId] = useState()
  const [charName, setCharName] = useState()
  const [characteristicValue, setCharacteristicValue] = useState()
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

    const data = {
      objectId: objectId,
      typeId: typeId,
      charName: charName,
      charValueAll: characteristicValueAll,
      required: isRequired
    }
    await axios.post('api/characteristic/createAll', data).then((res) => {
      alert('Всё чики-пики')
      window.location.reload()
    })
  }

  console.log(objectId)

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
        <input type="text" placeholder='Название характеристики' className='char-input'
               onChange={(e) => setCharName(e.target.value)}/>
        <div>
          <input id='required-label' type="checkbox" placeholder='Название характеристики' className='char-input'
                 onChange={() => setIsRequired(!isRequired)} style={{marginRight: 5}}/>
          <label className='char-label' htmlFor='required-label'>Обязательное поле</label>
        </div>


        {
          typeId == 2 || typeId == 3 ?
            <div className='flex column'>
              <label className='char-label'>Введите варианты значений</label>
              <input type="text" placeholder='Вариант' className='char-input'
                     onChange={(e) => setCharacteristicValue(e.target.value)}/>
              <button
                onClick={() => setCharacteristicValueAll([...characteristicValueAll, characteristicValue])}>
                Добавить вариант
              </button>
            </div>
            : ''
        }
        <div className='character-list'>
          <ol>
            {
              characteristicValueAll.map((item, index) => (


                  <li className='flex'>{item} <button className='red' onClick={() => handleRemoveCharacteristic(index)}> X </button></li>


              ))
            }
          </ol>
        </div>


        <button type={'submit'} className='char_submit' onClick={() => handleSubmit()}> Отправить</button>

      </div>

    </div>
  );
};

export default Characteristic;