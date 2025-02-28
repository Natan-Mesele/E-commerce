import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk} from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { authReducer } from "./Auth/Reducer";
import carReducer from "./car/Reducer";
import bookingReducer from "./booking/Reducer";
import reviewReducer from "./review/Reducer";
import weddingCarReducer from "./weddingcar/Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  cars: carReducer,
  bookings: bookingReducer,
  review: reviewReducer,
  weddingCar: weddingCarReducer
});

const persistConfig = {
  key: "root", 
  storage,    
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = legacy_createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);