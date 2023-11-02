import {configureStore} from "@reduxjs/toolkit";
import {AdsReducer} from "./slices/boardSlice";
import {ChatsReducer} from "./slices/chatSlice";


export const store = configureStore({
  reducer: {
    ads: AdsReducer,
    chats: ChatsReducer
  }
})

export default store