import React from 'react';
import styled from 'styled-components';
import '../app.css';

export default ({ title, middleSection, children }) => {

  return (
            <Bar>
                <Logo>{title}</Logo>
                <MidSection>
                    {middleSection}
                </MidSection>
                <div/>
                {children}
            </Bar>
        );
}


const Logo = styled.h2`
    margin: auto !important;
    color: white;
`;

const MidSection = styled.div`
    margin: auto !important;
    display: grid;
`;

const Bar = styled.div`
    position: static;
    background-color: gold;
    widh: 100%;
    height: 50px;
    display: grid;
    grid-template-columns: 200px auto 240px ${ ({children})=> Array.isArray(children[2]) ? children[2].reduce(acc=>acc+"50px ","") : "50px "  };

    -webkit-box-shadow: -4px 13px 8px -11px rgba(0,0,0,0.75);
    -moz-box-shadow: -4px 13px 8px -11px rgba(0,0,0,0.75);
    box-shadow: -4px 13px 8px -11px rgba(0,0,0,0.75);
`;
