import React from 'react';
import styled from 'styled-components';

const shortFormat = ( n ) => {
    if ( typeof(n) !== 'number' ) return 0

    switch (true){
        case n<0 : { return n.toFixed(3) }
        case (n>=1000000000000) : return "...."

        case (n>=100000000000) : return ( n/1000000000 ).toFixed(0) + "B"
        case (n>=10000000000) : return ( n/1000000000 ).toFixed(1) + "B"
        case (n>=1000000000) : return ( n/1000000000 ).toFixed(2) + "B"

        case (n>=100000000) : return ( n/1000000 ).toFixed(0) + "M"
        case (n>=10000000) : return ( n/1000000 ).toFixed(1) + "M"
        case (n>=1000000) : return ( n/1000000 ).toFixed(2) + "M"
        
        case (n>=100000) : return ( n/1000 ).toFixed(0) + "K"
        case (n>=10000) : return ( n/1000 ).toFixed(1) + "K"
        case (n>=1000) : return n.toFixed(0)

        case (n>=100) : return n.toFixed(1)
        case (n>=10) : return n.toFixed(2)
        case (n>=0) : return n.toFixed(3)
        default : return 0
    }
}

const separatedFormat = ( n ) => {
  if ( typeof(n) !== 'number' ) return [0,0]

  let parts = n.toFixed(4).split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ")

  return parts
}

export default function({amount, value, from, to}) {
    return (
      <CenterDisplayStyled>
        <FlagIndicator country={from} />
        <ExactValue>
          <strong>
            { separatedFormat( amount )[0] }
          </strong>
            {',' + separatedFormat( amount )[1] + ' '}
          <strong>
            { from }
          </strong>
        </ExactValue>
        <DisplayValue>
          { shortFormat(value) }
        </DisplayValue>
        <ExactValue>
          <strong>
            { separatedFormat( value )[0] }
          </strong>
            {',' + separatedFormat( value )[1] + ' '}
          <strong>
            { to }
          </strong>
        </ExactValue>
        <FlagIndicator country={to}/>
      </CenterDisplayStyled>
    );
}

const CenterDisplayStyled = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 3fr 3fr 3fr 3fr 3fr;
  align-items: center;
  height: 300px;
  width: 300px;
  //background-color: rgb(210,210,210);
  font-family: 'Do Hyeon', sans-serif;
  color: rgb(66,66,66);
  //border: 2px outset white;
  border-radius: 50%;
  overflow: hidden;
`

const DisplayValue = styled.label`
  display:block;
  font-size: 120px;
  text-align: center;
`

const ExactValue = styled.label`
  display:block;
  font-size: 20px;
  text-align: center;
`
const FlagIndicator = styled.div.attrs(props =>({
  style : {
      backgroundImage: `url("https://www.countryflags.io/${props.country.substring(0,2) }/shiny/64.png")`,
  },
}))`
  background-position: center;
  background-repeat: repeat-x;
  background-size: 120px;
  //background-size: cover;
  height: 100%;
  display: block;
`