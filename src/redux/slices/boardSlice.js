import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from '../../axios'

export const fetchAllAds =
  createAsyncThunk('getAllAds',
  async () => {
    const {data} = await axios.get('api/board/getAll')
    return data
  })

const initialState = {
  Ads: {
    items: [],
    status: 'loading'
  }
}

const AdsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllAds.pending]: (state) => {
      state.Ads.items = []
      state.Ads.status = 'loading'
    },
    [fetchAllAds.fulfilled]: (state, action) => {
      state.Ads.items = action.payload
      state.Ads.status = 'loaded'
    },
    [fetchAllAds.rejected]: (state) => {
      state.Ads.items = []
      state.Ads.status = 'error'
    }
  }

})


export const AdsReducer = AdsSlice.reducer;

