import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    generation: 'none'
};

export const generationDetailsSlice = createSlice({
    name: 'generationDetailsState',
    initialState,
    reducers: {
        setGenerationDetails: (state, action) => {
            state.generation = action.payload
        },
        clearGenerationDetails: (state) => {
            state.generation = 'none'
        }
    }
})

export const {setGenerationDetails, clearGenerationDetails} = generationDetailsSlice.actions

export default generationDetailsSlice.reducer
