import styled from "styled-components";
import React from "react";
import { useTheme } from "../../providers/ThemeProvider";

export default props => {
  const {theme} = useTheme()

  return <Glow theme={theme} />
}

const Glow = styled.div.attrs(({ rad = 150, theme }) => ({
  style: {
    boxShadow: `0px 0px ${rad * 1.2}px ${rad}px ${theme.glowColor}`
  }
}))`
  width: 0;
  height: 0;
  border-radius: 50%;
`;
