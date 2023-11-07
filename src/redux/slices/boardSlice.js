import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from '../../axios'

export const fetchAllAds =
  createAsyncThunk('getAllAds',
  async () => {
    const {data} = await axios.get('api/board/getAll')
    return data
  })

const initialState = {
  ads: {
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
      state.ads.items = []
      state.ads.status = 'loading'
    },
    [fetchAllAds.fulfilled]: (state, action) => {
      state.ads.items = action.payload
      state.ads.status = 'loaded'
    },
    [fetchAllAds.rejected]: (state) => {
      state.ads.items = []
      state.ads.status = 'error'
    }
  }

})


export const AdsReducer = AdsSlice.reducer;

