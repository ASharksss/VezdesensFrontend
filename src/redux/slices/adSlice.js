import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchOneAd =
  createAsyncThunk('getOneAd',
    async (adId, userId) => {
      const {data} = await axios.get(`api/ad/getOneAd?=${adId}&userId=${userId}`)
      return data
    }
  )

const initialState = {
  ad: {
    items: [],
    status: 'loading'
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
    [fetchOneAd.error]: (state) => {
      state.ad.items = []
      state.ad.status = 'error'
    }
  }
})

export const AdReducer = AdSlice.reducer