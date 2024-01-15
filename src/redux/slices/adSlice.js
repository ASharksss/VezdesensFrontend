import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchOneAd =
  createAsyncThunk('getOneAd',
    async (adId, userId) => {
      const {data} = await axios.get(`api/ad/getOneAd?=${adId}&userId=${userId}`)
      return data
    }
  )

export const fetchBookingInfo =
  createAsyncThunk('bookingInfo',
    async(name) => {
    const {data} = await axios.get(`api/ad/bookingInfo?name=${name}`)
      return data
    }
  )

export const fetchCharacterObjects =
  createAsyncThunk('getCharacteristicObject',
    async (objectId) => {
      const {data} = await axios.get(`api/characteristic/getCharacteristicObject?objectId=${objectId}`)
      return data
    }
  )

const initialState = {
  ad: {
    items: [],
    status: 'loading'
  },
  character: {
    items: [],
    status: 'loading'
  },
  bookingInfo: {
    items: [],
    status: 'loading'
  }
}


const AdSlice = createSlice({
  name: 'ad',
  initialState,
  reducers: {
    fetchCategoryForCharacter: state => {
      state.character.items = []
      state.character.status = 'loading'
    }
  },
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
    },

    [fetchCharacterObjects.pending]: (state) => {
      state.character.items = []
      state.character.status = 'loading'
    },
    [fetchCharacterObjects.fulfilled]: (state, action) => {
      state.character.items = action.payload
      state.character.status = 'loaded'
    },
    [fetchCharacterObjects.rejected]: (state) => {
      state.character.items = []
      state.character.status = 'error'
    },

    [fetchBookingInfo.pending]: (state) => {
      state.bookingInfo.items = []
      state.bookingInfo.status = 'loading'
    },
    [fetchBookingInfo.fulfilled]: (state, action) => {
      state.bookingInfo.items = action.payload
      state.bookingInfo.status = 'loaded'
    },
    [fetchBookingInfo.rejected]: (state) => {
      state.bookingInfo.items = []
      state.bookingInfo.status = 'error'
    }
  }
})


export const AdReducer = AdSlice.reducer
export const {fetchCategoryForCharacter} = AdSlice.actions
