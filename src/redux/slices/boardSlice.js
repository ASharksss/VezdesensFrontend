import {createSlice, createAsyncThunk, current} from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchAllAds =
    createAsyncThunk('getAllAds',
        async ({offset}) => {
            const {data} = await axios.get(`api/board/getAll?offset=${offset}`)
            return data
        })

const initialState = {
    ads: {
        items: [],
        offset: '0|0',
        status: 'loading'
    }
}

const BoardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAllAds.pending]: (state) => {
            return {
                ...state,
                ads: {
                    ...state.ads,
                    status: 'loading'
                }
            }
        },
        [fetchAllAds.fulfilled]: (state, action) => {
            const missingValues = action.payload.ads.filter(value => !current(state.ads.items).includes(value))
            if (missingValues.length > 0) {
                state.ads.items = [...current(state.ads.items), ...action.payload.ads]
                state.ads.offset = `${parseInt(action.payload.blockOffset)}|${parseInt(action.payload.commercialOffset)}`
            }
            state.ads.status = 'loaded'
        },
        [fetchAllAds.rejected]: (state) => {
            state.ads.items = []
            state.ads.status = 'error'
        }
    }
})


export const BoardReducer = BoardSlice.reducer;

