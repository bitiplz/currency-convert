import React from 'react';
import * as firebase from 'firebase';
import firebaseConfig from '../apis/firebaseConfig';
import '../app.css';

firebase.initializeApp( firebaseConfig );

function Login( props ) {

    const loginWithGoogle = ()=>{
      firebase
      .auth()
      .signInWithPopup( new firebase.auth.GoogleAuthProvider() )
      .then( res => props.onLogin( res.user ) )
      .catch( err => {} );
    }

  return (

      <div position="static">
          <h4> Currency-Change </h4>
          {
              props.user ? `Hello ${props.user.displayName}.`
              : <button color="inherit" onClick={loginWithGoogle} >Login</button>
          }
      </div>
  );
}

export default Login;
