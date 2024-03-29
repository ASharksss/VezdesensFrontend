import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    alertMessage: ''
}
const AlertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, action) => {
            state.alertMessage = action.payload
        },
        closeAlert: (state) => {
            state.alertMessage = ''
        }
    }
})

export const AlertReducer = AlertSlice.reducer
export const {showAlert, closeAlert} = AlertSlice.actions
