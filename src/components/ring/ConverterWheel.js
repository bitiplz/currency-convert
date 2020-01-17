import React from "react";
import { useAppStore } from "../../providers/AppProvider";
import { CHANGE_SELECTION } from "../../providers/ActionTypes";
import fx from "money";
import WheelSelect, { WheelButton, HoverArea }from '../ring/WheelSelect'
import styled from "styled-components";
import CenterDisplay from "./CenterDisplay";
import Magnet from "../shared/Magnet";
import Glow from "../shared/Glow";

export default ({ size = 620 }) => {
  const {state, dispatch} = useAppStore()
  const { currencies, selection } = state;
  const { from, to, amount } = selection;
  const calculatedAmount = currencies.length ? fx.convert(amount, { from, to }) : 0;

  const target = {
    value: state.focused === "from" ? from : to,
    onChange:
    state.focused === "from"
        ? v => dispatch({ type: CHANGE_SELECTION, selection: { from: v } })
        : v => dispatch({ type: CHANGE_SELECTION, selection: { to: v } })
  };

  return (
    <div style={{ width: 'fit-content', margin:'auto', paddingTop:'36px'  }}>
        <Magnet size={size}>
          <Glow rad={size * 0.33}/>
            <WheelSelect
              size={size}
              TemplateClass={ FlagTemplate }
              data={currencies}
              value={target.value}
              onChange={target.onChange}
              splitBy={30}
              hoverPattern={[1.25, 1.5, 2.0, 1.5, 1.25]}
              activeItemSize={2.5}
            />
            <CenterDisplay
              size={size * 0.48}
              amount={amount}
              from={from}
              to={to}
              value={calculatedAmount}
              onAmountChange={amount => dispatch({ type: CHANGE_SELECTION, selection : {amount} }) }
            />
        </Magnet>
    </div>
  );
};

const FlagTemplate = props =>
  <FlagButton {...props} >
    { props.value }
    <HoverArea/>
  </FlagButton>


const FlagButton = styled(WheelButton).attrs(({ value = "" }) => ({
  style: {
    backgroundImage:
      value !== ""
        ? `url("https://www.countryflags.io/${value.substring( 0,2 )}/shiny/64.png")`
        : ""
  }
}))`
  color: white;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,1px 1px 0 #000;
  display: grid;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 2px;
  border: 1px solid black;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 170%;
`
