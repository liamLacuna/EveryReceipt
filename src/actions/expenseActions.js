import axios from "axios";
//Import constant action types
import { GET_EXPENSES, ADD_EXPENSE, DELETE_EXPENSE, EXPENSES_LOADING, SEARCH_EXPENSES } from "./types";

export const setItemsLoading = () => {
  return {
    type: EXPENSES_LOADING
  };
};

export const createExpenses = (expense) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: ADD_EXPENSE, expense });
  };
};

// export const sendQuery = (newQuery) => (dispatch) => {
//   axios
//     .get("/api/items/search/", { params: newQuery })
//     .then(res => {
//       dispatch({
//         type: SEARCH_EXPENSES,
//         payload: res.data
//       });
//     });
// };

// export const getItems = () => (dispatch) => {
//   dispatch(setItemsLoading());
//   axios.get("/api/items").then((res) =>
//     dispatch({
//       type: GET_EXPENSES,
//       payload: res.data
//     })
//   );
// };

// export const deleteItem = (id) => (dispatch) => {
//   axios.delete(`/api/items/${id}`).then(() =>
//     dispatch({
//       type: DELETE_EXPENSE,
//       payload: id
//     })
//   );
// };

// export const editItem = (item) => (dispatch) => {
//   // send post request to edit an s data
//   axios.post("/api/items", item).then((res) =>
//     dispatch({
//       type: ADD_EXPENSE,
//       payload: res.data
//     })
//   );
// };
