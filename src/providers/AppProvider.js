import React from 'react';
import { LOGIN, LOGOUT, CHANGE_SELECTION, CURRENCIES_FETCHED, HISTORY_CHANGED, SAVE_SELECTION, SET_FOCUS } from './ActionTypes';
import '../app.css';

import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../apis/firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

const AppContext = React.createContext();

function random(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function appReducer( state, action ) {

  console.log( action )

  switch (action.type) {
    case LOGIN: {
      console.log(action.user.uid);
      
      return {...state, user : action.user }
    }
    case LOGOUT: {
      return {...state, user : null }
    }
    case CHANGE_SELECTION: {
      return {...state, selection : action.selection}
    }
    case CURRENCIES_FETCHED: {
      const data = action.currencies
      return {...state,
                currencies: data,
                selection : {
                  from:data[ random(data.length-1) ],
                  to:data[ random(data.length-1) ],
                  amount: random(10),
                }
            }
    }
    case HISTORY_CHANGED: {
      return {...state, history: action.history }
    }
    case SAVE_SELECTION: {
      
      return state
    }
    case SET_FOCUS: {
      return {...state, focused: action.focused }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  } 

}

function AppProvider( props ) {

  const state = React.useReducer(  appReducer, {
    user: null,
    currencies:[],
    history : [],
    focused : 'from',
    selection:{
      from: "",
      to:"",
      amount:1,
    },
  });

  return (
    <AppContext.Provider value={ state } >
      { props.children }
    </AppContext.Provider>
  )
}

function useAppStore() {
  const context = React.useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppStore must be used within a AppProvider')
  }
  return context
}

export { useAppStore }

export default AppProvider