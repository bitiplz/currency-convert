import React from 'react';
import '../app.css';

function CurrencyList( props ) {

  return (
        <select value={ props.selected } onChange={ props.onSelect }>
            { props.data.map( opt => (<option key={opt} value={opt}>{opt}</option>) ) }
        </select>
  );
}

export default CurrencyList;