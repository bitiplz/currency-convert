import React from 'react';
import { useAppStore } from '../providers/AppProvider';
import { CHANGE_SELECTION } from '../providers/ActionTypes';
import fx from 'money';
import CurrencyList from './CurrencyList'
import Focusable from './shared/Focusable'

export default function Converter( props ) {

  const {state, dispatch} = useAppStore()
  const {currencies, selection} = state;
  const { from, to, amount } = selection;
  const calculatedAmount = currencies.length ? fx.convert(amount, { from, to }) : 0;

  return (
    <div>
        <CurrencyList
          data={ currencies }
          selected={ from }
          onSelect={ e => dispatch({ type: CHANGE_SELECTION, selection : { from: e.target.value } }) }
        />
      
      <input
        style={{ width: '50px' }}
        value={ amount ? amount : "" }
        onChange={ e => dispatch({ type: CHANGE_SELECTION, selection : { amount: e.target.value } }) }
      />
      
      <input
        style={{ width: '50px' }}
        disabled
        value={ calculatedAmount }
      />
      
        <CurrencyList
          data={ currencies }
          selected={ to }
          onSelect={ e => dispatch({ type: CHANGE_SELECTION, selection : { to: e.target.value } }) }
        />

    </div>
  );
}

export { Converter };
