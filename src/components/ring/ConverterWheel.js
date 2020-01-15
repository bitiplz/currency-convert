import React, { useEffect } from "react";
import { useAppStore } from "../../providers/AppProvider";
import {
  CHANGE_SELECTION,
  CURRENCIES_FETCHED
} from "../../providers/ActionTypes";
import fx from "money";
import fetchRates from "../../apis/oexRates";
import WheelSelect from "./WheelSelect";
import CenterDisplay from "./CenterDisplay";
import Magnet from "../shared/Magnet";
import Glow from "../shared/Glow";

export default ({ size = 620 }) => {
  const [store, dispatchAction] = useAppStore();
  const { currencies, selection } = store;
  const { from, to, amount } = selection;

  useEffect(() => {
    fetchRates(onRatesFetched);
  }, []);

  const setSelection = set => {
    dispatchAction({
      type: CHANGE_SELECTION,
      selection: Object.assign(selection, set)
    });
  };

  // do not use indexes like XAU
  const filterRates = raw =>
    Object.keys(raw)
      .filter(key => key[0] !== "X")
      .reduce((obj, key) => {
        obj[key] = raw[key];
        return obj;
      }, {});

  const onRatesFetched = res => {
    fx.rates = filterRates(res.data.rates); //todo: reducer
    dispatchAction({
      type: CURRENCIES_FETCHED,
      currencies: Object.keys(fx.rates)
    });
  };

  const target = {
    value: store.focused === "from" ? from : to,
    onChange:
      store.focused === "from"
        ? v => setSelection({ from: v })
        : v => setSelection({ to: v })
  };

  const calculatedAmount = currencies.length
    ? fx.convert(amount, { from, to })
    : 0;

  return (
    <Magnet size={size}>
      <Glow rad={size * 0.33} />
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
        onAmountChange={amount => setSelection({ amount })}
      />
    </Magnet>
  );
};
