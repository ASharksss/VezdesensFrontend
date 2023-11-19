import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLogin = createAsyncThunk('auth/login', async (loginData) => {
    const {data} = await axios.post('api/user/login', loginData)
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
            state.user.username = ''
            state.user.status = 'loading'
        },
        [fetchLogin.fulfilled]: (state, action) => {
            state.user.token = action.payload.token
            state.user.username = action.payload.username
            state.isAuth = true
            const date = new Date()
            document.cookie=`session=${action.payload.token}; path=/; expires=${date.setDate(date.getDate() + 365)}`
            document.cookie=`username=${action.payload.username}; path=/; expires=${date.setDate(date.getDate() + 365)}`
            state.user.status = 'loaded'
        },
        [fetchLogin.rejected]: (state) => {
            state.user.items = []
            state.isAuth = false
            state.user.token = ''
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
