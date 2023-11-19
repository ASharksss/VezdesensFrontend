import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchOneAd =
  createAsyncThunk('getOneAd',
    async (adId, userId) => {
      const {data} = await axios.get(`api/ad/getOneAd?=${adId}&userId=${userId}`)
      return data
    }
  )

export const fetchCategory =
  createAsyncThunk('getCategories',
    async () => {
      const {data} = await axios.get(`api/categories/getCategories`)
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
  ad: {
    items: [],
    status: 'loading'
  },
  categories: {
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
  }
}


const AdSlice = createSlice({
  name: 'ad',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchOneAd.pending]: (state) => {
      state.ad.items = []
      state.ad.status = 'loading'
    },
    [fetchOneAd.fulfilled]: (state) => {
      state.ad.items = []
      state.ad.status = 'loaded'
    },
    [fetchOneAd.rejected]: (state) => {
      state.ad.items = []
      state.ad.status = 'error'
    }
  }
})

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
      state.categories.items = action.payload
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
    }
  }
})

export const AdReducer = AdSlice.reducer
export const CategoriesReducer = CategoriesSlice.reducer