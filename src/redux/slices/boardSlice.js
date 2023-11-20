import {createSlice, createAsyncThunk, current} from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchAllAds =
    createAsyncThunk('getAllAds',
        async (offset) => {
            const {data} = await axios.get(`api/board/getAll?offset=${offset}`)
            return data
        })

const initialState = {
    ads: {
        items: [],
        offset: 0,
        status: 'loading'
    }
}

const AdsSlice = createSlice({
    name: 'ads',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAllAds.pending]: (state) => {
            state.ads.status = 'loading'
        },
        [fetchAllAds.fulfilled]: (state, action) => {
            const missingValues = action.payload.ads.filter(value => !current(state.ads.items).includes(value))
            console.log(missingValues)
            // action.payload.ads.map(values => console.log(values))
            state.ads.items = [...current(state.ads.items), ...missingValues]
            state.ads.offset = action.payload.ads.length
            state.ads.status = 'loaded'
        },
        [fetchAllAds.rejected]: (state) => {
            state.ads.items = []
            state.ads.status = 'error'
        }
    }

})


export const AdsReducer = AdsSlice.reducer;

