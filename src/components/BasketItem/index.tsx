import type { FC } from 'react';
import React from 'react';
import styled from 'styled-components';

import { Quality, QualityCounter } from '@/pages/basket';

export const ItemWrap = styled.div`
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  flex: 0 0 100%;
  max-width: 100%;
`;
export const ProductList = styled.section`
  padding-bottom: 2.4rem;
`;
export const ProductWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2.4rem;
`;
export const Product = styled.div`
  width: 100%;
  align-items: flex-start;
  flex-wrap: nowrap;
  display: flex;
`;
export const Photo = styled.div`
  margin-right: 1.6rem;
  background-color: #fafafa;
  width: 80px;
  font-size: 12px;
  a {
    img {
      width: 80px;
    }
  }
`;
export const Body = styled.div`
  flex-grow: 1;
  strong {
    font-weight: 500;
    display: inline-block;
    a {
      color: #000;
      border-bottom: 0;
      line-height: 16px;
      margin-bottom: 0.25rem;
      display: inline-block;
    }
  }
`;
export const Code = styled.p`
  margin-top: -10px;
  font-weight: 300;
  margin-bottom: 0.8rem;
  small {
    font-size: 80%;
    font-weight: 300;
  }
`;
export const ContentBox = styled.div`
  display: none;
  flex-wrap: wrap;
  margin-top: 2.4rem;
  margin-bottom: 2.4rem;
  @media (min-width: 576px) {
    display: flex;
    margin-top: 0;
    margin-bottom: 0;
  }
`;
export const Price = styled.div`
  margin-right: 3.2rem;
  display: none;
  margin-top: 1.6rem;
  max-width: 40%;
  min-width: 70px;
  @media (min-width: 576px) {
    display: block;
  }
  strong {
    font-weight: 500;
    s {
      @media (min-width: 768px) {
        margin-top: -7px;
      }
      color: #c4c4c4;
      font-weight: 300;
      font-size: 0.8em;
      display: block;
    }
  }
`;

interface CustomInputProps {
  image: string;
  name: string;
  price: number;
  code: string;
  changeQuality?: boolean;
}
export const BasketItem: FC<CustomInputProps> = ({
  image,
  name,
  price,
  code,
  changeQuality,
}) => (
  <ProductWrap>
    <Product>
      <Photo>
        <a>
          <img src={image} />
        </a>
      </Photo>
      <Body>
        <strong>
          <a>{name}</a>
        </strong>
        <Code>
          <small>{code}</small>
        </Code>
        <ContentBox>
          <Price>
            <div>Kwota</div>
            <strong>
              <span>{price.toFixed(2)} zł</span>
              <s>
                <span>129,99 zł</span>
              </s>
            </strong>
          </Price>
          <Quality>
            <div>Ilość</div>
            {changeQuality ? (
              <QualityCounter>
                <a>-</a>
                <input type="number" max="64" min="1" value="1" />
                <a>+</a>
              </QualityCounter>
            ) : (
              <strong>1</strong>
            )}
          </Quality>
          <Price style={{ textAlign: 'right' }}>
            <div>Wartość</div>
            <strong>
              <span>115,99 zł</span>
              <s>
                <span>129,99 zł</span>
              </s>
            </strong>
          </Price>
        </ContentBox>
      </Body>
    </Product>
  </ProductWrap>
);
