import React, {useState} from 'react';

export default function({data, slice, onChange}){


    const [index, setIndex] = useState( 0 );
    const [wholeRot, setRot] = useState( 0 );
    const [hoverIndex, setHoverIndex] = useState( null );

    const size = 800;
    const dotR = 40;
    const circleR = 380;
    const center = {x: size/2, y: size/2}

    const d = data.slice(0, slice);
    const ds = d.length;

    let rotUnit = 360/(ds+2+( hoverIndex ? 2 : 0 ))
    let rotPos = wholeRot;

    return (
        <div className='canvas' style={{ height: `${size}px`, width: `${size}px` }} >
            { `Hello! ${data.length} | ${index}` }
            {

                d.map( (item, idx) => {
                    let cDotR = dotR;
                    let rot = rotUnit;

                    if ( idx === index ) { cDotR *= 3; }
                    if ( idx === index+1 ) {rotPos += rot; }
                    if( idx > index ) {rotPos += rot; }
                
                    if ( hoverIndex && idx === hoverIndex ) { cDotR *= 3; rotPos += rot; }
                    if ( hoverIndex && idx === hoverIndex+1 ) { rotPos += rot; }
                

                    const r = ds*dotR/3.14/2;

                    const currentRotState = rotPos;
                    
                    return (
                        <div
                            className='liner'
                            asd={idx}
                            style={{
                                left: `${center.x}px`,
                                bottom: `${center.y}px`,
                                height: `${ r }px`,
                                transform: `rotate(${ currentRotState }deg)`
                            }}
                        >
                            <div
                                className='dot'
                                style={{
                                    width: `${cDotR}px`,
                                    height: `${cDotR}px`,
                                    left: `${ -cDotR/2 }px`,
                                    top: `${ -cDotR/2 }px`,
                                    transform: `rotate(${ -currentRotState }deg)`
                                }}
                                onMouseEnter={ () => setHoverIndex(idx) }
                                onMouseOut={ () => setHoverIndex(null) }
                                onClick={ () => {
                                    setIndex(idx);
                                    setRot( wholeRot + ( Math.abs(currentRotState)%360 > 180 ? 360-currentRotState : -currentRotState ) );
                                    console.log(wholeRot, currentRotState, 360-currentRotState)
                                } }
                            >
                                {idx}
                            </div>
                        </div>
                    )
                })

            }

        </div>
    )
}

/* 

active:
    1 ami 4x -> +3

hover:
    1 ami 3x -> +2
    4 ami 2x -> +4


*/