import React from 'react';
import * as firebase from 'firebase';
import firebaseConfig from '../apis/firebaseConfig';
import '../app.css';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

firebase.initializeApp( firebaseConfig );

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Login( props ) {

  const classes = useStyles();

    const loginWithGoogle = ()=>{
      firebase
      .auth()
      .signInWithPopup( new firebase.auth.GoogleAuthProvider() )
      .then( res => props.onLogin( res.user ) )
      .catch( err => {} );
    }

  return (

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} >
            Currency-Change
          </Typography>
          {
              props.user ? `Hello ${props.user.displayName}.`
              : <Button color="inherit" onClick={loginWithGoogle} >Login</Button>
          }
        </Toolbar>
      </AppBar>
  );
}

export default Login;
