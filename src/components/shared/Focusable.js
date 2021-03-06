import React from 'react';
import { useAppStore } from '../../providers/AppProvider';
import { SET_FOCUS } from '../../providers/ActionTypes';
import styled from 'styled-components';

export default ({children, value, top, bottom}) => {
    const {state, dispatch} = useAppStore()

    const isFocused = state.focused === value

    return  <FocusBorder
                focused={ isFocused }
                onClick={ () => dispatch({ type: SET_FOCUS, focused : value }) }
            >
                { isFocused && top ? <TopMarker/> : null }
                    {children}
                { isFocused && bottom ? <BottomMarker/> : null }
            </FocusBorder>
}

const FocusBorder = styled.div.attrs(({focused=false}) =>({ style : {
    backgroundColor: focused ? 'rgba(66,66,66, 0.1)' : 'transparent',
}}))`
    display:inline-block;
    position:relative;
    height: 100%;
    width: 100%;
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