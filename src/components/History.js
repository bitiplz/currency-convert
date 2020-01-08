import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';

import '../app.css';

function History( props ) {
    
    const [history, syncHisotry] = useState([]);

    useEffect( () => {
        if ( props.user ) {
            const userHistoryRef = firebase.database().ref(`/users/${props.user.uid}/history`); 
            userHistoryRef.limitToLast(20).on('value', onHistoryRemoteChange );
        }
    }, [props.user]);

    const onHistoryRemoteChange = historyData => {
        const data = historyData.val()
        if ( data )
            syncHisotry( Object.values( data ).reverse() )
    }

  return (
        <div>
            <button onClick={ props.onSave } >Save current conversion</button>
            <i> Check last 20 conversions below. Click to restore.</i>
            <ul style={{maxHeight: '200px', overflow: 'auto'}} >
                    { history.map( (item, idx) => (
                        <li height='25px' button onClick={ ()=>{ props.onSelect( item ) } } >
                            <button> { JSON.stringify( item ) } </button>
                        </li>
                    ))}
            </ul>
        </div>
        
  );
}

export default History;