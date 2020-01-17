import React from "react";
import styled from "styled-components";
import firebase from 'firebase/app';
import { useAppStore } from "../../providers/AppProvider";
import { CHANGE_SELECTION } from "../../providers/ActionTypes";
import UserContent from "../shared/UserContent";
import WheelSelect, { WheelButton, HoverArea }from '../ring/WheelSelect'

export default function(props) {
    const {state, dispatch} = useAppStore()

    const {selection} = state
    const match = state.history.find( ({from,to,amount}) => (
      from === selection.from
      && to === selection.to
      && amount === selection.amount
    ))

    return (
      <UserContent>
        <SaveSelection/>
        <WheelSelect
            size={ 200 }
            TemplateClass={ HistoryTemplate }
            data={ state.history }
            value={ match }
            onChange={ value => dispatch({ type: CHANGE_SELECTION, selection : value }) }
            hoverPattern={[1.2]}
            activeItemSize={1.4}
        />
      </UserContent>
    )
}


const SaveSelection = ( props ) => {
    const {state} = useAppStore()

    const saveToDb = () => {
      const db = firebase.firestore()
      const collection = db.collection('users').doc( state.user.uid ).collection('history')
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

    return  <HistoryButton size={50} onClick={ saveToDb } >
              + Save
            </HistoryButton>
  }


const HistoryTemplate = props =>
  <HistoryButton {...props} >
    { props.value.from }<br/>{props.value.to }
    <HoverArea/>
  </HistoryButton>

const HistoryButton = styled(WheelButton)`
  font-size: ${ ({size}) => size*0.45 }
  text-align: center;
  &:hover {
    border-color: black;
  }
`
