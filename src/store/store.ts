import { configureStore } from "@reduxjs/toolkit";
import GlobalReducer from "./slices/GlobalSlice";
import PdfReducer from "./slices/PdfSlice";

export const store = configureStore({
    reducer: {
        GlobalReducer,
        PdfReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;