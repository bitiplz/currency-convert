import React, { useEffect } from 'react';
import { HISTORY_CHANGED } from './ActionTypes';
import UserContent from './UserContent';
import * as firebase from 'firebase';
import { useAppStore } from './AppProvider';
import '../app.css';

function History( props ) {
    
    const [ store, dispatchAction ] = useAppStore()

    useEffect( () => {
        if ( store.user ) {
            const userHistoryRef = firebase.database().ref(`/users/${store.user.uid}/history`); 
            userHistoryRef.limitToLast(20).on('value', onHistoryRemoteChange );
        }
    }, [store.user]);

    const onHistoryRemoteChange = historyData => {
        dispatchAction( { type : HISTORY_CHANGED, history : Object.values( historyData.val() || [] ).reverse()} )
    }

  return (
        <UserContent>
                <button onClick={ props.onSave } >Save current conversion</button>
                <i> Check last 20 conversions below. Click to restore.</i>
                <ul style={{maxHeight: '200px', overflow: 'auto'}} >
                        { store.history.map( (item, idx) => (
                            <li height='25px' button onClick={ ()=>{ props.onSelect( item ) } } >
                                <button> { JSON.stringify( item ) } </button>
                            </li>
                        ))}
                </ul>
        </UserContent>
  );
}

export default History;