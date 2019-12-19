import React, { useState, useEffect } from 'react';
import axios from 'axios';
import fx from 'money';
import * as firebase from 'firebase';
import fetchRates from '../apis/oexRates'
import CurrencyList from './CurrencyList'
import History from './History';

import '../app.css';

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
            return <History user={ props.user } onSelect={ setSelection } onSave={ writeUserData } />
        return ""
    }    


  return (
    <div  className="section" >
        <div>
            <CurrencyList data={ currencies } selected={ from } onSelect={ e => setFrom( e.target.value ) } />
            <input type="number" value={ amount ? amount : "" } onChange={ e => setAmount( e.target.value ) } />
        </div>

        <div>
            <input disabled value={ currencies.length && amount ? fx.convert( amount, { from, to } ).toFixed(2) : "" }/>
            <CurrencyList data={ currencies } selected={ to } onSelect={ e => setTo( e.target.value ) } /> 
        </div>

        { renderHistory() }
    </div>
  );
}

export default Converter;