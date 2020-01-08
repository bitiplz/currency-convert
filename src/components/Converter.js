import React, { useState, useEffect } from 'react';
import axios from 'axios';
import fx from 'money';
import * as firebase from 'firebase';
import fetchRates from '../apis/oexRates'
import CurrencyList from './CurrencyList'
import History from './History';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import WheelSelect from './WheelSelect';

import '../app.css';

const useStyles = makeStyles(theme => ({
  textField: {
    
  },
  card: {
    width: '50%',
    padding: '20px',
    marginTop: '40px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

function Converter( props ) {

  const [from, setFrom] = useState( "USD" );
  const [to, setTo] = useState( "HUF" );
  const [amount, setAmount] = useState( 0 );
  const [currencies, setCurrencies] = useState( [] );

  useEffect( ()=>{ fetchRates( onRatesFetched ) },[]);

  const setSelection = ( set )=>{
    setFrom( set.from );
    setTo( set.to );
    setAmount( set.amount );
  }

  const writeUserData = ()=>{
    if (props.user) { 
        const dbRef = firebase.database().ref();
        const historyPath = '/users/'+ props.user.uid +'/history/'

        return dbRef.update({
            [ historyPath + dbRef.push().key ] : { from, to, amount }
        })
    }
  }

  const onRatesFetched = ( res )=>{
    fx.rates = res.data.rates;
    setCurrencies( Object.keys( fx.rates ) );
  }

   const renderHistory = ()=>{
        if ( props.user )
            return (
              <Card className={ classes.card } >
                <CardContent>
                  <History user={ props.user } onSelect={ setSelection } onSave={ writeUserData } />
                </CardContent>
              </Card>
            );
        return ""
    }    

    const classes = useStyles();

  return (
    <div>

      <Card className={ classes.card }>
        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={2} align-items="center">
              <CurrencyList data={ currencies } selected={ from } onSelect={ e => setFrom( e.target.value ) } />
            </Grid>
            <Grid item xs={12} sm={4} >
              <TextField label="From" variant="outlined" value={ amount ? amount : "" } onChange={ e => setAmount( e.target.value ) } />
            </Grid>
            <Grid item xs={12} sm={4} >
              <TextField label="To" variant="outlined" disabled value={ currencies.length && amount ? fx.convert( amount, { from, to } ).toFixed(2) : "" } />
            </Grid>
            <Grid item xs={12} sm={2} >
              <CurrencyList data={ currencies } selected={ to } onSelect={ e => setTo( e.target.value ) } />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <div style={{
          border: '1px solid black',
          display: 'grid',
          width: '75%',
          margin: 'auto',
          gridTemplateRows: '1fr 1fr 1fr 1fr',
        }}>
        <select/>  
        <input/>
        <input/>
        <select/>
      </div>

      { renderHistory() }

      <WheelSelect data={ currencies } />

      </div>
  );
}

export default Converter;