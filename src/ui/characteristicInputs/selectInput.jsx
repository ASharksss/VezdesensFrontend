import React, {useEffect, useState} from 'react';
import arrow_icon from '../../asserts/icons/arrow_down.svg'

const SelectInput = ({data, setSelectValue, id, isRequired = false, mainValue = ''}) => { // data: [{id: int, name: str}]
                                                                                          // setCheckboxValue: [] родительский стейт
                                                                                          // id: int родительский id, чтобы понимать для кого изменения
  const [value, setValue] = useState(mainValue)
  const [open, setOpen] = useState(false)
  const [topic, setTopic] = useState('')

  useEffect(() => {
    if (value !== '') {
      setSelectValue((prevState) => {
        const existingEntryIndex = prevState.findIndex((entry) => entry.id === id);
        if (existingEntryIndex !== -1) {
          const updatedEnterValue = [...prevState];
          updatedEnterValue[existingEntryIndex] = {id: id, value: parseInt(value)};
          return updatedEnterValue;
        } else {
          return [...prevState, {id: id, value: parseInt(value)}];
        }
      })
    }
    if (value.length === 0) {
      const removeById = (arr) => {
        const updatedArr = arr.filter(item => item.id !== id);
        return updatedArr;
      };
      setSelectValue((prevState) => removeById(prevState))
    }
  }, [id, value]);

  const handleReset = (event) => {
    setTopic('')
    setValue('')
    setOpen(!open)
    setSelectValue((prevState) => {
      const existingEntryIndex = prevState.findIndex((entry) => entry.id === id);
      if (existingEntryIndex !== -1) {
        return prevState.filter(item => item.id !== id);
      } else {
        return prevState;
      }
    })
  }

  return (
    <div>
      <h1 className='enter_input-title'>{data.name}</h1>
      <div className="Edited_appeal-select">
        <div className="flex items-center space-between Edited_filter-header w-237" onClick={() => setOpen(!open)}
             required={isRequired}>
          {/* Вывожу значние topic  */}
          <p className='Edited_filter-header-p'>
            {topic ? topic : 'Выберите значение'}
          </p>
          <img src={arrow_icon} alt=""/>
        </div>
        <div className={open ? 'block Edited_filter_select-body' : 'filter_select-body-none'}>
          {!isRequired ? <div className='Edited_filter_select-item' onClick={handleReset}>
            Выберите значение
          </div> : null}
          {
            data['characteristicValues'].map((item, index) => (
              // Предаю значиение item.name после topic присваиваю значиение при клике
              <div className='Edited_filter_select-item' key={'characteristicValues' + index} value={item.id}
                   onClick={() => {
                     setTopic(item.name)
                     setOpen(!open)
                     setValue(item.id)
                   }}>{item.name}</div>
            ))
          }
        </div>
      </div>


    </div>
  );
};

export default SelectInput;
