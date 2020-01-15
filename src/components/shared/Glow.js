import styled from "styled-components";

export default styled.div.attrs(({ rad = 150 }) => ({
  style: {
    boxShadow: `0px 0px ${rad * 1.2}px ${rad}px gold`
  }
}))`
  width: 0;
  height: 0;
  border-radius: 50%;
`;
