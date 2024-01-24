import {createSlice, createAsyncThunk, current} from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchAllAds =
	createAsyncThunk('getAllAds',
		async ({offset}) => {
			const {data} = await axios.get(`api/board/getAll?offset=${offset}`)
			return data
		})

export const fetchPremium =
	createAsyncThunk('getPremium', async () => {
			const {data} = await axios.get(`api/board/getPremium`)
			return data
		})

const initialState = {
	ads: {
		items: [],
		offset: '0|0|0',
		status: 'loading'
	},
	premium: {
		items: [],
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
					offset: '0|0|0',
					status: 'loading'
				}
			}
		},
		[fetchAllAds.fulfilled]: (state, action) => {
			state.ads.items = action.payload.ads
			state.ads.offset = `${parseInt(action.payload.blockOffset)}|${parseInt(action.payload.commercialOffset)}|${parseInt(action.payload.vipOffset)}`
			state.ads.status = 'loaded'
		},
		[fetchAllAds.rejected]: (state) => {
			state.ads.items = []
			state.ads.status = 'error'
		},
		[fetchPremium.pending]: (state) => {
			return {
				...state,
				premium: {
					...state.premium,
					status: 'loading'
				}
			}
		},
		[fetchPremium.fulfilled]: (state, action) => {
			state.premium.items = action.payload
			state.premium.status = 'loaded'
		},
		[fetchPremium.rejected]: (state) => {
			state.premium.items = []
			state.premium.status = 'error'
		}
	}
})


export const BoardReducer = BoardSlice.reducer;

