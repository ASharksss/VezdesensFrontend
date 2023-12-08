import {configureStore} from "@reduxjs/toolkit";
import {BoardReducer} from "./slices/boardSlice";
import {ChatsReducer} from "./slices/chatSlice";
import {AdReducer} from "./slices/adSlice";
import {UserReducer} from "./slices/userSlice";
import {CategoriesReducer} from "./slices/categorySlice";
import {CharacteristicReducer} from "./slices/admin/characterSlice";


export const store = configureStore({
  reducer: {
    board: BoardReducer,
    ad: AdReducer,
    chats: ChatsReducer,
    categories: CategoriesReducer,
    user: UserReducer,
    characteristics: CharacteristicReducer
  }
})

export default store