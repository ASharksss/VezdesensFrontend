import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {fetchOneAd} from "../adSlice";


export const fetchTypeCharacteristic =
  createAsyncThunk('getTypeCharacteristic',
    async () => {
      const {data} = await axios.get('api/characteristic/getTypeCharacteristic')
      return data
    }
  )


const initialState = {
  typeCharacteristic: {
    items: [],
    status: 'loading'
  }
}


const CharacteristicSlice = createSlice({
  name: 'characteristic',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTypeCharacteristic.pending]: (state) => {
      state.typeCharacteristic.items = []
      state.typeCharacteristic.status = 'loading'
    },
    [fetchTypeCharacteristic.fulfilled]: (state, action) => {
      state.typeCharacteristic.items = action.payload
      state.typeCharacteristic.status = 'loaded'
    },
    [fetchTypeCharacteristic.rejected]: (state) => {
      state.typeCharacteristic.items = []
      state.typeCharacteristic.status = 'error'
    }
  }
})

export const CharacteristicReducer= CharacteristicSlice.reducer