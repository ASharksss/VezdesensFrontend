import React, {useState} from 'react';
import './categoryAccordion.css'

const CategoryAccordion = ({category, selectedCategory, handleCategoryClick, setObjectId}) => {
    const [checked, setChecked] = useState(null)

    const handleCheckedCategory = (index, item) => {
        setChecked(index)
        handleCategoryClick(item)
    }

    const handleCheckedSubcategory = (id) => {
        console.log('checked', id)
        setObjectId(id)
    }

    return (
        <div className='cat_accordion'>
            <h1 className='cat_accordion-h1'>Подкатегории</h1>
            <div className="cat_accordion-item">
                {category.map((item, index) => (
                    <div key={`div-${index}`}>
                        <input checked={(checked !== null && checked === index)}
                               type="checkbox" name="category" id={`cat_${index}`} className='cat_accordion-radio'/>
                        <label className='cat_accordion-title' htmlFor={`cat_${index}`}
                               onClick={() => handleCheckedCategory(index, item)}>
                            {item.name}
                        </label>
                        {selectedCategory && (
                            <div className="cat_accordion-objects">
                                {
                                    selectedCategory.subCategories.map((subcategory, index) => (
                                        <span onClick={() => handleCheckedSubcategory(parseInt(subcategory.id))} key={index}
                                              className="objects-item">{subcategory.name}</span>
                                    ))
                                }
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryAccordion;