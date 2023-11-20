import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchAllAds =
  createAsyncThunk('getAllAds',
  async (page) => {
    const {data} = await axios.get(`api/board/getAll?page=${page}`)
    return data
  })

const initialState = {
  ads: {
    items: [],
		page: 1,
    status: 'loading'
  }
}

const AdsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllAds.pending]: (state) => {
      state.ads.items = []
      state.ads.status = 'loading'
    },
    [fetchAllAds.fulfilled]: (state, action) => {
      state.ads.items = [...state.ads.items, ...action.payload.ads]
			state.ads.page = action.payload.page
      state.ads.status = 'loaded'
    },
    [fetchAllAds.rejected]: (state) => {
      state.ads.items = []
      state.ads.status = 'error'
    }
  }

})


export const AdsReducer = AdsSlice.reducer;

