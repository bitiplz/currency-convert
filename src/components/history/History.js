import React from "react";
import { CHANGE_SELECTION } from "../../providers/ActionTypes";
import firebase from 'firebase/app';
import { useAppStore } from "../../providers/AppProvider";
import styled from "styled-components";
import "../../app.css";

export default function(props) {
    const {state, dispatch} = useAppStore()

    return (
        <HistoryBar>
        <span>
            <i>{ state.history.length ? 'Recent conversions:' : 'Loading conversion history..'}</i>
        </span>
        <Slots>
          {
            state.history.length
            ? <HistoryTile>
                <SaveSelection /> 
              </HistoryTile>
            : null  
          } 

          {
            state.history.map((item, index) => (
              <HistoryTile
                key={index}
                onClick={() =>
                    dispatch({ type: CHANGE_SELECTION, selection: item })
                }
              >
                {`${item.from}:${item.to}`}
              </HistoryTile>
            ))
          }

        </Slots>
        </HistoryBar>
  );
}

const SaveSelection = ( props ) => {
    const {state} = useAppStore()

    const db = firebase.firestore()
    const collection = db.collection('users').doc( state.user.uid ).collection('history')
         
    return <SaveButton 
          onClick={ () => {
                const newItem = { ...state.selection, date:Date.now() }

                state.history.length < 10
                  ? collection.add( newItem )
                  : collection.orderBy('date','asc').limit(1).get().then( res => {
                    db.runTransaction( t => {
                        return t.get( res.docs[0].ref )
                                .then( doc => t.update( doc.ref, newItem ) )
                      }
                    )
                  })
                }
          }
        >
          +
        </SaveButton>
  }

const HistoryBar = styled.div`
  z-index: 10;
  position: static;
  display: grid;
  background-color: rgba(255, 255, 255, 0.8);
  width: 90%;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  margin: auto;
  padding: 8px;
  padding-top: 0;
  height: fit-content;

  -webkit-box-shadow: -4px 13px 8px -11px rgba(0, 0, 0, 0.66);
  -moz-box-shadow: -4px 13px 8px -11px rgba(0, 0, 0, 0.66);
  box-shadow: -4px 13px 8px -11px rgba(0, 0, 0, 0.66);
`;

const Slots = styled.div`
  cursor: pointer;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(55px, 1fr));
`;

const HistoryTile = styled.div`
  font-size: 10px;
  height: 18px;
  padding: 4px;
  line-height: 10px;
  border-radius: 5px;
  background-color: rgba(66, 66, 66, 0.2);
  &:hover {
    padding: 3px;
    border: 2px solid grey;
    background-color: rgba(66, 66, 66, 0.5);
  }
`;

const SaveButton = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  color: black;
  border: 1px dashed grey;
  width: 100%;
  line-height: 8px;
  height: 11px;
  &:hover {
    border-color: 2px dashed black;
    font-weight: 800;
  }
`
