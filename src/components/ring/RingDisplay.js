import React from "react";
import styled from "styled-components";

export default function({
  children,
  containerSize,
  itemSize,
  startIndex,
  focused,
  square,
  overflow
}) {
  const [items, sizes, start] = correctProps(children, itemSize, startIndex);
  const [radius, angles] = calculateAnglesAndRadius(sizes, start);

  return items.length ? (
    <List offset={containerSize/2} focused={focused} >
      {items.map((item, i) => (
        <Anchor key={i} size={sizes[i]} r={radius} a={angles[i]}>
          <Item size={sizes[i]} square={square} overflow={overflow.toString()}>
            {item}
          </Item>
        </Anchor>
      ))}
    </List>
  ) : null;
}

const calculateRadiusForItemSize = (n, itemSize) =>
  itemSize / (2 * Math.sin(Math.PI / n));

const calculateItemSizeForRadius = (n, radius) =>
  radius * (2 * Math.sin(Math.PI / n));

const calculateItemSizeForContainer = (n, containerSize) =>
  (((1 / n) * (n - 3) * containerSize) / 2) * (2 * Math.sin(Math.PI / n));

const calculateRadius = sizes => {
  if (sizes.length < 2) return 0;

  const sum = sizes.reduce((acc, n) => acc + n, 0);
  const avg = sum / sizes.length;
  const radius = avg / (2 * Math.sin(Math.PI / sizes.length));

  return radius;
};

const calculateAnglesAndRadius = (sizes, startIndex) => {
  if (sizes.length < 2) return [0, [0]];

  const sum = sizes.reduce((acc, n) => acc + n, 0);
  const avg = sum / sizes.length;
  const radius = avg / (2 * Math.sin(Math.PI / sizes.length));
  const unit = 360 / (sizes.length * avg);
  const relAngles = sizes.map(
    (a, i, arr) =>
      (unit * a) / 2 +
      (i < arr.length - 1 ? unit * arr[i + 1] : unit * sizes[0]) / 2
  );
  const absAngles = relAngles.reduce(
    (acc, abs) => [...acc, acc[acc.length - 1] + abs],
    [0]
  );
  const turn = absAngles[startIndex];
  const angles = absAngles.map(a => a - turn);

  return [radius, angles];
};

const correctProps = (children, itemSize, startIndex) => {
  if (!children) return [[], []];
  if (!Array.isArray(children)) children = [children];

  const isValid = s => typeof s === "number" && s > 0;

  if (Array.isArray(itemSize) && itemSize.length > 0) {
    itemSize = itemSize.filter(isValid).slice(0, children.length);
    children = children.slice(0, itemSize.length);
  } else {
    itemSize = Array(children.length).fill(isValid(itemSize) ? itemSize : 30);
  }

  if (!isValid(startIndex) || startIndex >= children.length) startIndex = 0;

  return [children, itemSize, startIndex];
};

const List = styled.ul.attrs(({ focused = 0, offset = 0 }) => ({
  style: {
    zIndex: focused ? 50 : 1,
    left: offset + "px",
    top: offset + "px"
  }
}))`
  width: 0px;
  height: 0px;
  position: absolute;
  padding: 0;
  margin: 0;
  border-radius: 50%;
  &:hover {
    z-index: 25;
  }
`;

const Anchor = styled.div.attrs(({ a = 0, r = 0 }) => ({style:{
    transform: `rotate(${a}deg) translate(0, ${-r}px) rotate(${-a}deg)`
}}))`
  width: 0px;
  height: 0px;
  top: 50%;
  left: 50%;
  position: absolute;
  list-style: none;
  transition: all ease-out 0.8s;
`;

const Item = styled.li.attrs(({ size = 20, overflow = false, square = false }) => ({ style: {
      width: size + "px",
      height: size + "px",
      left: size / -2 + "px",
      top: size / -2 + "px",
      overflow: overflow ? "visible" : "hidden",
      borderRadius: square ? "none" : "50%"
}}))`
  background-color: white;
  transition: all 0.2s ease-in;
  cursor: pointer;
  position: absolute;
`;

export {
  calculateRadius,
  calculateItemSizeForContainer,
  calculateRadiusForItemSize,
  calculateItemSizeForRadius
};
