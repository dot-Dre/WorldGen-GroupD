import { configureStore } from '@reduxjs/toolkit'
import fileSliceReducer from './slices/fileSlice'

export const store = configureStore({
    reducer: {
        fileState: fileSliceReducer
    },
})
