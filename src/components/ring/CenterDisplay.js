import React from "react";
import styled from "styled-components";
import CountUp from "react-countup";
import Focusable from "../shared/Focusable";
import { useTheme } from '../../providers/ThemeProvider';

export default function({ amount, value, from, to, onAmountChange, size }) {
  const [displayValue, suffix] = shortFormat(value);
  const {theme} = useTheme() 

  return (
    <CenterDisplayStyled theme={theme} size={size}>
      <Focusable bottom value="from">
        <FlagIndicator country={from} />
      </Focusable>
      <div style={{ textAlign: "center" }}>
        {from}
        <Amount
          size={size}
          value={amount}
          onChange={e => onAmountChange(e.target.value)}
        />
      </div>
      <DisplayValue
        size={size}
        duration={1.2}
        end={parseInt(displayValue)}
        suffix={suffix}
        preserveValue={true}
      />
      <div style={{ textAlign: "center" }}>
        <ExactValue
          size={size}
          duration={1.5}
          end={value}
          formattingFn={separatedFormat}
          decimals={4}
          preserveValue={true}
        />
        {to}
      </div>
      <Focusable top value="to">
        <FlagIndicator country={to} />
      </Focusable>
    </CenterDisplayStyled>
  );
}

const shortFormat = n => {
  if (typeof n !== "number") return 0;

  switch (true) {
    case n < 0: {
      return n.toFixed(3);
    }
    case n >= 1000000000000:
      return ["....", ""];

    case n >= 100000000000:
      return [(n / 1000000000).toFixed(0), "B"];
    case n >= 10000000000:
      return [(n / 1000000000).toFixed(1), "B"];
    case n >= 1000000000:
      return [(n / 1000000000).toFixed(2), "B"];

    case n >= 100000000:
      return [(n / 1000000).toFixed(0), "M"];
    case n >= 10000000:
      return [(n / 1000000).toFixed(1), "M"];
    case n >= 1000000:
      return [(n / 1000000).toFixed(2), "M"];

    case n >= 100000:
      return [(n / 1000).toFixed(0), "K"];
    case n >= 10000:
      return [(n / 1000).toFixed(1), "K"];
    case n >= 1000:
      return [n.toFixed(0), ""];

    case n >= 100:
      return [n.toFixed(1), ""];
    case n >= 10:
      return [n.toFixed(2), ""];
    default:
      return [n.toFixed(2), ""];
  }
};

const separatedFormat = n => {
  if (typeof n !== "number") return [0, 0];

  let parts = n.toFixed(4).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return parts[0] + "," + parts[1];
};

const CenterDisplayStyled = styled.div.attrs(({ size = 300 }) => ({
  style: {
    height: size + "px",
    width: size + "px",
    fontSize: size / 16 + "px"
  }
}))`
  position: relative;
  display: grid;
  //grid-template-rows: 3fr 3fr 3fr 3fr 3fr;
  grid-template-rows: 17% 20% 28% 18% 20%;
  align-items: center;
  //background-color: rgb(210,210,210);
  //font-size: 20px;
  font-family: "Do Hyeon", sans-serif;
  color: ${ ({theme}) => theme.contrastColor };
  //border: 2px outset white;
  border-radius: 50%;
  overflow: hidden;
`;

const Amount = styled.input`
  display: block;
  width: 33.3%;
  height: 73.3%;
  border: 0;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  margin: auto;
  font-size: 1.2em;
  text-align: center;
  font-family: "Do Hyeon", sans-serif;
`;

const DisplayValue = styled(CountUp)`
  font-size: 6em;
  display: block;
  text-align: center;
`;

const ExactValue = styled(CountUp)`
  font-size: 1.2em;
  display: block;
  text-align: center;
`;
const FlagIndicator = styled.div.attrs(({ size = 300, country = "" }) => ({ style: {
    backgroundImage: country !== ""
        ? `url("https://www.countryflags.io/${country.substring( 0, 2 )}/shiny/64.png")`
        : "",
    backgroundSize: size / 2.5 + "px"
  }
}))`
  background-position: center;
  background-repeat: repeat-x;
  //background-size: cover;
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
`;
