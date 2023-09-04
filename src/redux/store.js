import {configureStore} from "@reduxjs/toolkit";
import {AdsReducer} from "./slices/boardSlice";
import {ChatReducer} from "./slices/chatSlice";


export const store = configureStore({
  reducer: {
    ads: AdsReducer,
    chat: ChatReducer
  }
})

export default store