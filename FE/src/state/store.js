import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from 'redux-thunk';
import { userReducer } from "./userSlice";
const persistConfig = {
    key: "root",
    version: 1,
    storage,
};
const rootReducer = combineReducers({ user: userReducer})
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
})
export let persistor = persistStore(store);
