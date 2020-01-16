import React, { useEffect } from "react";
import {
  LOGIN,
  LOGOUT,
  CHANGE_SELECTION,
  FETCH_CURRENCIES,
  CURRENCIES_FETCHED,
  FETCH_HISTORY,
  HISTORY_CHANGED,
  SAVE_SELECTION,
  SET_FOCUS
} from "./ActionTypes";
import "../app.css";
import fetchRates from '../apis/oexRates'
import fx from 'money';

import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from '../apis/firebaseConfig'

firebase.initializeApp( firebaseConfig )

const AppContext = React.createContext();

export default function(props) {

  const [state,dispatch] = React.useReducer(appReducer, {
    user: null,
    currencies: [],
    fetchingCurrencies: false,
    fetchingHistory: false,
    history: [],
    focused: "from",
    selection: {
      from: "",
      to: "",
      amount: 1,
    },
  });

  useEffect( ()=>{
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        dispatch({ type: LOGIN, user })
      } else {
        dispatch({ type: LOGOUT })
      }
    });
  },[])

  useEffect( ()=>{
    dispatch({ type: FETCH_CURRENCIES })

    fetchRates( ({data}) => {
      dispatch({ type: CURRENCIES_FETCHED, currencies : data.rates })
    })

  },[]);

  useEffect(() => {   //TODO: test
    if (state.user){
      dispatch({ type: FETCH_HISTORY })

      firebase
        .firestore()
        .collection("users")
        .doc(state.user.uid)
        .collection("history")
        .orderBy('date')
        .onSnapshot( result => {
            const data = [];
            result.forEach(item => data.unshift(item.data()));
            dispatch({ type: HISTORY_CHANGED, history: data });
          },
          err => {
            console.log(`Encountered error: ${err}`);
          }
        );

    }
  }, [state.user]);

  return (
    <AppContext.Provider value={{state,dispatch}}>{props.children}</AppContext.Provider>
  );
}

const random = max =>
  Math.floor(Math.random() * Math.floor(max));


const filterRates = raw =>  // do not use indexes like XAU
  Object.keys(raw)
    .filter(key => key[0] !== "X")
    .reduce((obj, key) => { obj[key] = raw[key]; return obj;}, {});

function appReducer(state, action) {
  console.log(action);

  switch (action.type) {
    case LOGIN: {
      return { ...state, user: action.user };
    }
    case LOGOUT: {
      return { ...state, user: null, history: [] };
    }
    case CHANGE_SELECTION: {
      const newSelection = Object.assign( {...state.selection}, action.selection )
      return { ...state, selection : {...newSelection } };
    }
    case FETCH_CURRENCIES: {
      return { ...state, fetchingCurrencies:true };
    }
    case CURRENCIES_FETCHED: {
      const data = action.currencies;
      fx.rates = data;
      const filtered = Object.keys(filterRates(data))
      return {
        ...state,
        fetchingCurrencies: false,
        currencies: filtered,
        selection: {
          from: filtered[random(filtered.length - 1)],
          to: filtered[random(filtered.length - 1)],
          amount: random(10),
        }
      };
    }
    case FETCH_HISTORY: {
      return { ...state, fetchingHistory: true };
    }
    case HISTORY_CHANGED: {
      return { ...state, history: action.history, fetchingHistory:false };
    }
    case SAVE_SELECTION: {
      return state;
    }
    case SET_FOCUS: {
      return { ...state, focused: action.focused };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function useAppStore() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppStore must be used within a AppProvider");
  }
  return context;
}

export { useAppStore };
