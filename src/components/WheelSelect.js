import React, {useState} from 'react';

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
                            <div
                                className='liner'
                                key={idx}
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
                                        transform: `rotate(${ -currentRotState }deg)`,
                                        fontSize : `${ cDotR*0.40 }px`,
                                        fontWeight: '800',
                                        //backgroundColor: `rgb(${100},${ inverse ? 150+(ds-idx)*2 : 150+idx*2},${ inverse ? 150+(ds-idx)*2 : 150+idx*2})`
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize : `170%`,
                                        backgroundImage: `url(${`https://www.countryflags.io/${ item.slice(0,2) }/flat/64.png`})`
                                    }}
                                    onMouseEnter={ () => { setHoverIndex(idx) } }
                                    onMouseOut={ () => setHoverIndex(null) }
                                    onClick={ () => {
                                        setIndex(idx);
                                    } }
                                >
                                    {item}
                                </div>

                            </div>
                        )
                    });
        /**/
    }

    return (
        <div className='canvas' style={{ height: `${size}px`, width: `${size}px` }} >
            { circle( data.slice(31,66), indexOuter, setIndexOuter, hoverIndexOuter, setHoverIndexOuter, 30, true )  }
            { circle( data.slice(0,31), indexInner, setIndexInner, hoverIndexInner, setHoverIndexInner, 10 ) }
        </div>
    );
    
}

/* 

active:
    1 ami 4x -> +3

hover:
    1 ami 3x -> +2
    4 ami 2x -> +4


*/