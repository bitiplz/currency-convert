import React from 'react';
import { LOGIN, LOGOUT, CHANGE_SELECTION, CURRENCIES_FETCHED, HISTORY_CHANGED, SAVE_SELECTION } from './ActionTypes';
import '../app.css';

const AppContext = React.createContext();

function appReducer( state, action ) {

  console.log( action )

  switch (action.type) {
    case LOGIN: {
      return {...state, user : action.user }
    }
    case LOGOUT: {
      return {...state, user : null }
    }
    case CHANGE_SELECTION: {
      return {...state, selection : action.selection}
    }
    case CURRENCIES_FETCHED: {
      return {...state, currencies: action.currencies }
    }
    case HISTORY_CHANGED: {
      return {...state, history: action.history }
    }
    case SAVE_SELECTION: {
      return state
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  } 

}

function AppProvider({children}) {

  const state = React.useReducer(  appReducer, {
    user:null,
    currencies:[],
    history : [],
    selection:{
      from: "HUF",
      to:"BMD",
      amount:0,
    },
  });

  return (
    <AppContext.Provider value={ state } >
      { children }
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



export {AppProvider, useAppStore }
