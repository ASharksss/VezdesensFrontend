import React, {useState, useEffect} from 'react';
import './filters.css'

const EnterFilter = ({name='цена', setEnterFilter, id}) => {// name: str = передается имя, по умолчанию "цена"
                                        // data: [{id: int, name: str}]
                                        // setCheckboxValue: [] родительский стейт
                                        // id: int родительский id, чтобы понимать для кого изменения
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
	const [value, setValue] = useState('')
	useEffect(() => {
		if (value !== '') {
      if(name === 'цена')
        id = 'цена'
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
	}, [id, value]);

  useEffect(() => {
    if(value1 === '' && value2 !== ''){
      setValue(`0-${value2}`)
    } else if(value2 === '' && value1 !== ''){
      setValue(`${value1}-1500000000`)
    } else {
      setValue(`${value1}-${value2}`)
    }
  }, [value1, value2])

  return (
    <div className='filter_item'>
      {name === 'цена' ? <span className='filter_label'>Цена <span>Р</span></span>:
       <span className='filter_label'>{name}</span>}
      <div className="flex">
        <input type="text" className='filter_input' placeholder='от' 
          onChange={event => setValue1(event.target.value)} value={value1}/>
        <input type="text" className='filter_input' placeholder='до'
          onChange={event => setValue2(event.target.value)} value={value2}/>
      </div>
    </div>
  );
};

export default EnterFilter;