import React, {useState} from 'react';
import './filters.css'

const ChoiceFilter = () => {

  const [open, setOpen] = useState(false)

  let choice = []
  console.log(choice)
  return (
    <div className='filter_item'>
      <div className="filter_select">
        <div className="filter_label">Марка</div>

        <div className="filter_select-header" onClick={() => setOpen(!open)}>1</div>

        <div className={open ? 'block filter_select-body' : 'filter_select-body-none'}>
          <div className="select-item">
            <input type="checkbox" id='filter_checkbox' className='checkbox_filter' value={'Audi'}/>
            <label htmlFor="filter_checkbox">Audi</label>
          </div>
          <div className="select-item">
            <input type="checkbox" id='filter_checkbox2' className='checkbox_filter' value={'BMW'}/>
            <label htmlFor="filter_checkbox2">BMW</label>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChoiceFilter;