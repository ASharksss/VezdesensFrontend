import {configureStore} from "@reduxjs/toolkit";
import {AdsReducer} from "./slices/boardSlice";


export const store = configureStore({
  reducer: {
    ads: AdsReducer
  }
})

export default store