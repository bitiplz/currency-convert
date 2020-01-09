import React from 'react';
import styled from 'styled-components';
import '../app.css';

export default ({ title, auth, children }) => {

  return (
            <Bar>
                <Logo>{title}</Logo>
                <div/>
                {children}
            </Bar>
        );
}

const Logo = styled.h2`
    margin: auto !important;
    color: white;
`;

const Bar = styled.div`
    position: static;
    background-color: rgba(0, 251, 255, 0.7);
    widh: 100%;
    height: 50px;
    display: grid;
    grid-template-columns: 200px auto ${ ({children, auth})=>children[2].reduce(acc=>acc+"50px ","")};

    -webkit-box-shadow: -4px 13px 8px -11px rgba(0,0,0,0.75);
    -moz-box-shadow: -4px 13px 8px -11px rgba(0,0,0,0.75);
    box-shadow: -4px 13px 8px -11px rgba(0,0,0,0.75);
`;
