import AsyncStorage from "@react-native-community/async-storage";
import { createStore } from "redux"
import { persistStore, persistReducer } from "redux-persist";

import Reducers from './reducers/index';

const persistedReducer = persistReducer({
  key: 'root',
  storage: AsyncStorage,
  whiteList: ['userReducer'],
}, Reducers,);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export {store, persistor};
