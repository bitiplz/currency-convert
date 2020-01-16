import React from 'react';
import { useAppStore } from '../../providers/AppProvider';

export default ({children}) => {
    const {state} = useAppStore()

    return state.user ? <div>{children}</div> : null
}
