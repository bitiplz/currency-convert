import React, { useEffect } from 'react';
import { useAppStore } from './AppProvider';
import { CHANGE_SELECTION, CURRENCIES_FETCHED, SAVE_SELECTION } from './ActionTypes';
import fx from 'money';
import fetchRates from '../apis/oexRates'
import CurrencyList from './CurrencyList'

import '../app.css';

export const SaveSelection = ( props ) => {
  const [ store, dispatchAction ] = useAppStore()

  return <button onClick={ () => dispatchAction({ type: SAVE_SELECTION }) } >Save</button>
}

export default function Converter( props ) {

  const [ store, dispatchAction ] = useAppStore()

  const {currencies, selection} = store
  const { from, to, amount } = selection;

  useEffect( ()=>{ fetchRates( onRatesFetched ) },[]);

  const setSelection = set => {
    dispatchAction({ type: CHANGE_SELECTION, selection : Object.assign( selection, set ) })
  }

  const onRatesFetched = res => {
    fx.rates = res.data.rates;
    dispatchAction({ type: CURRENCIES_FETCHED, currencies : Object.keys( fx.rates ).slice(0,40) })
  }

  return (
    <div>
      <CurrencyList
        data={ currencies }
        selected={ from }
        onSelect={ e => setSelection({ from: e.target.value }) }
      />
      
      <input style={{ width: '50px' }} label="From" value={ amount ? amount : "" } onChange={ e => setSelection({ amount: e.target.value }) } />
      
      <input style={{ width: '50px' }} label="To" disabled value={ currencies.length && amount ? fx.convert( amount, { from, to } ).toFixed(2) : "" } />
      
      <CurrencyList
        data={ currencies }
        selected={ to }
        onSelect={ e => setSelection({ to: e.target.value }) }
      />

    </div>
  );
}

export { Converter };
