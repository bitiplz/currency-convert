import React from 'react';
import styled from 'styled-components';
import CountUp from 'react-countup';
import Focusable from '../shared/Focusable';


const shortFormat = n => {
    if ( typeof(n) !== 'number' ) return 0

    switch (true){
        case n<0 : { return n.toFixed(3) }
        case (n>=1000000000000) : return ["....", ""]

        case (n>=100000000000) : return [ ( n/1000000000 ).toFixed(0), "B"]
        case (n>=10000000000) : return [ ( n/1000000000 ).toFixed(1), "B"]
        case (n>=1000000000) : return [ ( n/1000000000 ).toFixed(2), "B"]

        case (n>=100000000) : return [ ( n/1000000 ).toFixed(0), "M"]
        case (n>=10000000) : return [ ( n/1000000 ).toFixed(1), "M"]
        case (n>=1000000) : return [ ( n/1000000 ).toFixed(2), "M"]
        
        case (n>=100000) : return [ ( n/1000 ).toFixed(0), "K"]
        case (n>=10000) : return [ ( n/1000 ).toFixed(1), "K"]
        case (n>=1000) : return [ n.toFixed(0), "" ]

        case (n>=100) : return [ n.toFixed(1), "" ]
        case (n>=10) : return [ n.toFixed(2), "" ]
        default : return [n.toFixed(2), "" ]
    }
}

const separatedFormat = n => {
  if ( typeof(n) !== 'number' ) return [0,0]

  let parts = n.toFixed(4).split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ")

  return parts[0]+','+parts[1]
}

export default function({amount, value, from, to, onAmountChange}) {
    const [ displayValue, suffix] = shortFormat(value)

    return (
      <CenterDisplayStyled>
        <Focusable bottom value='from'>
          <FlagIndicator country={from} />
        </Focusable>
        <div style={{ display: 'grid', textAlign: 'center', alignItems: 'center' }}>
            {from}
            <Amount
              value={ amount }
              onChange={ e => onAmountChange( e.target.value ) }
            />
        </div>
        <DisplayValue
          duration={1.2}
          end={ displayValue }
          suffix={ suffix }
          preserveValue={true}
        />
        <div style={{ textAlign: 'center' }}>
          <ExactValue
              duration={1.5}
              end={ value }
              formattingFn={ separatedFormat }
              decimals={4}
              preserveValue={true}
          />
          {to}
        </div>
        <Focusable top value='to'>
          <FlagIndicator country={to} />
        </Focusable>
      </CenterDisplayStyled>
    );
}

const Amount = styled.input`
  border: 0;
  background-color: rgba(255,255,255,0.5);
  margin-right: 5px;
  border-radius: 10px;
  height: 22px;
  width: 100px;
  margin: auto;
  text-align: center;
  font-family: 'Do Hyeon', sans-serif;
  color: rgb(66,66,66);
`

const CenterDisplayStyled = styled.div`
  position: relative;
  display: grid;
  //grid-template-rows: 3fr 3fr 3fr 3fr 3fr;
  grid-template-rows: 17% 20% 28% 18% 20%;
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

const DisplayValue = styled(CountUp)`
  display:block;
  font-size: 120px;
  text-align: center;
`

const ExactValue = styled(CountUp)`
  display:block;
  font-size: 20px;
  text-align: center;
`
const FlagIndicator = styled.div.attrs(props =>({
  style : {
      backgroundImage: props.country !== '' ? `url("https://www.countryflags.io/${props.country.substring(0,2) }/shiny/64.png")` : '',
  },
}))`
  background-position: center;
  background-repeat: repeat-x;
  background-size: 120px;
  //background-size: cover;
  width: 100%;
  height: 100%;
  display: block;
  position:relative;
`