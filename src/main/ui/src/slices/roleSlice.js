import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    role: 'none'
};

export const roleSlice = createSlice({
    name: 'roleState',
    initialState,
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload
        },
        clearRole: (state) => {
            state.role = 'none'
        }
    }
})

export const {setRole, clearRole} = roleSlice.actions

export default roleSlice.reducer
