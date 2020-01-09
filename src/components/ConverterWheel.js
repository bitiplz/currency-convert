import React, { useEffect } from 'react';
import { useAppStore } from './AppProvider';
import { CHANGE_SELECTION, CURRENCIES_FETCHED, SAVE_SELECTION } from './ActionTypes';
import fx from 'money';
import fetchRates from '../apis/oexRates'
import WheelSelect from './WheelSelect';

import styled from 'styled-components';
import '../app.css';

export default ( props ) => {

  const [ store, dispatchAction ] = useAppStore()

  const {currencies, selection} = store
  const { from, to, amount } = selection;

  useEffect( ()=>{ fetchRates( onRatesFetched ) },[]);

  const setSelection = set => {
    dispatchAction({ type: CHANGE_SELECTION, selection : Object.assign( selection, set ) })
  }

  const onRatesFetched = res => {
    fx.rates = res.data.rates;
    dispatchAction({ type: CURRENCIES_FETCHED, currencies : Object.keys( fx.rates ) })
  }

  return (
    <div
        style={{
          width: '100%',
          height: '100%',
          minHeight: 800,
          display: 'flex',
        }}
      >
        <AbsolutePane h={650} style={{  }} >
          <Magnet id="MAGNET-for_debug-remove_this_id">
            <Glow/>
            <WheelSelect data={ currencies.slice(31,70) } value={ from } onChange={ v => setSelection({ from: v }) } dotRadius={40} ringRadiusAdj={ 10 } />
            <WheelSelect data={ currencies.slice(0,30) } value={ to } onChange={ v => setSelection({ to: v }) } dotRadius={40} ringRadiusAdj={ 30 } />
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
                    fontSize: '20px',
                    width: '100%',
                    alignSelf: 'center',
                    fontFamily: `'Do Hyeon', sans-serif`,
                  }}
                >
                  1.123.456.789,10 
                </label>
              </div>
            </Magnet>
          </AbsolutePane>
  
        </div> 
  );
}

const AbsolutePane = styled.div`
  width: 100%;
  height: 100%;
  min-height: ${ props => props.h || 800 }px;
  display: grid;
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
