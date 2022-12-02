import { combineReducers } from "redux";
import apiReducer from "./apiReducer";
import favoriteReducer from "./favoriteReducer";

export default combineReducers({
  apiReducer,
  favoriteReducer
});
