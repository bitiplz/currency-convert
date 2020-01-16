import React from "react";
import firebase from 'firebase/app';
import { useAppStore } from "../providers/AppProvider";

export default props => {
    const {state} = useAppStore()

  return state.user == null ? (
    <button
      onClick={ () => firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()) }
    >
      Log In
    </button>
  ) : (
    <button onClick={ () => firebase.auth().signOut() }>
      Log Out
    </button>
  );
};
