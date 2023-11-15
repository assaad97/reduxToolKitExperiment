import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger';
import counterReducer from './counterSlice'
export const store = configureStore({
    reducer: {
        counter: counterReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
            .concat(logger),
    devTools: true,
})

// Infer the `RootState` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
