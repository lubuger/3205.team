import {
    configureStore, ThunkAction, Action 
} from "@reduxjs/toolkit"
import fetchReducer from "../features/fetch/fetchSlice"

export const store = configureStore({
    reducer: {
        fetch: fetchReducer
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
