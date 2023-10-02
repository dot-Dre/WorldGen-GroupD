import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    code: 'none'
};

export const gameCodeSlice = createSlice({
    name: 'gameCodeState',
    initialState,
    reducers: {
        setCode: (state, action) => {
            state.code = action.payload
        },
        clearCode: (state) => {
            state.code = 'none'
        }
    }
})

export const {setCode, clearCode} = gameCodeSlice.actions

export default gameCodeSlice.reducer
