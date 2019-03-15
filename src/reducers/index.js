import { combineReducers } from "redux";
import expenseReducer from "./expenseReducer";

export default combineReducers({
  expense: expenseReducer,
  //auth: authReducer
});
