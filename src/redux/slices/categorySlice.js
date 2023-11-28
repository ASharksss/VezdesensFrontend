import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCategory =
    createAsyncThunk('getCategories',
        async () => {
            const {data} = await axios.get(`api/categories/getCategories`)
            return data
        }
    )

export const fetchCategoryList =
    createAsyncThunk('getCategoriesList',
        async (subCategoryId) => {
					if (subCategoryId) {
						const {data} = await axios.get(`api/categories/getCategoriesList?categoryId=${subCategoryId}`)
						return data
					}
            const {data} = await axios.get(`api/categories/getCategoriesList`)
            return data
        }
    )

export const fetchSubCategories =
    createAsyncThunk('getSubCategories',
        async (categoryId) => {
            const {data} = await axios.get(`api/categories/getSubCategories?categoryId=${categoryId}`)
            return data
        }
    )

export const fetchObjects =
    createAsyncThunk('getObjects',
        async (subCategoryId) => {
            const {data} = await axios.get(`api/categories/getObjects?subCategoryId=${subCategoryId}`)
            return data
        }
    )


const initialState = {
    categories: {
				premium: true,
        items: [],
        status: 'loading',
        subCategories: {
            items: [],
            status: 'loading',
            objects: {
                items: [],
                status: 'loading'
            }
        }
    },
    categoriesList: {
        items: [],
        status: 'loading'
    }
}

const CategoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCategory.pending]: (state) => {
            state.categories.items = []
            state.categories.status = 'loading'
        },
        [fetchCategory.fulfilled]: (state, action) => {
            state.categories.items = action.payload.categories
						state.categories.premium = action.payload.premium
            state.categories.status = 'loaded'
        },
        [fetchCategory.rejected]: (state) => {
            state.categories.items = []
            state.categories.status = 'error'
        },
        [fetchSubCategories.pending]: (state) => {
            state.categories.subCategories.items = []
            state.categories.subCategories.status = 'loading'
        },
        [fetchSubCategories.fulfilled]: (state, action) => {
            state.categories.subCategories.items = action.payload
            state.categories.subCategories.status = 'loaded'
        },
        [fetchSubCategories.rejected]: (state) => {
            state.categories.subCategories.items = []
            state.categories.subCategories.status = 'error'
        },
        [fetchObjects.pending]: (state) => {
            state.categories.subCategories.objects.items = []
            state.categories.subCategories.objects.status = 'loading'
        },
        [fetchObjects.fulfilled]: (state, action) => {
            state.categories.subCategories.objects.items = action.payload
            state.categories.subCategories.objects.status = 'loaded'
        },
        [fetchObjects.rejected]: (state) => {
            state.categories.subCategories.objects.items = []
            state.categories.subCategories.objects.status = 'error'
        },
        [fetchCategoryList.pending]: (state) => {
            state.categoriesList.items = []
            state.categoriesList.status = 'loading'
        },
        [fetchCategoryList.fulfilled]: (state, action) => {
            state.categoriesList.items = action.payload
            state.categoriesList.status = 'loaded'
        },
        [fetchCategoryList.rejected]: (state) => {
            state.categoriesList.items = []
            state.categoriesList.status = 'error'
        }
    }
})

export const CategoriesReducer = CategoriesSlice.reducer