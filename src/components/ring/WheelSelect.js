import React, { useState } from "react";
import styled from 'styled-components';
import RingDisplay, { calculateItemSizeForContainer, calculateRadiusForItemSize, calculateItemSizeForRadius } from "./RingDisplay";

const DEFAULT_ITEM_SIZE = 36;
const DEFAULT_ACTIVE_ITEM_SIZE = 1.5;
const DEFAULT_HOVER_PATTERN = [1.2];
const DEFAULT_TEMPLATE = props =>
  <WheelButton {...props}> { typeof(props.value) === 'object' ? '' : props.value } </WheelButton>

export default ({ data, value, onChange, splitBy, size, itemSize,
                  TemplateClass=DEFAULT_TEMPLATE,
                  activeItemSize=DEFAULT_ACTIVE_ITEM_SIZE,
                  hoverPattern=DEFAULT_HOVER_PATTERN,
                 }) => {
  const [hovered, setHovered] = useState(null);
  let selected = null;

  data = data.map((value, index) => ({ value, index }));
  data = splitToRings(data, splitBy);
  
  if (!itemSize)
    itemSize = calculateItemSize(data, size);
  data = assignSize(data, itemSize);

  data.forEach(ring => {
    if (!selected)
        selected = ring.find(item => item.value === value)

    ring = applyResizeEffect(ring, selected, hovered, itemSize, activeItemSize, hoverPattern);
    ring = applyActiveEffect(ring, selected, itemSize, activeItemSize);
    ring = applyHoverEffect(ring, hovered, itemSize, hoverPattern);
  });

  const ring = (data, index) => {
    return (
      <RingDisplay
        overflow
        key={index}
        itemSize={data.map(item => item.size)}
        startIndex={selected ? selected.localIndex : 0}
        containerSize={size}
        focused={ isRingFocused( data, selected, hovered ) }
      >
        {data.map(item => (
            <TemplateClass
              key={item.index}
              value={item.value}
              size={item.size}
              onMouseEnter={() => setHovered(item)}
              onMouseOut={() => setHovered(null)}
              onClick={() => onChange(item.value)}
            />
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
        }}
      >
        {data.map(ring)}
      </div>
    );
  };

  return containRings(data);
};

const correctIndex = data => index => {
  index = index%data.length
  index = index < 0 ? data.length+index : index
  return index
}

const getHoveredPatternSizes = (v, hoverPattern) =>
  hoverPattern.map(s => v * s)

const isRingFocused = (data, selected, hovered) => {
  const isSelected = selected && data.find(item => item === selected);
  const isHovered = hovered && data.find(item => item.index === hovered.index);

  return isSelected || isHovered;
};

const applyResizeEffect = (data, selected, hovered, itemSize, activeItemSize, hoverPattern) => {
  let newSize = itemSize;
  const hoverOffset = -Math.floor(hoverPattern.length/2)
  const isHovered = hovered && data.find(item => item.index === hovered.index);
  const isSelected = selected && data.find(item => item === selected);

  const hoveredIndexes = isHovered ? getHoveredPatternSizes( itemSize, hoverPattern ).map((_,i)=> correctIndex(data)(hovered.localIndex+hoverOffset+i) ) : []
  const isCovered = isSelected && isHovered && hoveredIndexes.find( index => selected.localIndex === index )

  if (isSelected || isHovered){
    let virtualCount = data.length
 
    if (isSelected && !isCovered) virtualCount += activeItemSize-1
    if (isHovered) virtualCount += getHoveredPatternSizes(1, hoverPattern).reduce( (sum,n) => sum+n, -hoverPattern.length )
 
    const radiusToKeep = calculateRadiusForItemSize( data.length, itemSize )
    newSize = calculateItemSizeForRadius( virtualCount, radiusToKeep)
  }
 

  for (let i = 0; i < data.length; i++) data[i].size = newSize;

  return data;
};

const applyActiveEffect = (data, selected, itemSize, activeItemSize) => {
  const isSelected = selected && data.find(item => item === selected);
  if (isSelected)
    data[selected.localIndex].size = itemSize * activeItemSize;
  return data;
};

const applyHoverEffect = (data, hovered, itemSize, hoverPattern) => {
  const isHovered = hovered && data.find(item => item.index === hovered.index);
  if (!isHovered) return data;

  const i = correctIndex(data)
  const hoverOffset = -Math.floor(hoverPattern.length/2)
  getHoveredPatternSizes(itemSize, hoverPattern).forEach( (size, index) => data[ i( hovered.localIndex + hoverOffset + index ) ].size = size )

  return data;
};

const calculateRingSlipts = (arr, splitBy) => {
  if ( !arr.length ) return [[0,0]]
  if ( !splitBy ) return [[0,arr.length-1]]

  const res = [];
  for (let i = 0, r = 0; i < arr.length; i += splitBy + r, r += 7) {
    // todo: better calculate this
    const start = res.length ? res[res.length - 1][1] + 1 : 0;
    const len = splitBy + r;
    res.push([start, start + len - 1]);
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

const assignSize = (data, size) =>
  data.reduce( (acc, ring) => [...acc, ring.map( item => ({ ...item, size }) )], [] )

const calculateItemSize = (data,  containerSize) =>
  !containerSize ? !data.length ? 0 : DEFAULT_ITEM_SIZE :
    calculateItemSizeForContainer(data[data.length - 1].length, containerSize)

const WheelButton = styled.div.attrs(({ size = 0 }) => ({ style: {
  width: size+'px',
  height: size+'px',
  fontSize: size * 0.35,
}}))`
  background-color: white;
  display:inline-block;
  border-radius: 50%;
  border: 2px solid grey;
  transition: all 0.2s ease-in;
  cursor: pointer;
  &:hover {
    border: 2px solid white;
  }
`
const HoverArea = styled.div`
    width: 130%;
    height: 130%;
    left: -15%;
    top: -15%;
    position: absolute;
    border-radius: 50%;
`;

export { WheelButton, HoverArea }