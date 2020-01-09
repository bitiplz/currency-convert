import React, { useState, useEffect } from 'react';
import fx from 'money';
import * as firebase from 'firebase';
import fetchRates from '../apis/oexRates'
import CurrencyList from './CurrencyList'
import History from './History';
import WheelSelect from './WheelSelect';

import styled from 'styled-components';
import '../app.css';
import { Redirect } from 'react-router-dom';

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
          <Magnet id="MAGNET-for_debug-remove_this_id">
            <Glow/>
            <WheelSelect data={ currencies.slice(31,70) } value={ from } onChange={ v => setFrom( v ) } dotRadius={40} ringRadiusAdj={ 10 } />
            <WheelSelect data={ currencies.slice(0,30) } value={ to } onChange={ v => setTo( v ) } dotRadius={40} ringRadiusAdj={ 30 } />
            <div
              style={{
                width: '300px',
                height: '150px',
                display: 'grid',
                position: 'absolute',
                top: '-20px',
                right: '-150px',
                textAlign: 'center',
              }}
            >
              <label
                style={{
                  display:'block',
                  color: 'rgb(66,66,66)',
                  fontSize: '150px',
                  width: '100%',
                  alignSelf: 'center',
                  fontFamily: `'Do Hyeon', sans-serif`,
                }}
              >
                { currencies.length && amount ? fx.convert( amount, { from, to } ).toFixed(2) : "" }
              </label>
              <label
                style={{
                  display:'block',
                  color: 'rgb(66,66,66)',
                  fontSize: '150px',
                  width: '100%',
                  alignSelf: 'center',
                  fontFamily: `'Do Hyeon', sans-serif`,
                }}
              >
                { /*currencies.length && amount ? fx.convert( amount, { from, to } ).toFixed(2) : ""*/ }
                {/*'999K'*/} 
              </label>
              <label
                style={{
                  display:'block',
                  color: 'rgb(66,66,66)',
                  fontSize: '20px',
                  width: '100%',
                  alignSelf: 'center',
                  fontFamily: `'Do Hyeon', sans-serif`,
                }}
              >
                { /*currencies.length && amount ? fx.convert( amount, { from, to } ).toFixed(2) : ""*/ }
                1.123.456.789,10 
              </label>
            </div>
          </Magnet>
        </AbsolutePane>

        <AbsolutePane h={200}>
          <Magnet id="MAGNET-for_debug-remove_this_id">
            <WheelSelect dotRadius={50} ringRadiusAdj={ 10 } />
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

const Glow = styled.div`
    width: 0;
    height: 0;
    border-radius: 50%;

    -webkit-box-shadow: 0px 0px 250px 300px white;
    -moz-box-shadow: 0px 0px 250px 300px white;
    box-shadow: 0px 0px 250px 250px white;
`;