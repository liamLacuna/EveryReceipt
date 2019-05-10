//Import constant action types
import { 
  GET_EXPENSES, 
  ADD_EXPENSE, 
  DELETE_EXPENSE, 
  EXPENSES_LOADING, 
  EDIT_EXPENSE, 
  SEARCH_EXPENSES,
  GET_TOTAL_PRICE
} from "./types";
import { key } from "../config/api_key";

sorter = (arr) => {
  return arr.sort(
    (a,b) => 
      (parseInt(a.timestamp) > parseInt(b.timestamp)) ? -1 : 
        ((parseInt(b.timestamp) > parseInt(a.timestamp)) ? 1 
          : 0)); 
};

export const setItemsLoading = () => {
  return {
    type: EXPENSES_LOADING
  };
};

export const handleCloudOCR = async (uri) => {

  const parsedObj = {
    total: "",
    store: ""
  };

  try {
    let body = JSON.stringify({
      requests: [
        {
          features: [
            { type: "DOCUMENT_TEXT_DETECTION", maxResults: 10 },
          ],
          image: {
            content: uri
          }
        }
      ]
    });
    let response = await fetch(
      "https://vision.googleapis.com/v1/images:annotate?key=" +
        key,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: body
      }
    );

    let store = null;

    let test = JSON.stringify(response);
    test = 
      test.substring(
        test.lastIndexOf("\"text\\"), test.lastIndexOf("}"));
    test = test.split("\\n");

    let result = -1;
    for(var i in test) {
      if(test[i].toLowerCase().indexOf("total") !== -1 &&
      test[i].toLowerCase().indexOf("subtotal") === -1) {
        let total = test[i].match(/\d+(?:\.\d+)?/g);
        if(total !== null) {
          result = total[0];
        }
        break;
      }
      if (test[i].toLowerCase().includes("walmart")) {
        store = "Walmart";
      } else if (test[i].toLowerCase().includes("target")) {
        store = "Target";
      } else if (test[i].toLowerCase().includes("walgreens")) {
        store = "Walgreens";
      }
    }

    parsedObj.total = result === -1 ? "" : result;
    parsedObj.store = store === null ? "" : store;
  } catch(err) { }

  return parsedObj;  
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
            timestamp: curr.timestamp,
            total: curr.total
          };
          expenses.push(currObj);
        });
      }).then(() => {
        expenses = sorter(expenses);
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

export const editExpense = (id, expense) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    
    var result = firestore.collection("users")
      .doc(authorId).collection("expenses").doc(id);

    result.update({expense})
      .then(() => {
        dispatch( { type: EDIT_EXPENSE, payload: id } );
      });
  };
};

export const searchExpenses = (queryType, query) => {
  let searchResults = [];
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

          if(queryType === "store") {
            if(currObj.store.toLowerCase().includes(query.toLowerCase())) {
              searchResults.push(currObj);
            }
          } else if (queryType === "price-greater-than") {
            if(parseFloat(currObj.total) >= parseFloat(query)) {
              searchResults.push(currObj);
            }
          } else if (queryType === "price-less-than") {
            if(parseFloat(currObj.total) <= parseFloat(query)) {
              searchResults.push(currObj);
            }
          }
        });
      }).then(() => {
        dispatch( { type: SEARCH_EXPENSES, payload: searchResults } );
      });
  };
};


export const getTotalPrice = () => {
  let total = 0;
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    
    firestore.collection("users").doc(authorId).collection("expenses")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let curr = doc.data().expense;
          total += parseFloat(curr.total);
        });
      }).then(() => {
        dispatch( { type: GET_TOTAL_PRICE, payload: total.toFixed(2) } );
      });
  };
};
