import React, {useState} from 'react';
import styled from 'styled-components';

const SDSA = 2;     //selectedDotSpaceAddition
const HDSA = 1.2;   //hoveredDotSpaceAddition

export default ({ data, value, onChange, children, dotRadius, ringRadiusAdj }) => {

    const selected = data.indexOf(value) || 0;
    const [hovered, setHovered] = useState( null );

    const ringRadius = data.length * dotRadius / Math.PI / 2 + ringRadiusAdj || 0;
    let rotUnit = 360 / ( data.length + SDSA + ( hovered ? HDSA : 0 ) );
    let rotPos = -( selected + SDSA ) * rotUnit;
    
    const member = ( item, index ) => {
        let rD = dotRadius; 
        rotPos += rotUnit;
      
        if ( index === selected ) rD *= 3;
        else if ( index === selected+1 ) rotPos += rotUnit;                                  
        
        if (hovered) {
            if ( index === hovered ) rD *= 1.8
            if ( Math.abs(hovered-index) < 2 ) rotPos += rotUnit*0.525;
        }

        return {
            item, index,
            value: item,
            key: index,
            radiusLineOpts: { ringRadius, rotPos },
            dotContainerOpts: { rD, rotPos, item },
        }
    };

    const template = ( member ) => {
        return (
            <RadiusLine
                key={ member.key }
                opts={ member.radiusLineOpts }
            >
                <DotContainer
                    value={ member.value }
                    opts={ member.dotContainerOpts }
                    onMouseEnter={ () => { setHovered( member.index ) } }
                    onMouseOut={ () => setHovered(null) }
                    onClick={ () => onChange( member.item ) }
                >

                    { member.item }
                    { children }
                    
                </DotContainer>
            </RadiusLine>
        )
    }


    return (
        <Magnet id="anchor">
            {data.map( (item, index) => template( member( item, index ) ) )}
        </Magnet>
    );
}

const Magnet = styled.div`
    position: relative;
    display: flex;
    width: 0;
    height: 0;
    align-self: center;
    margin: auto;
`;

const RadiusLine = styled.div.attrs(props =>({
    style : {
        height: props.opts.ringRadius,
        transform: `rotate(${props.opts.rotPos}deg)`,
    },
}))`
    position: absolute;
    display: block;
    background-color: grey;
    width: 0;
    left: 0;
    bottom: 0;
    transform-origin: bottom right;
    transition: all 0.8s ease-out;
`;

const DotContainer = styled.div.attrs(props =>({
    style : {
        width: props.opts.rD,
        height: props.opts.rD,
        left: props.opts.rD/-2,
        top: props.opts.rD/-2,
        fontSize : props.opts.rD*0.4,
        transform: `rotate(${-props.opts.rotPos}deg)`,
        backgroundImage: `url("https://www.countryflags.io/${props.opts.item.substring(0,2) }/flat/64.png")`,
        zIndex: props.index === props.hovered ? 100 : 1,
    },
}))`
    position: relative;
    border-radius: 50%;
    display: grid;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 2px;
    border: 2px solid white;
    font-weight: 800;
    background-position: center;
    background-repeat: no-repeat;
    background-size : 170%;
    transition: all 0.2s ease-in;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    -webkit-box-shadow: -4px 13px 8px -11px rgba(0,0,0,0.75);
    -moz-box-shadow: -4px 13px 8px -11px rgba(0,0,0,0.75);
    box-shadow: -4px 13px 8px -11px rgba(0,0,0,0.75);
`;
