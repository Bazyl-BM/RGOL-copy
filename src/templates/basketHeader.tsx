import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div`
  top: 0;
  right: 0;
  z-index: 1001;
  padding: 0;
  min-height: 41px;
  background-color: #000;
`;
export const Conteiner = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  a {
    margin-right: 0;
    text-decoration: none !important;
    outline: none !important;
    border: 0 transparent;
    display: inline-block;
    padding-top: 1rem;
    padding-bottom: 0.45rem;
    font-size: 1.4rem;
    line-height: inherit;
    white-space: nowrap;
    img {
      height: 21px;
    }
  }
`;

// interface CustomInputProps {
//   type?: string;
//   label: string;
//   disabled?: boolean;
// }
const BasketHeader = () => {
  return (
    <Wrapper>
      <Conteiner>
        <a>
          <img src="https://gfx.r-gol.com/media/pub/logo2.png" />
        </a>
      </Conteiner>
    </Wrapper>
  );
};
export default BasketHeader;
