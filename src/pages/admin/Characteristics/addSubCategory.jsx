import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchTypeCharacteristic} from "../../../redux/slices/admin/characterSlice";
import {fetchCategory} from "../../../redux/slices/categorySlice";
import axios from "axios";

const AddSubCategory = () => {

  const dispatch = useDispatch()
  const [categoryId, setCategoryId] = useState()
  const [nameSub, setNameSub] = useState()
  const [arrSub, setArrSub] = useState([])

  const {categories} = useSelector(state => state.categories)

  useEffect(() => {
    dispatch(fetchCategory())
  }, [])


  const handleSubmit = async () => {
    const data = {
      categoryId: categoryId,
      arrSub: arrSub
    }
    await axios.post('api/categories/addSubCategory', data).then((res) => {
      alert('Усё')
    })

  }



  return (
    <div className='container'>
      <div className="char_center">
        <h1 className='auth_form-title mb-40'>Добавить подкатегорию</h1>
        <label className='char-label'>Выберите категорию</label>

        <select className='char-input' onChange={(e) => setCategoryId(e.target.value)}>
          {
            categories.items.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))
          }
        </select>

        <label className='char-label'>Название Подкатегории</label>
        <input type="text" className='char-input'
               onChange={(e) => setNameSub(e.target.value)}/>
        <button className='addPage_btn'
                onClick={() => setArrSub([...arrSub, nameSub])}>Добавить в группу
        </button>
        <ol>
          {
            arrSub.map((item, index) => (
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

export default AddSubCategory;