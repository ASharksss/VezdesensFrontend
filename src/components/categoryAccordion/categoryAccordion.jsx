import React, {useEffect, useState} from 'react';
import './categoryAccordion.css'

const CategoryAccordion = ({
                             category, selectedCategory, handleCategoryClick, paramsSubCategory,
                             setObjectId, objectId, paramsCategory, paramsObjectId, setSearchParams
                           }) => {
  // category: [{ id: int, name: str, subCategories: [{
  //              id: int, name: str, categoryId: int, objects: [{
  //              id: int, name: str, subCategoryId: int }]}]}]
  // selectedCategory: [category] родительский стейт, чтобы открывался аккордион и отображать данные 
  // handleCategoryClick родительская функция, чтоб получить новые данные
  // paramsSubCategory: int || str параметр подкатегории, чтобы выстроить аккордион и выделить текущую подкатегорию
  // paramsCategory: int || str параметр категории, чтобы выстроить аккордион
  // setObjectId выбор объекта, для получения данных
  // objectId: int || str параметр подкатегории, чтобы выстроить аккордион и выделить текущую подкатегорию
  // setSearchParams родительский аргумент, чтобы передать новые параметры для урла на фронте
  const [checked, setChecked] = useState(null)

  useEffect(() => {
    if (paramsObjectId !== null || true) {
      category[0].subCategories.map((item, index) => {
        if (item.id === parseInt(paramsSubCategory)) {
          handleCategoryClick(item.objects)
          setChecked(index)
        }
      })
    }
  }, [paramsObjectId])
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
              checked={checked !== null && checked === index}
              type="checkbox" name="category" id={`cat_${index}`} className='cat_accordion-radio'/>
            <label className='cat_accordion-title' htmlFor={`cat_${index}`}
                   onClick={() => handleCheckedCategory(index, item)}>
              {item.name.indexOf('/') > 1 ? item.name.split('/')[0] : item.name}
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