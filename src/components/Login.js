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
    <div  className="section" >
      <i className="google plus icon large"  onClick={loginWithGoogle} ></i>
      { props.user ?  `Hello ${props.user.displayName}.` : 'login' }
    </div>
  );
}

export default Login;
