import React from 'react';
import '../app.css';

function CurrencyList( props ) {
  return (
    <div>
        <select value={ props.selected } onChange={ props.onSelect }>
            { props.data.map( opt => (<option key={opt} value={opt}>{opt}</option>) ) }
        </select>
    </div>
  );
}

export default CurrencyList;