import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import styled from 'styled-components';

import { Checkbox } from '@/components/Newsletter/Newsletter.style';
import type { IProduct } from '@/models/productModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { incrementBasketProduct } from '@/redux/Slice/basketSlide';
import {
  decrementCupboardProduct,
  decrementCupboardProductList,
} from '@/redux/Slice/cupboardSlide';

export const CupboardTitle = styled.div`
  padding-right: 1.6rem;
  padding-left: 1.6rem;
  margin-bottom: 0.8rem;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  @media (min-width: 1200px) {
    max-width: 1600px;
  }
  @media (min-width: 992px) and (max-width: 1200px) {
    max-width: 1199px;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    max-width: 991px;
  }
  @media (min-width: 576px) and (max-width: 768px) {
    max-width: 767px;
  }
  h1 {
    text-align: center;
    @media (max-width: 767.98px) {
      font-size: 25.6px;
    }
    @media (max-width: 1199.98px) and (min-width: 767.98px) {
      font-size: 28.8px;
    }
  }
`;
export const Wrapper = styled.div`
  padding-right: 0.8rem;
  padding-left: 0.8rem;

  width: 100%;
  margin-right: auto;
  margin-left: auto;
  @media (min-width: 1200px) {
    max-width: 1600px;
  }
  @media (min-width: 992px) and (max-width: 1200px) {
    max-width: 1199px;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    max-width: 991px;
  }
  @media (min-width: 576px) and (max-width: 768px) {
    max-width: 767px;
  }
`;
export const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export const Cointeiner = styled.div`
  flex: 0 0 100%;
  max-width: 100%;
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  :first-of-type {
    margin-top: 1.6rem;
  }
`;
export const ItemWrapper = styled.div`
  margin-top: -10px;
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
`;
export const NoItemText = styled.div`
  text-align: center;
  margin-bottom: 4.8rem;
`;
export const ItemContainer = styled.div`
  position: relative;
  margin-bottom: 0;
  padding: 0;
  width: 100%;
  @media (min-width: 1400px) {
    width: 25%;
  }
  @media (min-width: 1200px) and (max-width: 1400px) {
    width: 33.33333%;
  }
  @media (min-width: 992px) and (max-width: 1200px) {
    width: 33.33333%;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    width: 33.33333%;
  }
  @media (min-width: 576px) and (max-width: 768px) {
    width: 33.33333%;
  }
  @media (min-width: 360px) and (max-width: 576px) {
    width: 50%;
  }
  @media (max-width: 575.98px) {
    min-height: 300px;
  }
  /* @media (min-width: 1400px) .category-grid__item {
    width: 33.33333%;
  }
  @media (min-width: 1200px) .category-grid__item {
    width: 33.33333%;
  }
  @media (min-width: 992px) .category-grid__item {
    width: 33.33333%;
  }
  @media (min-width: 768px) .category-grid__item {
    width: 50%;
  }
  @media (min-width: 576px) .category-grid__item {
    width: 50%;
  }
  @media (min-width: 360px) .category-grid__item {
    width: 50%;
  } */
`;

export const ItemBody = styled.span`
  position: relative;
  display: block;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: 40%;
  background-color: #fafafa;
  overflow: hidden;
`;
export const ImageWrap = styled.span`
  display: block;
  background-position: 50%;
  background-size: 100%;
  background-repeat: no-repeat;
  :before {
    content: '';
    padding-top: 150%;
    display: block;
  }
  div {
    opacity: 1;
    visibility: visible;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    background-color: #fafafa;
    transition: opacity 0.3s, visibility 0.3s;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      max-height: 100%;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s, visibility 0.3s;
      max-width: 100%;
      height: auto;
    }
  }
`;
export const Badges = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 150;
  display: flex;
  flex-wrap: wrap;
  max-width: 65%;
  gap: 0 5px;
  align-items: center;
  top: -3px;
  @media (max-width: 991.98px) {
    max-width: 80%;
  }
`;
export const ItemPreview = styled.div`
  @media (max-width: 991.98px) {
    display: none !important;
  }
  display: block;
  z-index: 1;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 0.5rem;
  background-color: #fff;
  opacity: 1;
  transform: translateY(100%);
  transition: transform 0.25s 0.2s;
  pointer-events: none;
  padding-top: 0.8rem;
  button {
    font-family: Oswald, Fira Sans Extra Condensed, sans-serif;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: color 0.15s ease-in-out, background 0.15s ease-in-out,
      border 0.15s ease-in-out;
    cursor: pointer;
    display: inline-block;

    text-align: center;
    vertical-align: middle;
    user-select: none;
    font-size: 1.4rem;
    line-height: 1.5;
    border-radius: 0;
    width: 100%;
    padding: 0.8rem;
    :first-of-type {
      background-color: #86c042;
      border: 2px solid #86c042;
      color: #fff;
      margin-bottom: 0.8rem;
    }
    :last-of-type {
      background-color: transparent;
      border: 2px solid #b2b2b2;
      color: #000;
    }
  }
`;
export const ItemFooter = styled.span`
  position: relative;
  display: block;
  margin: 0;
  padding: 5px 0.8rem 0;
  @media (max-width: 991.98px) {
    margin-bottom: 115px;
    padding: 0.5rem 0.8rem 0;
  }
  ul {
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
  }
`;
export const ItemFooterTitle = styled.span`
  font-family: Oswald, Fira Sans Extra Condensed, sans-serif;
  font-size: 14px;
  line-height: 1.3;
  color: unset;
  font-weight: unset;
  text-transform: uppercase;
  display: block;
  word-break: break-word;
`;

export const Price = styled.span`
  font-family: inherit;
  font-size: 14px;
  color: unset;
  font-weight: 500;
  text-transform: none;
  position: relative;
  span {
    white-space: nowrap;
  }
`;
export const RatingWrap = styled.div`
  display: flex;
  align-items: center;
  .star-svg {
    margin-right: 3px !important;
  }
`;
export const ItemRating = styled.span`
  @media (max-width: 991.98px) {
    display: block;
  }
  vertical-align: middle;
  font-weight: 400;
  line-height: 1;
  span {
    line-height: 1;
    font-size: 12px;
  }
`;
export const MobileItemPreview = styled(ItemPreview)`
  @media (min-width: 991.98px) {
    display: none !important;
  }
  @media (max-width: 991.98px) {
    background-color: hsla(0, 0%, 100%, 0.5);
    display: block !important;
    position: absolute;
    left: 0;
    right: 0;
    visibility: visible;
  }
  padding: 0.8rem;
  padding-top: 0;
`;
export const Item = styled.a`
  color: #000;
  position: relative;
  display: block;
  padding: 10px 10px 0;
  margin: 0 0 10px;
  height: 100%;
  border: 0 !important;
  overflow: hidden;
  :hover ${ItemPreview} {
    @media (min-width: 768px) {
      pointer-events: all;
      transform: translateY(0);
    }
  }
`;
export const FixedHeader = styled.div`
  position: fixed;
  right: 0;
  left: 0;
  z-index: 1030;
  border-top: 2px solid #e0e0e0;
  bottom: 0;
`;
export const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid rgba(0, 0, 0, 0.125);
  border-radius: 0.4rem;
  padding: 1.6rem;
`;
export const Container = styled.div`
  @media (min-width: 1200px) {
    max-width: 1600px;
  }
  @media (min-width: 992px) and (max-width: 1200px) {
    max-width: 1199px;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    max-width: 991px;
  }
  @media (min-width: 576px) and (max-width: 768px) {
    max-width: 767px;
  }
  padding-right: 1.6rem;
  padding-left: 1.6rem;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  div {
    justify-content: flex-end;
    flex-wrap: wrap;
    display: flex;
    button {
      font-family: Oswald, Fira Sans Extra Condensed, sans-serif;
      font-weight: 300;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: color 0.15s ease-in-out, background 0.15s ease-in-out,
        border 0.15s ease-in-out;
      padding: 0.8rem 4.8rem;
      font-size: 1.4rem;
      line-height: 1.5;
      border-radius: 0;
      text-align: center;
      vertical-align: middle;
      user-select: none;
      display: inline-block;
      cursor: pointer;
      :first-of-type {
        @media (min-width: 768px) {
          order: 2;
          margin-bottom: 0;
          margin-left: 1.6rem;
        }
        background-color: #86c042;
        border: 2px solid #86c042;
        color: #fff;
        margin-bottom: 1.6rem;
      }
      :last-of-type {
        background-color: transparent;
        border: 2px solid #b2b2b2;
        color: #000;
        @media (min-width: 768px) {
          order: 1;
        }
      }
    }
  }
`;
const Cupboard = () => {
  const CupboardItems = useAppSelector((state) => state.cupboardItems.products);
  const dispatch = useAppDispatch();
  const [checkedItem, setCheckedItem] = useState<IProduct[]>([]);
  console.log(checkedItem);
  return (
    <div>
      <div style={{ marginTop: '2.4rem' }}>
        <hr />
        <CupboardTitle>
          <h1>Schowek</h1>
        </CupboardTitle>
        <hr />
      </div>

      <Wrapper>
        <Cointeiner>
          <ItemWrapper>
            {CupboardItems.map((cupboardItem) => (
              <ItemContainer key={cupboardItem.productKey}>
                <div>
                  <Item>
                    <ItemBody>
                      <Badges>
                        <Checkbox>
                          <div>
                            <input
                              id={`checkbox${cupboardItem.productKey}`}
                              type="checkbox"
                              onClick={() => {
                                if (checkedItem.includes(cupboardItem)) {
                                  const newList = checkedItem.filter(
                                    (item) =>
                                      item.productKey !==
                                      cupboardItem.productKey
                                  );
                                  setCheckedItem(newList);
                                } else {
                                  setCheckedItem([
                                    ...checkedItem,
                                    cupboardItem,
                                  ]);
                                }
                              }}
                              checked={checkedItem.includes(cupboardItem)}
                            />
                            <label
                              htmlFor={`checkbox${cupboardItem.productKey}`}
                            ></label>
                          </div>
                        </Checkbox>
                      </Badges>
                      <ImageWrap>
                        <div>
                          <img
                            loading="lazy"
                            src={cupboardItem?.images[0]?.src}
                          />
                        </div>
                      </ImageWrap>
                      <ItemPreview>
                        <button
                          onClick={() => {
                            dispatch(
                              incrementBasketProduct({
                                ...cupboardItem,
                                quantity: 1,
                              })
                            );
                          }}
                        >
                          Dodaj do koszyka
                        </button>
                        <button
                          onClick={() => {
                            dispatch(decrementCupboardProduct(cupboardItem));
                          }}
                        >
                          Usuń
                        </button>
                      </ItemPreview>
                    </ItemBody>
                    <ItemFooter>
                      <div>
                        <ItemFooterTitle>{cupboardItem.name}</ItemFooterTitle>
                        <ul>
                          <li>
                            <strong>Rozmiar</strong>: <span>One Size</span>
                          </li>
                        </ul>
                        <Price>
                          <span>
                            <span>{cupboardItem.price.toFixed(2)}</span>
                            <span>zł</span>
                          </span>
                        </Price>
                        <RatingWrap>
                          <Rating
                            ratingValue={
                              (cupboardItem.reviews.reduce((acc, obj) => {
                                return acc + obj.rating;
                              }, 0) /
                                cupboardItem.reviews.length) *
                              20
                            }
                            readonly
                            iconsCount={5}
                            size={18.5}
                            fillColor="#86c042"
                            style={{ marginTop: '-6px', marginBottom: '4px' }}
                          />
                          <ItemRating>
                            <span>
                              (
                              {(
                                ((cupboardItem.reviews.reduce((acc, obj) => {
                                  return acc + obj.rating;
                                }, 0) /
                                  cupboardItem.reviews.length) *
                                  20) /
                                20
                              ).toFixed(1)}
                              )
                            </span>
                          </ItemRating>
                        </RatingWrap>
                      </div>
                      <MobileItemPreview>
                        <button
                          onClick={() => {
                            dispatch(
                              incrementBasketProduct({
                                ...cupboardItem,
                                quantity: 1,
                              })
                            );
                          }}
                        >
                          Dodaj do koszyka
                        </button>
                        <button
                          onClick={() => {
                            dispatch(decrementCupboardProduct(cupboardItem));
                          }}
                        >
                          Usuń
                        </button>
                      </MobileItemPreview>
                    </ItemFooter>
                  </Item>
                </div>
              </ItemContainer>
            ))}
          </ItemWrapper>
        </Cointeiner>
        {CupboardItems.length === 0 && (
          <Cointeiner>
            <NoItemText>Brak produktów w wybranym schowku</NoItemText>
          </Cointeiner>
        )}
        {checkedItem.length !== 0 && (
          <FixedHeader>
            <Card>
              <Container>
                <div>
                  <button>Dodaj zaznaczone do koszyka</button>
                  <button
                    onClick={() => {
                      dispatch(decrementCupboardProductList(checkedItem));
                      setCheckedItem([]);
                    }}
                  >
                    Usuń zaznaczone
                  </button>
                </div>
              </Container>
            </Card>
          </FixedHeader>
        )}
      </Wrapper>
    </div>
  );
};

export default Cupboard;
