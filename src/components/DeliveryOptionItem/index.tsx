import type { FC } from 'react';
import React from 'react';
import styled from 'styled-components';

export const Item = styled.div`
  display: block;
  padding-bottom: 10px;
  padding-top: 10px;

  @media (min-width: 992px) {
    flex: 0 0 50%;
    max-width: 50%;
  }
  flex: 0 0 100%;
  max-width: 100%;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  position: relative;
`;
interface Props {
  isActive: boolean;
}
export const Body = styled.div<Props>`
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
  flex-direction: column;
`;
export const Photo = styled.div`
  img {
    max-width: 50px;
    max-height: 40px;
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
export const TimeDelivery = styled.div`
  font-size: 12px;
  font-weight: 300 !important;
  word-break: break-word;
  white-space: normal;
  line-height: 16px;
  padding-bottom: 0.8rem;
  padding-top: 0.5rem;
`;

interface CustomInputProps {
  image: string;
  name: string;
  price: number;
  delivery: string;
  value: any;
  handleClick: () => void;
}
export const DeliveryOptionItem: FC<CustomInputProps> = ({
  image,
  name,
  price,
  delivery,
  value,
  handleClick,
}) => (
  <Item onClick={handleClick}>
    <Body isActive={name === value}>
      <Photo>
        <img src={image} />
        <div>{name}</div>
        <span>{`${price.toFixed(2)} zł`}</span>
      </Photo>
      <TimeDelivery>Przewidywana dostawa {delivery} dni robocze</TimeDelivery>
    </Body>
  </Item>
);
