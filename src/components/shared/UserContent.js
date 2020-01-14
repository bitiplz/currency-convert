import React from 'react';
import { useAppStore } from '../../providers/AppProvider';

export default ({children}) => {
    const [store] = useAppStore()

    return store.user ? <div>{children}</div> : null
}
