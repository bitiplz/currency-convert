import React from 'react';
import { LOGIN, LOGOUT, CHANGE_SELECTION, CURRENCIES_FETCHED, HISTORY_CHANGED, SAVE_SELECTION, SET_FOCUS } from './ActionTypes';
import '../app.css';

const AppContext = React.createContext();

function random(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

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

function AppProvider({children}) {

  const state = React.useReducer(  appReducer, {
    user: window.localStorage.getItem('currency-converter-user'),
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
