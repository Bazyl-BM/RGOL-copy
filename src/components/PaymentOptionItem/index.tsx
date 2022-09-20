import type { FC } from 'react';
import React from 'react';
import styled from 'styled-components';

const Item = styled.div`
  display: block;
  padding-bottom: 10px;
  padding-top: 10px;
  @media (min-width: 992px) {
    flex: 0 0 33.33333%;
    max-width: 33.33333%;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    flex: 0 0 25%;
    max-width: 25%;
  }
  @media (min-width: 576px) and (max-width: 768px) {
    flex: 0 0 33.33333%;
    max-width: 33.33333%;
  }
  flex: 0 0 50%;
  max-width: 50%;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
`;

interface Props {
  isActive: boolean;
}

const Body = styled.div<Props>`
  :hover {
    box-shadow: inset 0 0 0 3px #86c042;
  }
  box-shadow: ${(props) => (props.isActive ? 'inset 0 0 0 3px #86c042' : '')};
  border: 1px solid #e0e0e0;
  min-height: 110px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #000 !important;
  background-image: none;
  background-color: transparent;
  text-align: center;
  padding: 0.8rem;
`;
const Photo = styled.div`
  img {
    width: 50px;
    height: 40px !important;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0.4rem;
    display: block;
    height: auto;
  }
  div {
    white-space: normal;
    line-height: 16px;
    font-weight: 500;
    margin-bottom: 0.4rem;
  }
  span {
    font-weight: 300;
  }
`;

interface CustomInputProps {
  image: string;
  name: string;
  price: number;
  value: string;
  valueName: string;
  handleClick: () => void;
}

export const PaymentOptionItem: FC<CustomInputProps> = ({
  image,
  name,
  price,
  value,
  valueName,
  handleClick,
}) => (
  <Item onClick={handleClick}>
    <Body isActive={value === valueName}>
      <Photo>
        <img src={image} />
        <div>{name}</div>
        <span>{`${price.toFixed(2)} zł`}</span>
      </Photo>
    </Body>
  </Item>
);
