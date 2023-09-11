import { configureStore } from '@reduxjs/toolkit'
import fileSliceReducer from './slices/fileSlice'
import gameCodeSliceReducer from './slices/gameCodeSlice'
import nameSliceReducer from './slices/playerNameSlice'
import roleSliceReducer from './slices/roleSlice'

/**
 * How to use the global store:
 *
 * accessing variables:
 * import { useSelector } from "react-redux";
 * const name = useSelector(
    (state) => state.* choose the state { fileState, gameCodeState, nameState, roleState } *.name
  );
 *
 * Setting a variable:
 * import { useDispatch } from "react-redux";
 * import { action from a slice } from "./slices/something"
 *
 * dispatch(action(value))
 */
export const store = configureStore({
    reducer: {
        fileState: fileSliceReducer,
        gameCodeState: gameCodeSliceReducer,
        nameState: nameSliceReducer,
        roleState: roleSliceReducer
    },
})
