import React, {useState, useEffect} from 'react';
import './CategoryModal.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchCategoryList} from "../../redux/slices/categorySlice";

const CategoryModal = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const dispatch = useDispatch()
    const {categoriesList} = useSelector(state => state.categories)

    useEffect(() => {
        dispatch(fetchCategoryList())
    }, [])

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <>
            <div className="categories-column">
                <h2>Основные категории</h2>
                <ul>
                    {categoriesList.items.map((category) => (
                        <li key={category.id} onClick={() => handleCategoryClick(category)}>
                            {category.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="subcategories-column">
                {selectedCategory && (
                    <>
                        <h2>Подкатегории для {selectedCategory.name}</h2>
                        <ul>
                            {selectedCategory.subCategories.map((subcategory, index) => (
                                <li key={index}>{subcategory.name}</li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </>
    );
};

export default CategoryModal;