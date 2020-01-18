import React from 'react';
import styled from 'styled-components';
import '../app.css';
import { useTheme } from '../providers/ThemeProvider';

export default ({ title, middleSection, children }) => {

    const {theme} = useTheme() 

  return (
            <TopBar theme={ theme } >
                <Logo theme={ theme } >{title}</Logo>
                <MidSection>
                    {middleSection}
                </MidSection>
                <div/>
                {children}
            </TopBar>
        );
}


const Logo = styled.h2`
    margin: auto !important;
    color: ${ ({theme}) => theme.fancyColor };
`;

const MidSection = styled.div`
    margin: auto !important;
    display: grid;
`;

const TopBar = styled.div`
    position: static;
    background-color: ${ ({theme}) => theme.headerColor };
    widh: 100%;
    height: 50px;
    padding: 8px;
    display: grid;
    grid-template-columns: 100px auto 100px ${ ({children})=> Array.isArray(children[2]) ? children[2].reduce(acc=>acc+"50px ","") : "50px "  };

    -webkit-box-shadow: -4px 13px 8px -11px rgba(0,0,0,0.75);
    -moz-box-shadow: -4px 13px 8px -11px rgba(0,0,0,0.75);
    box-shadow: -4px 13px 8px -11px rgba(0,0,0,0.75);
`;
