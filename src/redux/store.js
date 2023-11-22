import {configureStore} from "@reduxjs/toolkit";
import {BoardReducer} from "./slices/boardSlice";
import {ChatsReducer} from "./slices/chatSlice";
import {AdReducer} from "./slices/adSlice";
import {UserReducer} from "./slices/userSlice";
import {CategoriesReducer} from "./slices/categorySlice";


export const store = configureStore({
  reducer: {
    board: BoardReducer,
    ad: AdReducer,
    chats: ChatsReducer,
    categories: CategoriesReducer,
    user: UserReducer
  }
})

export default store