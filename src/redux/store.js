import {configureStore} from "@reduxjs/toolkit";
import {AdsReducer} from "./slices/boardSlice";
import {ChatsReducer} from "./slices/chatSlice";
import {AdReducer, CategoriesReducer} from "./slices/adSlice";
import {UserReducer} from "./slices/userSlice";


export const store = configureStore({
  reducer: {
    ads: AdsReducer,
    ad: AdReducer,
    chats: ChatsReducer,
    categories: CategoriesReducer,
    user: UserReducer
  }
})

export default store