import React from 'react';
import * as firebase from 'firebase';
import firebaseConfig from '../apis/firebaseConfig';
import { LOGIN, LOGOUT } from './ActionTypes';
import { useAppStore } from './AppProvider';

firebase.initializeApp( firebaseConfig );

const login = onLogin => {
  firebase
    .auth()
    .signInWithPopup( new firebase.auth.GoogleAuthProvider() )
    .then( res => onLogin( res.user ) )
    .catch( err => {} );
}

const logout = onLogout => {
    firebase
        .auth()
        .signOut()
        .then( onLogout )
        .catch(err => {});
}

export default props => {
    const [store, dispatchAction] = useAppStore()

    console.log("store.user", store)

    return store.user == null ?
            <button
                onClick={ () => login( user => dispatchAction( { type: LOGIN, user } ) ) }
            >
                Log In
            </button>
            :
            <button
                onClick={ () => logout( () => dispatchAction( { type: LOGOUT } ) ) }
            >
                Log Out
            </button>

}