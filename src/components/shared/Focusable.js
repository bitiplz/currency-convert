import React from 'react';
import { useAppStore } from '../../providers/AppProvider';
import { SET_FOCUS } from '../../providers/ActionTypes';
import styled from 'styled-components';

export default ({children, value}) => {
    const [ store, dispatchAction ] = useAppStore()

    return  <FocusBorder
                focused={ store.focused === value }
                onClick={ () => dispatchAction({ type: SET_FOCUS, focused : value }) }
            >
                {children}
            </FocusBorder>
}

const FocusBorder = styled.div.attrs(props =>({
    style : {
        backgroundColor: props.focused ? 'red' : 'transparent',
        border: props.focused ? '2px solid blue' : 0,
    },
  }))`
  width: 100%;
  height: 100%;
  `