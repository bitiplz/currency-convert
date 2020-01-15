import React, { useEffect } from 'react';
import { HISTORY_CHANGED, CHANGE_SELECTION } from '../../providers/ActionTypes';
import { SaveSelection } from "../Converter";
import * as firebase from 'firebase';
import { useAppStore } from '../../providers/AppProvider';
import styled from 'styled-components';
import '../../app.css';



function History( props ) {
    
    const [ store, dispatchAction ] = useAppStore()
  
    useEffect( ()=>{
        firebase.firestore()
                .collection('users')
                .doc( store.user.uid )
                .collection('history')
                .onSnapshot(historyData => {
                    const data = []
                    historyData.forEach( item => data.push( item.data() ) )
                    dispatchAction( { type : HISTORY_CHANGED, history : data } )
                }, err => {
                    console.log(`Encountered error: ${err}`);
                }
        );

    }, [store.user])


  return (
        <HistoryBar>
            <span><i>Recent conversions:</i></span>
            <Slots>
                { store.history.map( (item, index) => (
                    <HistoryTile
                        key={index}
                        onClick={ () =>
                            dispatchAction( { type : CHANGE_SELECTION, selection : item } )
                        }  
                    >
                        {`${item.from}:${item.to}`}
                    </HistoryTile>
                ))}
                <HistoryTile >
                    <SaveSelection/>
                </HistoryTile>
            </Slots>
        </HistoryBar>
  );
}

export default History;

const HistoryBar = styled.div`
    z-index: 10;
    position: static;
    display: grid;
    background-color: rgba(255,255,255,0.8);
    width: 90%;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    margin: auto;
    padding: 8px;
    padding-top: 0;
    height: fit-content;

    -webkit-box-shadow: -4px 13px 8px -11px rgba(0,0,0,0.66);
    -moz-box-shadow: -4px 13px 8px -11px rgba(0,0,0,0.66);
    box-shadow: -4px 13px 8px -11px rgba(0,0,0,0.66);
`


const Slots = styled.div`
    cursor: pointer;
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat( auto-fill,minmax(55px,1fr));
`

const HistoryTile = styled.div`
    font-size: 10px;
    height: 18px;
    padding: 4px;
    line-height: 10px;
    border-radius: 5px;
    background-color: rgba(66, 66, 66, 0.2);
    &:hover{
        padding: 3px;
        border: 2px solid grey;
        background-color: rgba(66, 66, 66, 0.5); 
    }
`