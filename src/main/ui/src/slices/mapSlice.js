import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    map: 'none'
};

export const mapSlice = createSlice({
    name: 'mapState',
    initialState,
    reducers: {
        setMap: (state, action) => {
            state.map = action.payload
        },
        clearMap: (state) => {
            state.map = 'none'
        }
    }
})

export const {setMap, clearMap} = mapSlice.actions

export default mapSlice.reducer
