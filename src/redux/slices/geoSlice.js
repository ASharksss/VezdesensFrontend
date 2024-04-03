import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGetGeoList = createAsyncThunk('geo/list', async () => {
    const {data} = await axios.post('api/geo')
    return data
})

const initialState = {
    data: {
        items: [],
        status: 'loading'
    },
    mainPath: {id: 570, positionRegionId: 19, positionDistrictId: 2},
    mainCity: 'Казань',
    mainSlugCity: 'kazan',
    showCitiesModal: false,
    geoStatus: 'isInstalled'
}

const GeoSlice = createSlice({
    name: 'geo',
    initialState,
    reducers: {
        showCities: (state) => {
            state.showCitiesModal = true
        },
        hideCities: (state) => {
            state.showCitiesModal = false
        },
        setMainCity: (state, action) => {
            state.mainCity = action.payload.name
            state.mainPath = action.payload.path
            state.mainSlugCity = action.payload.slug
            localStorage.setItem('city_path', JSON.stringify(action.payload.path))
            localStorage.setItem('city_name', action.payload.name)
            axios.defaults.headers.common['x-position'] = action.payload.slug
            const date = new Date()
            document.cookie = `position=${action.payload.slug}; path=/; expires=${date.setDate(date.getDate() + 365)}; samesite=lax`
            state.geoStatus = 'done'
        },
        takeFromCookie: (state, action) => {
            state.mainSlugCity = action.payload
            const localCityPath = localStorage.getItem('city_path')
            const localCityName = localStorage.getItem('city_name')
            state.mainCity = localCityName
            state.mainPath = JSON.parse(localCityPath)
            axios.defaults.headers.common['x-position'] = action.payload
            state.geoStatus = 'done'
        },
        firstLoading: state => {
            localStorage.setItem('city_name', state.mainCity)
            localStorage.setItem('city_path', JSON.stringify(state.mainPath))
            const date = new Date()
            document.cookie = `position=${state.mainSlugCity}; path=/; expires=${date.setDate(date.getDate() + 365)}; samesite=lax`
            axios.defaults.headers.common['x-position'] = state.mainSlugCity
            state.geoStatus = 'done'
        }
    },
    extraReducers: {
        [fetchGetGeoList.pending]: (state) => {
            state.data.items = []
            state.data.status = 'loading'
        },
        [fetchGetGeoList.fulfilled]: (state, action) => {
            state.data.items = action.payload
            state.data.status = 'loaded'
        },
        [fetchGetGeoList.rejected]: (state, action) => {
            state.data.items = []
            state.data.status = 'error'
        }
    }
})


export const {showCities, hideCities,
    setMainCity, takeFromCookie, firstLoading} = GeoSlice.actions
export const GeoReducer = GeoSlice.reducer
