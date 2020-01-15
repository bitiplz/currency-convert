import React, { useState } from "react";
import styled from "styled-components";
import RingDisplay, {
  calculateRadiusForItemSize,
  calculateItemSizeForContainer
} from "./RingDisplay";

let ITEM_SIZE = 36;

const ACTIVE_ITEM_SIZE = 2.5;
const ITEM_SIZE_WITH_ACTIVE = 0.975;
const ITEM_SIZE_WITH_HOVER = 0.93;
const ITEM_SIZE_WITH_ACTIVE_AND_HOVER = 0.89;
const HOVERED_SIZES = () => [1.25, 1.5, 2.0, 1.5, 1.25].map(s => ITEM_SIZE * s);

export default ({ data, value, onChange, splitBy, size }) => {
  const [hovered, setHovered] = useState(null);
  let selected = null;

  data = data.map((value, index) => ({ value, index }));
  data = splitToRings(data, splitBy);
  calculateAndSetItemSize(data, size);
  data = assignSize(data);

  data.forEach(ring => {
    if (!selected)
        selected = ring.find(item => item.value === value);

    ring = applyEffects(ring, selected, hovered);
  });

  const ring = (data, index) => {
    return (
      <RingDisplay
        key={index}
        itemSize={data.map(item => item.size)}
        startIndex={selected ? selected.localIndex : 0}
        containerSize={size}
      >
        {data.map(item => (
          <Flag
            key={item.index}
            value={item.value}
            size={item.size}
            onMouseEnter={() => {
              if (item !== selected) setHovered(item);
            }}
            onMouseOut={() => setHovered(null)}
            onClick={() => onChange(item.value)}
          >
            {item.value}
          </Flag>
        ))}
      </RingDisplay>
    );
  };

  const containRings = data => {
    return (
      <div
        style={{
          width: size + "px",
          height: size + "px",
          position: "relative",
          display: "block"
          //margin: ITEM_SIZE + 'px',
        }}
      >
        {data.map(ring)}
      </div>
    );
  };

  return containRings(data);
};

const isRingFocused = (data, selected, hovered) => {
  const isSelected = selected && data.find(item => item === selected);
  const isHovered = hovered && data.find(item => item.index === hovered.index);

  return isSelected || isHovered;
};

const applyResizeEffect = (data, selected, hovered) => {
  let newSize = ITEM_SIZE;
  const isSelected = selected && data.find(item => item === selected);
  const isHovered = hovered && data.find(item => item.index === hovered.index);

  if (isSelected) {
    if (isHovered) {
      newSize = ITEM_SIZE * ITEM_SIZE_WITH_ACTIVE_AND_HOVER;
    } else {
      newSize = ITEM_SIZE * ITEM_SIZE_WITH_ACTIVE;
    }
  } else if (isHovered) {
    newSize = ITEM_SIZE * ITEM_SIZE_WITH_HOVER;
  }

  for (let i = 0; i < data.length; i++) data[i].size = newSize;

  return data;
};

const applyActiveEffect = (data, selected) => {
  const isSelected = selected && data.find(item => item === selected);
  if (isSelected) data[selected.localIndex].size = ITEM_SIZE * ACTIVE_ITEM_SIZE;
  return data;
};

const applyHoverEffect = (data, hovered) => {
  const isHovered = hovered && data.find(item => item.index === hovered.index);
  if (!isHovered) return data;

  const hoveredSizes = HOVERED_SIZES().filter(
    (_, index) => hovered.localIndex + index < data.length
  );
  const fromIndex = hovered.localIndex - Math.floor(hoveredSizes.length / 2);
  const hoveredElements = data.slice(
    fromIndex,
    fromIndex + hoveredSizes.length
  );
  const resizedElements = hoveredElements.map((item, index) => ({
    ...item,
    size: hoveredSizes[index]
  }));
  data.splice(
    hovered.localIndex - Math.floor(resizedElements.length / 2),
    resizedElements.length,
    ...resizedElements
  );

  return data;
};

const applyEffects = (data, selected, hovered) => {
  data = applyResizeEffect(data, selected, hovered);
  data = applyActiveEffect(data, selected);
  data = applyHoverEffect(data, hovered);
  return data;
};

const calculateRingSlipts = (arr, splitBy) => {
  const res = [];

  if (arr.length && splitBy) {
    for (let i = 0, r = 0; i < arr.length; i += splitBy + r, r += 7) {
      // todo: better calculate this
      const start = res.length ? res[res.length - 1][1] + 1 : 0;
      const len = splitBy + r;
      res.push([start, start + len - 1]);
    }
  }

  return res;
};

const splitToRings = (arr, splitBy) => {
  const ringSplits = calculateRingSlipts(arr, splitBy);

  if (!ringSplits.length) return [arr];

  arr = ringSplits.reduce(
    (acc, n) => [
      ...acc,
      arr
        .slice(n[0], n[1] + 1)
        .map((item, localIndex) => ({ ...item, localIndex }))
    ],
    []
  );

  return arr;
};

const assignSize = arr =>
  arr.reduce(
    (acc, ring) => [...acc, ring.map(item => ({ ...item, size: ITEM_SIZE }))],
    []
  );

const calculateContainerSize = data =>
  data.length
    ? calculateRadiusForItemSize(data[data.length - 1].length, ITEM_SIZE) * 2 +
      ITEM_SIZE
    : 0;

const calculateAndSetItemSize = (data, containerSize) =>
  (ITEM_SIZE = data.length
    ? calculateItemSizeForContainer(data[data.length - 1].length, containerSize)
    : 0);

const Flag = styled.div.attrs(({ size = 0, value = "" }) => ({
  style: {
    fontSize: size * 0.35,
    backgroundImage:
      value !== ""
        ? `url("https://www.countryflags.io/${value.substring( 0,2 )}/shiny/64.png")`
        : ""
  }
}))`
  color: white;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  position: relative;
  border-radius: 50%;
  display: grid;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  justify-content: center;
  align-items: center;
  padding: 2px;
  //border: 2px solid white;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 170%;
  transition: all 0.2s ease-in;
`;
