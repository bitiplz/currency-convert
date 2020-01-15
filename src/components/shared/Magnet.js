import React from 'react'

export default function({ size = 150, children }){
    children = Array.isArray( children ) ? children : [ children ]
    return (
        <div style={{ display:'block', position: 'relative', width: size + 'px', height: size + 'px' }}>
            <div style={{ position: 'absolute', width: 0, height: 0, left: '50%', top: '50%', overflow: 'visible' }}>
                <div style={{ position: 'relative', width: 0, height: 0, overflow: 'visible' }}>
                    {
                        children.map( item => 
                            {
                                const offset = ( item.props.size || 0 ) 
                                return (
                                    <div style={{ position: 'absolute', width: offset+'px', height: offset+'px', left: -offset/2+'px', top: -offset/2+'px' }}>
                                        { item }
                                    </div>
                                )
                            }
                        )
                    }
            </div>
        </div>
    </div>
    )
}
