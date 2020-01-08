import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';

import Button from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


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
            <Button variant="contained" color="secondary" onClick={ props.onSave } >Save current conversion</Button>
            <i> Check last 20 conversions below. Click to restore.</i>
            <List dense style={{maxHeight: '200px', overflow: 'auto'}} >
                    { history.map( (item, idx) => (
                        <ListItem height='25px' button onClick={ ()=>{ props.onSelect( item ) } } >
                            <ListItemText> { JSON.stringify( item ) } </ListItemText>
                        </ListItem>
                    ))}
            </List>
        </div>
        
  );
}

export default History;