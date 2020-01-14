import React from 'react';
import { useAppStore } from '../../providers/AppProvider';
import { SET_FOCUS } from '../../providers/ActionTypes';
import styled from 'styled-components';

export default ({children, value, top, bottom}) => {
    const [ store, dispatchAction ] = useAppStore()

    const isFocused = store.focused === value

    return  <FocusBorder
                focused={ isFocused }
                onClick={ () => dispatchAction({ type: SET_FOCUS, focused : value }) }
            >
                { isFocused && top ? <TopMarker/> : null }
                    {children}
                { isFocused && bottom ? <BottomMarker/> : null }
            </FocusBorder>
}

const FocusBorder = styled.div.attrs(props =>({
    style : {
        backgroundColor: props.focused ? 'rgba(66,66,66, 0.1)' : 'transparent',
    },
  }))`
  display:inline-block;
  position:relative;
  height: 100%;
  //border: 1px solid grey;
`

const TopMarker = styled.div`
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 10px 0 10px;
    border-color: #000000 transparent transparent transparent;
    margin: auto;
    margin-top: -10px;
`

const BottomMarker = styled.div`
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent #000000 transparent;
    margin: auto;
    margin-bottom: -10px;
`

  /*
      display:block;
    width: 10px;
    height: 10px;
    margin: auto;
    margin-bottom: -10px;
    background-color: black;
    position:relative;
  
  */