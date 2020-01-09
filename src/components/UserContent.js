import React from 'react';
import { useAppStore } from './AppProvider';

export default ({children}) => {
    const [store] = useAppStore()

    return store.user ? <div>{children}</div> : null
}
