import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    role: 'none'
};

export const roleSlice = createSlice({
    name: 'roleState',
    initialState,
    reducers: {
        setPlayerRole: (state, action) => {
            state.role = action.payload
        },
        clearPlayerRole: (state) => {
            state.role = 'none'
        }
    }
})

export const {setPlayerRole, clearPlayerRole} = roleSlice.actions

export default roleSlice.reducer
