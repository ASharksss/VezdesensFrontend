import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchAllMessages = createAsyncThunk('getAllMessages',
  async () => {
    const {data} = await axios.get('api/chat/getMessages')
    return data
  }
)

export const addMessage = createAsyncThunk('addMessage', async (data) => {
  await axios.post(
    '/api/chat/addMessage',
    data
  ).then(res => {
    alert('Отправлено')
  })
    .catch(err => {
      alert(err)
    })
})


const initialState = {
  Messages: {
    items: [],
    status: 'loading'
  }
}

const chatSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllMessages.pending]: (state) => {
      state.Messages.items = []
      state.Messages.status = 'loading'
    },
    [fetchAllMessages.fulfilled]: (state) => {
      state.Messages.items = []
      state.Messages.status = 'loaded'
    },
    [fetchAllMessages.rejected]: (state) => {
      state.Messages.items = []
      state.Messages.status = 'error'
    }
  }
})

export const ChatReducer = chatSlice.reducer;