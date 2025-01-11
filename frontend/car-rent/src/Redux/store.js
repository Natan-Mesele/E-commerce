import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk} from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { authReducer } from "./Auth/Reducer";

const rootReducer = combineReducers({
  auth: authReducer
});

const persistConfig = {
  key: "root", 
  storage,    
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = legacy_createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);