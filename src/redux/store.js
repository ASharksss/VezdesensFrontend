import {configureStore} from "@reduxjs/toolkit";
import {AdsReducer} from "./slices/boardSlice";
import {ChatsReducer} from "./slices/chatSlice";
import {AdReducer, CategoriesReducer} from "./slices/adSlice";


export const store = configureStore({
  reducer: {
    ads: AdsReducer,
    ad: AdReducer,
    chats: ChatsReducer,
    categories: CategoriesReducer
  }
})

export default store