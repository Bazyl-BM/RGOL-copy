import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background: #ededed !important;
  z-index: 999;
  div {
    line-height: 20px;
    color: #ccc;
    margin: 0 auto;
    font-size: 13px;
    margin: 0 auto;
    font-size: 13px;
    text-align: center;
    img {
      height: 60px;
      cursor: pointer;
      width: 40px !important;
      margin: 0 4px;
    }
  }
`;

const Footer = ({ images }) => (
  <StyledFooter>
    <div>
      {images.map((image) => (
        <img src={image.src} />
      ))}
    </div>
  </StyledFooter>
);

export default Footer;
