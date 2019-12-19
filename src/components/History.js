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
    <div className="section" >
        <a href='#' onClick={ props.onSave } > Click to save current conversion.</a>
        <i> Check last 20 conversions below. Click to restore.</i>
        <ul>
            { history.map( (item, idx) => (<li key={ idx } onClick={ ()=>{ props.onSelect( item ) } } > {JSON.stringify( item )} </li>) ) }
        </ul>
    </div>
        
  );
}

export default History;