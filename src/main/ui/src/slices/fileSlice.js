import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    file: 'none'
};

export const fileSlice = createSlice({
    name: 'fileState',
    initialState,
    reducers: {
        setFile: (state, action) => {
            state.file = action.payload
        },
        clearFile: (state) => {
            state.file = 'none'
        }
    }
})

export const {setFile, clearFile} = fileSlice.actions

export default fileSlice.reducer
