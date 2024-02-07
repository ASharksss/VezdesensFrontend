import React, {useState, useEffect} from 'react';
import './filters.css'
import { numberWithSpaces } from '../../utils';

const EnterFilter = ({name='price', setEnterFilter, id}) => {// name: str = передается имя, по умолчанию "цена"
                                        // data: [{id: int, name: str}]
                                        // setCheckboxValue: [] родительский стейт
                                        // id: int родительский id, чтобы понимать для кого изменения
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
	const [value, setValue] = useState('')
	useEffect(() => {
		if (value !== '') {
      if(name === 'price')
        id = 'price'
			setEnterFilter((prevState) => {
				const existingEntryIndex = prevState.findIndex((entry) => entry.id === id);
				if (existingEntryIndex !== -1) {
					const updatedEnterValue = [...prevState];
					updatedEnterValue[existingEntryIndex] = {id: id, value: value};
					return updatedEnterValue;
				} else {
					return [...prevState, {id: id, value: value}];
				}
			})
		}
    if(value === '') {
      if(name === 'price')
        id = 'price'
      const removeById = (arr) => {
        const updatedArr = arr.filter(item => item.id !== id);
        return updatedArr;
      };
      setEnterFilter((prevState) => removeById(prevState))
    }
	}, [id, value]);

  const handleValue1= (val) => {
    if (parseInt(val.replace(/\s+/g, '')) > 1500000000) {
      alert('Значение превышает норму')
    } else {
      const thousandPrice = numberWithSpaces(val.replace(/\s+/g, ''))
      setValue1(thousandPrice)
    }
  }

  const handleValue2 = (val) => {
    if (parseInt(val.replace(/\s+/g, '')) > 1500000000) {
      alert('Значение превышает норму')
    } else {
      const thousandPrice = numberWithSpaces(val.replace(/\s+/g, ''))
      setValue2(thousandPrice)
    }
  }

  useEffect(() => {
    if(value1 === '' && value2 !== ''){
      setValue(`0-${value2.replace(/\s+/g, '')}`)
    } else if(value2 === '' && value1 !== ''){
      setValue(`${value1.replace(/\s+/g, '')}-1500000000`)
    } else if (value1 !== '' && value2 !== ''){
      setValue(`${value1.replace(/\s+/g, '')}-${value2.replace(/\s+/g, '')}`)
    }
    if(value !== '') {
      if(value1 === '' && value2 === '')
        setValue('')
    }
  }, [value1, value2])

  return (
    <div className='filter_item'>
      {name === 'цена' ? <span className='filter_label'>Цена <span>Р</span></span>:
       <span className='filter_label'>{name}</span>}
      <div className="flex">
        <input type="text" className='filter_input' placeholder='от'
          onChange={event => handleValue1(event.target.value)} value={value1}/>
        <input type="text" className='filter_input' placeholder='до'
          onChange={event => handleValue2(event.target.value)} value={value2}/>
      </div>
    </div>
  );
};

export default EnterFilter;
