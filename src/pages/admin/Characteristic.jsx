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
      charName:charName,
      charValueAll: characteristicValueAll
    }
    await axios.post('api/characteristic/createAll', data).then((res) => {
      alert('Всё чики-пики')
    })
  }

  console.log(objectId)

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

        <ol>
          {
            characteristicValueAll.map((item) => (

              <li>{item}</li>
            ))
          }
        </ol>

        <button type={'submit'} className='char_submit' onClick={() => handleSubmit()}> Отправить </button>

      </div>

    </div>
  );
};

export default Characteristic;