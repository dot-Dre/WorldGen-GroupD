import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: 'none'
};

export const nameSlice = createSlice({
    name: 'nameState',
    initialState,
    reducers: {
        setPlayerName: (state, action) => {
            state.name = action.payload
        },
        clearPlayerName: (state) => {
            state.name = 'none'
        }
    }
})

export const {setPlayerName, clearPlayerName} = nameSlice.actions

export default nameSlice.reducer
