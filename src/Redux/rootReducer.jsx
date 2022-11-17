import { combineReducers } from "redux";
import shopReducer from "./shopping/shopping-reducer";
const rootReducer = combineReducers({ shopReducer });
export default rootReducer;
