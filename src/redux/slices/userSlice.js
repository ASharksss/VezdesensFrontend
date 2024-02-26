import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLogin = createAsyncThunk('auth/login', async (loginData) => {
    const {data} = await axios.post('api/user/login', loginData)
        .catch(error => {
            throw error.response.data
        })
    return data
})

export const fetchRegistration = createAsyncThunk('auth/login', async (regData) => {
    const {data} = await axios.post('api/user/registration', regData)
        .catch(error => {
            throw error.response.data
        })
    return data
})

export const fetchAuth = createAsyncThunk('auth/check/token', async (token) => {
    const {data} = await axios.get(`api/user/auth?token=${token}`)
    return data
})


const initialState = {
    user: {
        items: [],
        token: '',
        username: '',
        errorMsg: '',
        status: 'loading'
    },
    isAuth: false
}


const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchLogin.pending]: (state) => {
            state.user.items = []
            state.isAuth = false
            state.user.token = ''
            state.user.errorMsg = ''
            state.user.username = ''
            state.user.status = 'loading'
        },
        [fetchLogin.fulfilled]: (state, action) => {
            state.user.token = action.payload.token
            state.user.username = action.payload.username
            state.isAuth = true
            state.user.errorMsg = ''
            state.user.items = action.payload.profile
            axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`
            const date = new Date()
            document.cookie = `session=${action.payload.token}; path=/; expires=${date.setDate(date.getDate() + 365)}`
            document.cookie = `username=${action.payload.username}; path=/; expires=${date.setDate(date.getDate() + 365)}`
            state.user.status = 'loaded'
        },
        [fetchLogin.rejected]: (state, action) => {
            state.user.items = []
            state.isAuth = false
            state.user.token = ''
            state.user.errorMsg = action.error.message
            state.user.username = ''
            state.user.status = 'error'
        },
        [fetchRegistration.pending]: (state) => {
            state.user.items = []
            state.isAuth = false
            state.user.token = ''
            state.user.errorMsg = ''
            state.user.username = ''
            state.user.status = 'loading'
        },
        [fetchRegistration.fulfilled]: (state, action) => {
            state.user.token = action.payload.token
            state.user.username = action.payload.username
            state.user.items = action.payload.profile
            state.isAuth = true
            state.user.errorMsg = ''
            const date = new Date()
            document.cookie = `session=${action.payload.token}; path=/; expires=${date.setDate(date.getDate() + 365)}`
            document.cookie = `username=${action.payload.username}; path=/; expires=${date.setDate(date.getDate() + 365)}`
            state.user.status = 'loaded'
        },
        [fetchRegistration.rejected]: (state, action) => {
            state.user.items = []
            state.isAuth = false
            state.user.token = ''
            state.user.errorMsg = action.error.message
            state.user.username = ''
            state.user.status = 'error'
        },
        [fetchAuth.pending]: (state) => {
            state.user.items = []
            state.isAuth = false
            state.user.token = ''
            state.user.username = ''
            state.user.status = 'loading'
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.user.items = action.payload.profile
            state.user.token = action.payload.token
            state.user.username = action.payload.username
						axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`
            state.isAuth = true
            state.user.status = 'loaded'
        },
        [fetchAuth.rejected]: (state) => {
            state.user.items = []
            state.isAuth = false
            state.user.token = ''
            state.user.username = ''
            state.user.status = 'error'
        }
    }
})

export const UserReducer = UserSlice.reducer
