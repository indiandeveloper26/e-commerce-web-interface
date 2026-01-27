// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authslice";
import productsReducer from "./productsSlice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
    },
});
