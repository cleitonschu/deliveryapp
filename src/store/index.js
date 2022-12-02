import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import Reducers from "./reducers/index";

const persistedReducer = persistReducer(
  {
    key: "root",
    storage: AsyncStorage,
    whitelist: [
        "favoriteReducer"
    ],
    blacklist: [
      "apiReducer",
    ],
  },
  Reducers
);

const store = createStore(persistedReducer);

let persistor = persistStore(store);

export { store, persistor };
