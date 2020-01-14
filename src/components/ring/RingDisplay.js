import React from "react";
import styled from "styled-components";


//todo:template,distmods
export default function({ children, itemSize, distMods, startIndex, offset, square, overflow, focused }) {

  const [items, sizes, start] = correctProps(children, itemSize, startIndex);
  const [radius, angles] = calculateAnglesAndRadius(sizes, start);


  return items.length ? (
    <List size={ radius*2 } offset={ offset /*todo:better offset*/ } focused={focused}>

      {items.map((item, i) => (
        <Anchor key={i} size={sizes[i]} r={radius} a={angles[i]}>
            <Item size={sizes[i]} square={square} overflow={overflow} >
                    {item}
            </Item>
        </Anchor>
      ))}

    </List>
  ) : null;
}


export const calculateRadius = sizes => {
  if (sizes.length < 2) return 0;

  const sum = sizes.reduce((acc, n) => acc + n, 0);
  const avg = sum / sizes.length;
  const radius = avg / (2 * Math.sin(Math.PI / sizes.length));

  return radius
}

const calculateAnglesAndRadius = (sizes, startIndex) => {
  if (sizes.length < 2) return [0, [0]];

  console.log(startIndex)

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
  const turn = absAngles[startIndex]
  const angles = absAngles.map( a => a - turn )

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
    itemSize = Array(children.length).fill(
      isValid(itemSize) ? itemSize : 30
    );
  }

  if ( !isValid(startIndex) || startIndex >= children.length )
    startIndex = 0

  return [children, itemSize, startIndex];
};

/*
const List = styled.ul.attrs(props => ({ style: {
    width: `${props.size}px`,
    height: `${props.size}px`,
    top: `${props.offset}px`,
    left: `${props.offset}px`
}}))`
    position: relative;
    border-radius: 50%;
`;
*/

const List = styled.ul.attrs(props => ({ style: {
  zIndex: props.focused ? 50 : 1,
}}))`
    width: 0px;
    height: 0px;
    position: absolute;
    margin: 0;
    border-radius: 50%;
    &:hover {
      z-index: 25;
    }
`;

const Anchor = styled.li.attrs(props => ({ style: {
    transform: `rotate(${props.a}deg) translate(0, ${-props.r}px) rotate(${-props.a}deg)`
}}))`
    width: 0px; height: 0px;
    top: 50%; left: 50%;
    position: absolute;
    list-style: none;
    transition: all ease-out 0.8s;
`;

const Item = styled.li.attrs(props => ({ style: {
    width: `${props.size}px`,
    height: `${props.size}px`,
    left: `${props.size / -2}px`,
    top: `${props.size / -2}px`,
    overflow: props.overflow ? 'visible' : 'hidden',
    borderRadius: props.square ? 'none' : '50%',
}}))`
  transition: all linear 0.3s
  cursor: pointer;
  position: absolute;
  border: 1px solid black;
  &:hover {
    border: 2px solid blue;
  }
`;
