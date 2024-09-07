import { configureStore } from "@reduxjs/toolkit";
import GlobalReducer from "./slices/GlobalSlice";

export const store = configureStore({
    reducer: {
        GlobalReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;