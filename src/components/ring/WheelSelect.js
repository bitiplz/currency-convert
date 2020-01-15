import React, { useState } from "react";
import styled from "styled-components";
import RingDisplay from "./RingDisplay";

const ITEM_SIZE = 36;
const ACTIVE_ITEM_SIZE = 70;
const ITEM_SIZE_WITH_ACTIVE = ITEM_SIZE *0.975;
const ITEM_SIZE_WITH_HOVER = ITEM_SIZE *0.93;
const ITEM_SIZE_WITH_ACTIVE_AND_HOVER = ITEM_SIZE *0.89;
const HOVERED_SIZES = [
    ITEM_SIZE*1.25,
    ITEM_SIZE*1.50,
    ITEM_SIZE*2.00,
    ITEM_SIZE*1.50,
    ITEM_SIZE*1.25,
]

const isRingFocused = ( data, selected, hovered ) => {
    const isSelected = selected && data.find( item => item === selected )
    const isHovered = hovered && data.find( item => item.index === hovered.index )

    return isSelected || isHovered
}

const applyResizeEffect = ( data, selected, hovered ) => {
    let newSize = ITEM_SIZE
    const isSelected = selected && data.find( item => item === selected )
    const isHovered = hovered && data.find( item => item.index === hovered.index )
    
    if (isSelected){
        if (isHovered) { newSize = ITEM_SIZE_WITH_ACTIVE_AND_HOVER }
        else { newSize = ITEM_SIZE_WITH_ACTIVE }
    } else if ( isHovered ) { newSize = ITEM_SIZE_WITH_HOVER }

    for (let i=0; i<data.length; i++ )
        data[i].size = newSize

    return data
}

const applyActiveEffect = ( data, selected ) => {
    const isSelected = selected && data.find( item => item === selected )
    if (isSelected)
        data[selected.localIndex].size = ACTIVE_ITEM_SIZE;
    return data
}

const applyHoverEffect = ( data, hovered ) => {
    const isHovered = hovered && data.find( item => item.index === hovered.index )
    if (!isHovered) return data

    const hoveredSizes = HOVERED_SIZES.filter( (_,index) => hovered.localIndex+index < data.length )
    const fromIndex = hovered.localIndex-Math.floor(hoveredSizes.length/2)
    const hoveredElements = data.slice( fromIndex, fromIndex+hoveredSizes.length )
    const resizedElements = hoveredElements.map( (item,index) => ({...item, size:hoveredSizes[index]}))
    data.splice( hovered.localIndex-Math.floor(resizedElements.length/2), resizedElements.length, ...resizedElements )

    return data
}

const applyEffects = ( data, selected, hovered ) => {
    data = applyResizeEffect( data, selected, hovered)
    data = applyActiveEffect( data, selected )
    data = applyHoverEffect( data, hovered )
    return data
}

const splitToRings = (arr, splitBy) => {
    if (!splitBy) return [arr]

    const splitArr = []
    for ( let i=0, r=0; i<arr.length; i+=splitBy+r, r+=7 )
        splitArr.push(
            arr.slice(i, i+splitBy+r )
            .map( (item,localIndex) =>
                ({...item, localIndex})  ))

    return splitArr
}


export default ({ data, value, onChange, splitBy }) => {

    const [hovered, setHovered] = useState(null);
    let selected = null;

    data = data.map( (value, index) => ({value,index, size:ITEM_SIZE}) )
    data = splitToRings( data, splitBy )

    data.forEach( ring => {
        if (!selected)
            selected = ring.find( item => item.value === value )

        ring = applyEffects( ring, selected, hovered )
    })

    const ring = (data, index) => <RingDisplay
                            key={ index } 
                            itemSize={ data.map( item => item.size ) }
                            startIndex={ selected ? selected.localIndex : 0 }
                            focused={ isRingFocused( data, selected, hovered ) }
                        >
                                { data.map( item =>
                                    <Flag
                                        key={ item.index } 
                                        value={ item.value }
                                        size={ item.size }
                                        onMouseEnter={ () => { if ( item !== selected ) setHovered( item ) } }
                                        onMouseOut={ () => setHovered(null) }
                                        onClick={ () => onChange( item.value ) }
                                    >
                                        { item.value }
                                    </Flag>
                            )}
                        </RingDisplay>

  return <div> { data.map( ring ) } </div>
};

const Flag = styled.div.attrs(props => ({ style: {
    fontSize: props.size * 0.35,
    backgroundImage: `url("https://www.countryflags.io/${props.value.substring( 0, 2 )}/flat/64.png")`,
}}))`
    color: white;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
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

/*
    const getValidSplitValuesForSize = size =>
        Array(size)
        .fill(size)
        .map((l,r)=>(l-(r*(r-1)*7/2))/r)
        .filter((n,i)=>i>0&&n>0&&n==Math.floor(n))
    // size=162 -> [162, 47, 30]    
*/