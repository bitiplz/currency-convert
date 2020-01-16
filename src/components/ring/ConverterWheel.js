import React from "react";
import { useAppStore } from "../../providers/AppProvider";
import { CHANGE_SELECTION } from "../../providers/ActionTypes";
import fx from "money";
import WheelSelect from "./WheelSelect";
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
              data={currencies}
              value={target.value}
              onChange={target.onChange}
              splitBy={30}
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
