import React from "react";
import styled from "styled-components";


export default ({children}) => (
    <Sheet>
        {
            children.map( item =>
                <div
                    style={{
                        display: 'grid',
                        alignSelf: 'center',
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <div
                        style={{
                            display: 'block',
                            border: '1px dashed grey',
                            alignSelf: 'center',
                            margin: 'auto',
                            overflow: 'hidden',
                        }}
                    >
                        { item }
                    </div>
                </div>
            )
        }
    </Sheet>
)    


const Sheet = styled.div`
    display: grid;
    width: 1400px;
    grid-gap: 15px;
    grid-template-columns: repeat(3, auto);
    background-color: white;
    border: 2px solid blue;
    margin: auto;
    margin-top: 50px;
`
/*
                        margin: 'auto',
                        backgroundColor: 'rgba(0,0,0,0.1)'
*/