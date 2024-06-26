import { configureStore , combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import cartReducer from "./cartRedux";
import productReducer from "./productRedux";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  import storage from "redux-persist/lib/storage"; 

const persistconfig = {
    key: "root",
    version: 1,
    storage,        
};

const rootReducer =  combineReducers({
    user: userReducer,
    cart: cartReducer,
    product:productReducer,
});

const persistedReducer = persistReducer(persistconfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
    }),
});

export let persistor = persistStore(store);