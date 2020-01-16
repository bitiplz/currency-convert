import React from 'react'
import { useTheme } from '../../providers/ThemeProvider'
export default props => {
    const {all, change} = useTheme();
    
    return (
        <div style={{
                display:'block',
            }}
        >
            { all.map( theme =>
                <div
                    key={ theme.previewColor }
                    style={{
                        width:'30px',
                        height:'30px',
                        margin:'2px',
                        display:'inline-block',
                        borderRadius: '50%',
                        border: '2px solid grey',
                        backgroundColor:theme.previewColor,
                    }}
                    onClick={ () => { change(theme) } }
                />
            )}
        </div>
    )
}