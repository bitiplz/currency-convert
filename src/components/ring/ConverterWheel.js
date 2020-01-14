import React, { useEffect } from 'react';
import { useAppStore } from '../../providers/AppProvider';
import { CHANGE_SELECTION, CURRENCIES_FETCHED, SAVE_SELECTION } from '../../providers/ActionTypes';
import fx from 'money';
import fetchRates from '../../apis/oexRates'
import WheelSelect from './WheelSelect';
import CenterDisplay from './CenterDisplay';

import styled from 'styled-components';
import '../../app.css';

export default ( props ) => {

  const [ store, dispatchAction ] = useAppStore()

  const {currencies, selection} = store
  const { from, to, amount } = selection;

  useEffect( ()=>{ fetchRates( onRatesFetched ) },[]);

  const setSelection = set => {
    dispatchAction({ type: CHANGE_SELECTION, selection : Object.assign( selection, set ) })
  }

  const filterRates = raw => // do not use indexes like XAU
    Object.keys(raw)
      .filter( key => key[0] !== 'X' )
      .reduce((obj, key) => {
        obj[key] = raw[key];
        return obj;
  }, {});

  const onRatesFetched = res => {
    fx.rates = filterRates(res.data.rates)  //todo: reducer
    dispatchAction({ type: CURRENCIES_FETCHED, currencies : Object.keys( fx.rates ) })
  }

  return (
    <div
        style={{
          width: '100%',
          height: '100%',
          minHeight: '800px',
          display: 'flex',
        }}
      >
        <AbsolutePane h={800} style={{  }} >
          <Magnet id="MAGNET-for_debug-remove_this_id">
            <Glow/>
            <WheelSelect data={ currencies } value={ to } onChange={ v => setSelection({ to: v }) } splitBy={30} />
            <CenterDisplay value={ currencies.length ? fx.convert( amount, { from, to } ) : "" } />
          </Magnet>
        </AbsolutePane>
  
        </div> 
  );
}
/*

          <Magnet id="MAGNET-for_debug-remove_this_id">
            <Glow/>
            <WheelSelect data={ currencies } value={ from } onChange={ v => setSelection({ from: v }) } splitBy={11} />
          </Magnet>


*/

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

    -webkit-box-shadow: 0px 0px 250px 300px gold;
    -moz-box-shadow: 0px 0px 250px 300px gold;
    box-shadow: 0px 0px 350px 300px gold;
`;