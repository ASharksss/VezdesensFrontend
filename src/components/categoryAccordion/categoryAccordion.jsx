import React from 'react';
import './categoryAccordion.css'

const CategoryAccordion = () => {
	return (
		<div className='cat_accordion'>
			<h1 className='cat_accordion-h1'>Подкатегории</h1>
			<div className="cat_accordion-item">
				<input type="checkbox" name="category" id="cat_1" className='cat_accordion-radio'/>
				<label className='cat_accordion-title' htmlFor='cat_1'>
					Ищу работу
				</label>

				<div className="cat_accordion-objects">
					<span className="objects-item">IT, интернет, телеком</span>
					<span className="objects-item">Автомобильный бизнес</span>
					<span className="objects-item">Банки, иневестиции</span>
				</div>
			</div>

			<div className="cat_accordion-item">
				<input type="checkbox" name="category" id="cat_2" className='cat_accordion-radio'/>
				<label className='cat_accordion-title' htmlFor='cat_2'>
					Наименование категории
				</label>


				<div className="cat_accordion-objects">
					<span className="objects-item">Один объект</span>
					<span className="objects-item">Второй объект</span>
					<span className="objects-item">Третий объект</span>
				</div>
			</div>
		</div>
	);
};

export default CategoryAccordion;