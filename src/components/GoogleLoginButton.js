import React from 'react';
import * as firebase from 'firebase';
import firebaseConfig from '../apis/firebaseConfig';
import { LOGIN, LOGOUT } from '../providers/ActionTypes';
import { useAppStore } from '../providers/AppProvider';

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
