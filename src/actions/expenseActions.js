//Import constant action types
import { GET_EXPENSES, ADD_EXPENSE, DELETE_EXPENSE, EXPENSES_LOADING, SEARCH_EXPENSES } from "./types";

export const setItemsLoading = () => {
  return {
    type: EXPENSES_LOADING
  };
};

export const addExpense = (expense) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    firestore.collection("users").doc(authorId).collection("expenses")
      .add({
        expense
      });
    dispatch({ type: ADD_EXPENSE, payload: expense });
  };
};

export const getExpenses = () => {
  let expenses = [];
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    
    firestore.collection("users").doc(authorId).collection("expenses")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let curr = doc.data().expense;
          let currObj = {
            id: doc.id,
            store: curr.store,
            items: curr.items,
            total: curr.total
          };
          // console.log(doc.data().expense.name);
          // console.log(doc.data().id, " -> ", doc.data().name);
          
          expenses.push(currObj);
        });
      }).then(() => {
        dispatch( { type: GET_EXPENSES, payload: expenses } );
      });
  };
};


/**
 * Referencing 
 * https://stackoverflow.com/questions/47876754/query-firestore-database-for-document-id
 *  - to find
 * https://stackoverflow.com/questions/47180076/how-to-delete-document-from-firestore-using-where-clause
 *  - to delete
 */
export const deleteExpense = (id) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    
    var result = firestore.collection("users")
      .doc(authorId).collection("expenses").doc(id);

    result.delete()
      .then(() => {
        dispatch( { type: DELETE_EXPENSE, payload: id } );
      });
  };
};

// export const deleteItem = (id) => (dispatch) => {
//   axios.delete(`/api/items/${id}`).then(() =>
//     dispatch({
//       type: DELETE_EXPENSE,
//       payload: id
//     })
//   );
// };

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

// export const editItem = (item) => (dispatch) => {
//   // send post request to edit an s data
//   axios.post("/api/items", item).then((res) =>
//     dispatch({
//       type: ADD_EXPENSE,
//       payload: res.data
//     })
//   );
// };
