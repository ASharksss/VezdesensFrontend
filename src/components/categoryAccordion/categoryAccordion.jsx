import React, {useEffect, useState} from 'react';
import './categoryAccordion.css'

const CategoryAccordion = ({
                             category, selectedCategory, handleCategoryClick, paramsSubCategory,
                             setObjectId, objectId, paramsCategory, paramsObjectId, setSearchParams
                           }) => {
  const [checked, setChecked] = useState(null)

  useEffect(() => {
    if (paramsObjectId !== null || true) {
      category[0].subCategories.map((item, index) => {
        if (item.id === paramsSubCategory) {
          handleCategoryClick(item.objects)
          setChecked(index)
        }
      })
    }
  }, [])
  const handleCheckedCategory = (index, item) => {
    setChecked(index)
    handleCategoryClick(item.objects)
  }

  const handleCheckedSubcategory = (item) => {
    setSearchParams({object: item.id, subCategory: parseInt(item.subCategoryId), category: paramsCategory})
    setObjectId(parseInt(item.id))
  }

  return (
    <div className='cat_accordion'>
      <h1 className='cat_accordion-h1'>Подкатегории</h1>
      <div className="cat_accordion-item">
        {category[0].subCategories.map((item, index) => (
          <div key={`div-${index}`}>
            <input
              checked={(checked !== null && checked === index)}
              type="checkbox" name="category" id={`cat_${index}`} className='cat_accordion-radio'/>
            <label className='cat_accordion-title' htmlFor={`cat_${index}`}
                   onClick={() => handleCheckedCategory(index, item)}>
              {item.name}
            </label>
            {selectedCategory.length > 0 ? (
              <div className="cat_accordion-objects">
                {
                  selectedCategory.map((item, index) => (
                    <span onClick={() => handleCheckedSubcategory(item)} key={index}
                          className="objects-item"
                          style={objectId === item.id ? {
                            fontWeight: 'bold',
                            textDecoration: 'underline'
                          } : {}}>{item.name}</span>
                  ))
                }
              </div>
            ) : <div className="cat_accordion-objects">
              <span style={{fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer'}}>Ничего нет</span>
            </div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryAccordion;