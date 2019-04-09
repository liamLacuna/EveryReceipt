//Import the constant types from our actions folder
import {
  GET_EXPENSES,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EXPENSES_LOADING,
  SEARCH_EXPENSES,
  EDIT_EXPENSE
} from "../actions/types";
  
const initialState = {
  expenses: [
  ],
  expenseQuery: null,
  loading: false
};

/**
 * This function handles the state of our application, based on the actions
 * taken from saleActions.js in the actions folder.
 * @param state in charge of handling the array of sold expenses from mongoDB
 * @param action specifies which action is to be carried out
 */
export default function (state = initialState, action) {
  switch (action.type) {
  case GET_EXPENSES:
    return {
      ...state,
      expenses: action.payload,
      loading: false
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload)
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [action.payload, ...state.expenses]
    };
  //   case EXPENSES_LOADING:
  //     return {
  //       ...state,
  //       loading: true
  //     };
  //   case SEARCH_EXPENSES:
  //     return {
  //       ...state,
  //       expenseQuery: action.payload
  //     };
  //   case EDIT_EXPENSE:
  //     return {
  //       ...state
  //     };
  default:
    return {
      ...state
    };
  }
}