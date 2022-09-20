import type { FC } from 'react';
import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import styled from 'styled-components';

interface Props {
  position: 'left' | 'right';
  onClick: any;
}
interface ButtonProps {
  position: 'left' | 'right';
}
const Button = styled.button<ButtonProps>`
  position: absolute;
  left: ${({ position }) => (position === 'left' ? '10px' : 'unset')};
  right: ${({ position }) => (position === 'right' ? '10px' : 'unset')};
  z-index: 10;
  background: none;
  border-style: none;
  font-size: 25px;
  cursor: pointer;
  top: 50%;
  translate: translate(-50%);
  display: flex;
  align-items: center;
  padding: 3px 0;
  margin: 0;
  color: #000;
  transition: color 0.2s linear;
  opacity: 0;
  background: rgba(0, 0, 0, 0.2);
  -webkit-backface-visibility: hidden;
  will-change: opacity;
  -webkit-transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
  transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
`;

const ArrowButton: FC<Props> = ({ position, onClick }) => (
  <div>
    <Button position={position} type="button" onClick={onClick}>
      {position === 'left' && <IoIosArrowBack />}
      {position === 'right' && <IoIosArrowForward />}
    </Button>
  </div>
);

export default ArrowButton;
