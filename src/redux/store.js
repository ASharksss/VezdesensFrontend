import {configureStore} from "@reduxjs/toolkit";
import {AdsReducer} from "./slices/boardSlice";
import {ChatsReducer} from "./slices/chatSlice";
import {AdReducer} from "./slices/adSlice";


export const store = configureStore({
  reducer: {
    ads: AdsReducer,
    ad: AdReducer,
    chats: ChatsReducer
  }
})

export default store