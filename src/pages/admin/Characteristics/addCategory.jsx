import React, {useState} from 'react';
import axios from "axios";
const AddCategory = () => {

  const [name, setName] = useState('')


  const handleSubmit = async (event) => {
    try {
      const data = {
        categoryName: name,
      }
      await axios.post('api/categories/addCategory', data).then(() => {
        setName('')
        alert('Добавлено')
      })
    }catch (e) {
      alert(e)
    }

  }

  return (
    <div className='container'>
      <div className="char_center">
        <h1 className='title auth_form-title mb-40'>Добавить категорию</h1>
        <label className='char-label'>Название категории</label>
        <input type="text" className='char-input' onChange={(e) => setName(e.target.value)}/>
        <button className='char_submit' onClick={() => handleSubmit()}>Добавить</button>
      </div>
    </div>
  );
};

export default AddCategory;