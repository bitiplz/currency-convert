import React, {useState} from 'react';
import styled from 'styled-components';

export default function({data, ext, onChange}){
    const [indexInner, setIndexInner] = useState( 0 );
    const [hoverIndexInner, setHoverIndexInner] = useState( null );
    const [indexOuter, setIndexOuter] = useState( 0 );
    const [hoverIndexOuter, setHoverIndexOuter] = useState( null );

    const size = 800;
    const dotR = 40;
    const center = {x: size/2, y: size/2}

    const circle = ( d, index, setIndex, hoverIndex, setHoverIndex, ext, inverse ) => {
        /**/
        const ds = d.length;

        let rotUnit = 360/(ds+2+( hoverIndex ? 1.2 : 0 ))
        let rotPos = -(index+2)*rotUnit;
        

        return d.map( (item, idx) => {
                        let cDotR = dotR;
                        let rot = rotUnit;

                        //general step
                        if( idx !== index ) {rotPos += rot; }

                        //space for selected
                        if ( idx === index ) { rotPos += 2*rot; cDotR *= 3; }
                        if ( idx === index+1 ) {rotPos += rot; }
                    
                        //space for hovered
                        if ( hoverIndex && idx === hoverIndex ) { cDotR *= 1.8; rotPos += rot*0.525; }
                        if ( hoverIndex && idx === hoverIndex+1 ) { rotPos += rot*0.525; }

                        const r = ds*dotR/3.14/2 + ( ext ? ext : 0 );

                        const currentRotState = rotPos;
                        
                        return (
                            <RadiusLine
                                key={idx}
                                opts={{ center, r, currentRotState }} >
                                <DotContainer
                                    onMouseEnter={ () => { setHoverIndex(idx) } }
                                    onMouseOut={ () => setHoverIndex(null) }
                                    onClick={ () => setIndex(idx) }
                                    opts={{ cDotR, currentRotState, item }} >
                                {item}
                                </DotContainer>
                            </RadiusLine>
                        )
                    });
        /**/
    }

    return (
        <Canvas size={ 800 } >
            { circle( data.slice(31,66), indexOuter, setIndexOuter, hoverIndexOuter, setHoverIndexOuter, 30, true )  }
            { circle( data.slice(0,31), indexInner, setIndexInner, hoverIndexInner, setHoverIndexInner, 10 ) }
        </Canvas>
    );
    
}



const Canvas = styled.div`
    background-color: rgb(37, 37, 37);
    position: relative;
    display: block;
    position: absolute;
    width: ${ props => props.size }px;
    height: ${ props => props.size }px;
`;

const RadiusLine = styled.div`
    position: absolute;
    display: block;
    background-color: grey;
    width: 0;
    height: ${ props => props.opts.r }px;
    left: ${ props => props.opts.center.x}px;
    bottom: ${props => props.opts.center.y}px;
    transform: rotate(${ props => props.opts.currentRotState }deg);

    transform-origin: bottom right;
    transition: all 0.8s ease-out;
`;

const DotContainer = styled.div`
    position: relative;
    border-radius: 50%;
    display: grid;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 2px;
    border: 2px solid white;
    width: ${ props => props.opts.cDotR }px;
    height: ${ props => props.opts.cDotR }px;
    left: ${ props => props.opts.cDotR/-2 }px;
    top: ${ props => props.opts.cDotR/-2 }px;
    font-size : ${ props => props.opts.cDotR*0.4 }px;
    transform: rotate(${ props => -props.opts.currentRotState }deg);
    font-weight: 800;
    background-position: center;
    background-repeat: no-repeat;
    background-size : 170%;
    background-image: url("https://www.countryflags.io/${ props => props.opts.item.substring(0,2) }/flat/64.png");

    transition: all 0.2s ease-in;

    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    -webkit-box-shadow: -4px 13px 8px -11px rgba(0,0,0,0.75);
    -moz-box-shadow: -4px 13px 8px -11px rgba(0,0,0,0.75);
    box-shadow: -4px 13px 8px -11px rgba(0,0,0,0.75);
`;