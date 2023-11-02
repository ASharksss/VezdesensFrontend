import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios, {create} from "axios";


const initialState = {
  Chats: {
    items: [],
    status: 'loading'
  },
  Messages: {
    items: [],
    status: 'loading'
  }
}

export const fetchAllChats =
  createAsyncThunk('getAllChats',
    async () => {
      const {data} = axios.get('api/chat/getDialogues')
      return data
    })

export const addChat =
  createAsyncThunk('addChat',
    async (data) => {
      await axios.post(
        'api/chat/addDialogues',
        data
      ).catch(err => {
        if (err.response.data.message) {
          alert(err.response.data.message)
        } else {
          alert("Ошибка обработки данных...")
        }
      })
    })


const ChatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllChats.pending]: (state) => {
      state.Chats.items = []
      state.Chats.status = 'loading'
    },
    [fetchAllChats.fulfilled]: (state, action) => {
      state.Chats.items = action.payload
      state.Chats.status = 'loaded'
    },
    [fetchAllChats.rejected]: (state) => {
      state.Chats.items = []
      state.Chats.status = 'error'
    }
  }
})

export const ChatsReducer = ChatsSlice.reducer