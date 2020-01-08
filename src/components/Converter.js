import React, { useState, useEffect } from 'react';
import fx from 'money';
import * as firebase from 'firebase';
import fetchRates from '../apis/oexRates'
import CurrencyList from './CurrencyList'
import History from './History';
import WheelSelect from './WheelSelect';

import styled from 'styled-components';
import '../app.css';

function Converter( props ) {

  const [from, setFrom] = useState( "HUF" );
  const [to, setTo] = useState( "BMD" );
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
        return null
    }    

  return (
    <div>
      <CurrencyList data={ currencies.slice(31,70) } selected={ from } onSelect={ e => setFrom( e.target.value ) } />
      <input label="From" value={ amount ? amount : "" } onChange={ e => setAmount( e.target.value ) } />
      <input label="To" disabled value={ currencies.length && amount ? fx.convert( amount, { from, to } ).toFixed(2) : "" } />
      <CurrencyList data={ currencies.slice(0,30) } selected={ to } onSelect={ e => setTo( e.target.value ) } />

      { renderHistory() }

      <div
        style={{
          width: '100%',
          height: '100%',
          minHeight: 800,
          display: 'flex',
        }}
      >
        <AbsolutePane h={600}>
          <Magnet>
            <WheelSelect data={ currencies.slice(31,70) } value={ from } onChange={ v => setTo( v ) } dotRadius={40} ringRadiusAdj={ 10 } />
            <WheelSelect data={ currencies.slice(0,30) } value={ to } onChange={ v => setTo( v ) } dotRadius={40} ringRadiusAdj={ 30 } />
          </Magnet>
        </AbsolutePane>
      </div>  

      </div>
  );
}

export default Converter;


const AbsolutePane = styled.div`
  width: 100%;
  height: 100%;
  min-height: ${ props => props.h || 800 }px;
  display: flex;
`;

const Magnet = styled.div`
    position: relative;
    display: flex;
    width: 0;
    height: 0;
    align-self: center;
    margin: auto;
`;