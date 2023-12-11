import React, {useEffect, useState} from 'react';
import {fetchCategory, fetchObjects, fetchSubCategories} from "../../redux/slices/categorySlice";
import {useDispatch, useSelector} from "react-redux";
import {fetchTypeCharacteristic} from "../../redux/slices/admin/characterSlice";
import axios from "axios";

const AddObject = () => {

  const dispatch = useDispatch()

  const [nameObject, setNameObject] = useState()
  const [arrObj, setArrObj] = useState([])
  const [subCategoryId, setSubCategoryId] = useState()

  const {categories} = useSelector(state => state.categories)

  useEffect(() => {
     dispatch(fetchCategory())
  }, [])


  const handleSubmit = async () => {
    const data = {
      subCategoryId: subCategoryId,
      arrObj: arrObj
    }
    await axios.post('api/categories/createObject', data).then((res) => {
      alert('Усё')
    })

  }


  return (
    <div className='container'>
      <div className="char_center">
        <h1 className='auth_form-title mb-40'>Добавить объект</h1>
        <label className='char-label'>Выберите категорию</label>

        <select className='char-input' onChange={event => dispatch(fetchSubCategories(event.target.value))}>
          <option hidden>Выберите категорию</option>
          {
            categories.items.map((item, index) => (
              <option key={'category' + index} value={item.id}>{item.name}</option>
            ))
          }
        </select>
        <select className='char-input' disabled={categories.subCategories.status === 'loading'}
                onChange={event => setSubCategoryId(event.target.value)}>
          <option hidden>Выберите подкатегорию</option>
          {
            categories.subCategories.items.map((item, index) => (
              <option key={'subCategory' + index} value={item.id}>{item.name}</option>
            ))
          }
        </select>

        <label className='char-label'>Название Объекта</label>
        <input type="text" className='char-input'
               onChange={(e) => setNameObject(e.target.value)}/>
        <button className='addPage_btn'
                onClick={() => setArrObj([...arrObj, nameObject])}>
          Добавить в группу
        </button>
        <ol>
          {
            arrObj.map((item, index) => (
              <div className='flex'>
                <li key={index}>{item} </li>
              </div>

            ))
          }
        </ol>
        <button className='char_submit' onClick={() => handleSubmit()}>Добавить</button>
      </div>
    </div>
  );
};

export default AddObject;