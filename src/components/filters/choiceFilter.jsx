import React, {useState, useEffect, useRef} from 'react';
import './filters.css'

const ChoiceFilter = ({name, data, id, setChoiceFilter}) => {// name: str = передается имя, по умолчанию не отображается
                                        // data: [{id: int, name: str}]
                                        // setChoiceFilter: [] родительский стейт
                                        // id: int родительский id, чтобы понимать для кого изменения

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState([]) // временное хранилище для компонента, чтобы записывать id объектов
                                         // value: [List(int)] = [1,4,11]
	const wrapperRef = useRef(null)
	const selectRef = useRef(null)

	useEffect(() =>{
		if (value.length > 0 && selectRef !== null){
			selectRef.current.innerText = data.filter(item => value.includes(item.id)).map(item => item.name).join(", ")
		}
		if (value.length === 0 && selectRef !== null){
			selectRef.current.innerText = 'Выберите...'
		}
	}, [value])

  const handleChecked = (event) => {
    const element = parseInt(event.target.value)
		setValue((prevState) => { // проверка добавленного id-элемента
			const existingEntryIndex = prevState.findIndex((entry) => entry === element);
			if (existingEntryIndex !== -1) { // проверка имеется ли она уже во временном хранилище
				return prevState.filter((entry) => entry !== element); // если да, то удаляем
			} else {
				return [...prevState, element]; // если нет, то добавляем
			}
		});
  }
	useEffect(() => {
		if (value.length > 0) {
			setChoiceFilter((prevState) => { // те же самые проверки, только запись на родительский стейт
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
    if (value.length === 0) {
      const removeById = (arr) => {
        const updatedArr = arr.filter(item => item.id !== id);
        return updatedArr;
      };
      setChoiceFilter((prevState) => removeById(prevState))
    }
	}, [id, value]); // триггеры по родительскому id и значению из временного хранилища


	const handleClickOutside = (event) => {
		if (wrapperRef.current && !wrapperRef.current.contains(event.target))
			setOpen(false)
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

  return (
    <div className='filter_item' ref={wrapperRef} id={`filter-${id}`}>
      <div className="filter_select">
        <div className="filter_label">{name ? name : null}</div>
        <div className="filter_select-header" ref={selectRef} onClick={() => setOpen(!open)}>Выберите...</div>

        <div className={open ? 'block filter_select-body' : 'filter_select-body-none'}>
          {data.length > 0 ?
			  data.map((item, index) =>
				<div className="select-item" key={`choiceFilter-${index}=${item.id}`}>
				  <input type="checkbox" id={`filter_checkbox=${index}-${item.id}`} className='checkbox_filter'
				  value={item.id} onClick={handleChecked}/>
				  <label htmlFor={`filter_checkbox=${index}-${item.id}`} >{item.name}</label>
				</div>
			  ) :
				<div className="select-item" key={`choiceFilter-another=${Math.random(1, 100) * 100}`}>
				  <input type="checkbox" id={`filter_checkbox=another`} className='checkbox_filter' />
				  <label htmlFor={`filter_checkbox=another`} >Ничего нет</label>
				</div>
		  }
        </div>
      </div>
    </div>
  );
};

export default ChoiceFilter;
