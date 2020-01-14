import React from 'react';
import styled from 'styled-components';

const shortFormat = ( n ) => {
    switch (true){
        case n<0 : { return n.toFixed(3) }
        case (n>9999999999999) : return "..."
        case (n>9999999999) : return ( n/1000000000 ).toFixed(1) + "B"
        case (n>9999999) : return ( n/1000000 ).toFixed(1) + "M"
        case (n>9999) : return ( n/1000 ).toFixed(1) + "K"
        case (n>999) : return n.toFixed(0)
        case (n>99) : return n.toFixed(1)
        case (n>9) : return n.toFixed(2)
        case (n>0) : return n.toFixed(3)
        default : return ""
    }
}

const separatedFormat = ( n ) => n

export default function( props ) {
    return (
        <div
              style={{
                width: '300px',
                height: '150px',
                display: 'grid',
                position: 'absolute',
                top: '-20px',
                right: '-150px',
                textAlign: 'center',
              }}
            >
              <label
                style={{
                  display:'block',
                  color: 'rgb(66,66,66)',
                  fontSize: '130px',
                  width: '100%',
                  alignSelf: 'center',
                  fontFamily: `'Do Hyeon', sans-serif`,
                }}
              >
                  { shortFormat(props.value) }
                </label>
                <label
                  style={{
                    display:'block',
                    color: 'rgb(66,66,66)',
                    fontSize: '20px',
                    width: '100%',
                    alignSelf: 'center',
                    fontFamily: `'Do Hyeon', sans-serif`,
                  }}
                >
                  { separatedFormat(props.value) }
                </label>
              </div>
    );
}