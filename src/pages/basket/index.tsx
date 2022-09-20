/* eslint-disable import/no-cycle */
import { getCookie } from 'cookies-next';
import { Field, Form, Formik } from 'formik';
import type { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import styled from 'styled-components';

import { BasketItem } from '@/components/BasketItem';
import { CustomField } from '@/components/Formik/FIeld';
import BasketPageWrap from '@/templates/basketPageWrap';
import dbConnect from '@/utils/dbConnect';

import Product from '../../models/productModel';

export const Wrapper = styled.div`
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  padding-left: 0;
  padding-right: 0;
`;
export const Conteiner = styled.div`
  padding-bottom: 4.8rem;
  position: relative;
`;
export const BasketWrap = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding-left: 1.6rem;
  padding-right: 1.6rem;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1.6rem;
  @media (min-width: 768px) {
    margin-bottom: 2.4rem;
  }
`;

export const Col = styled.div`
  padding-right: 0;
  padding-left: 0;
  flex: 0 0 100%;
  max-width: 100%;
  position: relative;
  width: 100%;
`;
export const Padding = styled.div`
  padding-bottom: 0.8rem;
  padding-top: 0.8rem;
`;
interface Props {
  step: number;
}
export const Breadcrumb = styled.ol<Props>`
  position: relative;
  padding: 0;
  white-space: nowrap;
  background-color: transparent;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
  display: flex;
  flex-wrap: wrap;
  font-size: 1.2rem;
  list-style: none;
  border-radius: 0.4rem;
  margin-top: 0;
  :before {
    content: '';
    height: 1px;
    background-color: #000;
    position: absolute;
    top: 50%;
    left: 50%;
    width: calc(100% - 4rem);
    transform: translate(-50%, -50%);
    z-index: -1;
  }
  li {
    padding: 0;
    white-space: normal;
    overflow: hidden;
    font-size: 20px;
    max-width: 65%;
    text-transform: uppercase;

    :first-of-type {
      span {
        color: ${(props) => (props.step === 1 ? '#86c042' : '')};

        padding-left: 0;
      }
    }
    :last-of-type {
      span {
        color: ${(props) => (props.step !== 1 ? '#86c042' : '')};
        padding-right: 0;
      }
    }
    span {
      display: inline-block;
      padding: 0 2.4rem;
      background-color: #fff;
      font-weight: 400;
      line-height: 1.15;
      color: #000;
    }
    display: flex;
    text-align: left;
  }
`;
export const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
`;
export const LeftDiv = styled.div`
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  flex: 0 0 100%;
  max-width: 100%;
  @media (min-width: 992px) {
    flex: 0 0 66.66667%;
    max-width: 66.66667%;
  }
`;
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

export const Quality = styled.div`
  margin-right: 3.2rem;
  border-right: 1px solid #f2f2f2;
  border-left: 1px solid #f2f2f2;
  margin-top: 1.6rem;
  max-width: 40%;
  min-width: 70px;
  display: none;
  text-align: center;
  @media (min-width: 576px) {
    display: block;
  }
`;
export const QualityCounter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 140px;
  padding: 0 0.8rem;
  background-color: #fafafa;
  margin-top: 0.4rem;
  margin-right: 1.6rem;
  margin-left: 1.6rem;
  white-space: nowrap;
  a {
    border-radius: 50%;
    background-color: #000;
    color: #fff !important;
    height: 15px;
    width: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    word-break: break-word;
    border-bottom: 0;
    font-size: 22px;
  }
  input {
    min-width: 60px;
    width: 60px;
    background-color: transparent !important;
    border: 1px solid #c4c4c4;
    border-top: none;
    border-bottom: none;
    min-height: 40px;
    padding: 0.8rem;
    box-shadow: none;
    outline: none;
    font-size: 1.2rem;
    display: block;
    font-weight: 300;
    line-height: 1.5;
    color: #495057;
    background-clip: padding-box;
    border-radius: 0;
    height: auto;
    text-align: center;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    -moz-appearance: textfield;
  }
`;
export const FreeDelivery = styled.div`
  position: relative;
  flex: 0 0 100%;
  max-width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  width: 100%;
  margin-bottom: 30px;
  div {
    min-height: 40px;
    background: #f4f2f2;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 4px 20px;
    margin-bottom: 10px;
    p {
      padding: 0;
      margin: 0 0 0 10px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      a {
        align-items: center;
        color: inherit;
        display: none;
        border-bottom: 0;

        @media (min-width: 576px) {
          display: flex;
        }
        i {
          margin: 0 0.8rem;
        }
      }
    }
  }
`;
export const InputWrap = styled.div`
  flex: 0 0 100%;
  max-width: 100%;
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  margin-bottom: 3rem;
  @media (min-width: 768px) {
    flex: 0 0 50%;
    max-width: 50%;
  }
  form {
    width: 100%;
  }
`;
export const CashbackInput = styled.div`
  margin-right: 0;
  margin-left: 0;
  display: flex;
  flex-wrap: wrap;
`;
export const CartInput = styled.div`
  margin-top: 0.8rem;
`;
export const ButtonWrap = styled.div`
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  flex: 0 0 100%;
  max-width: 100%;
  margin-bottom: 4.8rem;
`;
export const InputLabel = styled.div`
  cursor: pointer;
  margin-bottom: 0;
  text-transform: uppercase;
  i {
    margin: 0 1rem;
  }
`;
export const Title = styled.div`
  cursor: pointer;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  position: relative;
  padding-right: 2.4rem;
  strong {
    text-transform: uppercase;
    font-weight: 500;
  }
  i {
    transition: rotate 0.5s;
  }
`;

export const Text = styled.p`
  margin-top: 2.4rem;
  margin-bottom: 2.4rem;
`;
export const FormWrap = styled.div`
  flex-wrap: wrap;
  display: flex;
  div {
    width: 100%;
  }
  form {
    div {
      :nth-of-type(2) {
        margin: 0.8rem 0;
      }
    }
  }
`;
export const SubmitButton = styled.div`
  margin-left: auto;
  margin-left: -1px;
  display: flex;
  text-align: right;
  justify-content: flex-end;
  button {
    border: none;
    padding: 0;
    background-color: transparent;
    font-weight: 300;
    border-bottom: none !important;
    text-decoration: underline;
    line-height: 1rem;
    color: #000;
  }
`;
export const SummaryWrap = styled.div`
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  flex: 0 0 100%;
  max-width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 1.6rem;
  @media (min-width: 768px) {
    flex: 0 0 50%;
    max-width: 50%;
    margin-left: 50%;
  }
`;
export const SummaryConteiner = styled.div`
  width: 100%;
  ul {
    padding-left: 0;
    list-style: none;
    width: 100%;
    li {
      line-height: 1.92rem;
      label {
        margin-bottom: 0;
      }
      div {
        float: right;
      }
      :first-of-type {
        margin-bottom: 0.4rem;
        span {
          float: right;
        }
      }
      :last-of-type {
        text-transform: uppercase;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        font-size: 20px;
        color: #000;
        margin-top: 2.4rem;
      }
    }
  }
`;
export const SummaryInfo = styled.div`
  padding: 0.4rem;
  line-height: 1.75;
  background-color: #fafafa;
  text-align: center;
  margin-bottom: 0.4rem;
  p {
    margin-bottom: 0;
  }
`;
export const CheckboxBasket = styled.div`
  margin-top: 0.4rem;
  text-align: left;
  padding: 0.4rem 0.4rem 0;
  border-top: 1px solid #e0e0e0;
  position: relative;
  input {
    position: absolute;
    opacity: 0;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    overflow: visible;
    &:checked + label:before {
      background-color: #e0e0e0;
      border: 1px solid #e0e0e0;
    }
    &:checked + label:after {
      border: 2px solid #000;
      opacity: 1;
    }
    &:focus + label:before {
      outline: none;
      border-color: #86c042;
    }
  }
  label {
    cursor: pointer;
    position: relative;
    margin: 0;
    line-height: 20px;
    display: inline-block;
    ::before {
      content: '';
      background: #e0e0e0;
      border: 1px solid #e0e0e0;
      display: inline-block;
      width: 20px;
      height: 20px;
      position: relative;
      top: 0;
      margin-right: 1em;
      vertical-align: top;
      cursor: pointer;
      text-align: center;
      transition: all 0.25s ease;
    }
    :after {
      content: '';
      display: block;
      width: 5px;
      height: 10px;
      border: solid #fff;
      border-width: 0 1px 1px 0 !important;
      transform: rotate(45deg);
      transition: all 0.25s ease;
      position: absolute;
      top: 3px;
      left: 8px;
      opacity: 0;
    }
    p {
      display: inline;
    }
  }
`;
export const ButtonConteiner = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
  justify-content: space-between;
  div {
    :first-of-type {
      position: relative;
      width: 100%;
      padding-right: 10px;
      padding-left: 10px;
      flex: 0 0 100%;
      max-width: 100%;
      @media (min-width: 576px) {
        flex: 0 0 50%;
        max-width: 50%;
        order: 13;
      }
      button {
        background-color: #86c042;
        border: 2px solid #86c042;
        color: #fff;
        width: 100%;
        font-size: 1.5rem;
        font-family: Oswald, Fira Sans Extra Condensed, sans-serif;
        font-weight: 300;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: color 0.15s ease-in-out, background 0.15s ease-in-out,
          border 0.15s ease-in-out;
        padding: 0.8rem 4.8rem;

        line-height: 1.5;
        border-radius: 0;
        text-align: center;
        vertical-align: middle;
        user-select: none;
        display: inline-block;
      }
    }
    :last-of-type {
      position: relative;
      width: 100%;

      padding-right: 10px;
      padding-left: 10px;
      flex: 0 0 100%;
      max-width: 100%;
      @media (min-width: 576px) {
        flex: 0 0 50%;
        max-width: 50%;
      }
      a {
        background-color: transparent;
        border: 2px solid #b2b2b2;
        color: #000;
        width: 100%;
        font-family: Oswald, Fira Sans Extra Condensed, sans-serif;
        font-weight: 300;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: color 0.15s ease-in-out, background 0.15s ease-in-out,
          border 0.15s ease-in-out;
        padding: 0.8rem 4.8rem;
        font-size: 1.5rem;
        line-height: 1.5;
        border-radius: 0;
        text-align: center;
        vertical-align: middle;
        user-select: none;
        display: inline-block;
      }
    }
  }
`;
export const RightDiv = styled.div`
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  flex: 0 0 100%;
  max-width: 100%;
  margin-top: 4.8rem;
  @media (min-width: 992px) {
    flex: 0 0 33.33333%;
    max-width: 33.33333%;
    margin-top: 0;
  }
  ul {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    list-style: none;
    padding: 4.8rem 4.8rem 0;
    margin: 0;
    border: 1px solid #e0e0e0;
    li {
      flex-grow: 1;
      display: flex;
      align-items: center;
      text-transform: uppercase;
      width: 100%;
      font-weight: 400;
      font-size: 12px;
      line-height: 1;
      color: #424242;
      margin-bottom: 4.8rem;
      img {
        margin-right: 0.25rem;
        width: 25px;
      }
    }
  }
`;
// interface CustomInputProps {
//   type?: string;
//   label: string;
//   disabled?: boolean;
// }
const ResultBox = ({ userName }) => {
  const [isOpen, setIsOpen] = useState({
    CashoutInputOpen: false,
    CartInputOpen: false,
  });
  console.log(userName);
  return (
    <>
      <BasketPageWrap step={1}>
        <Flex>
          <LeftDiv>
            <Flex>
              <ItemWrap>
                <ProductList>
                  <div>
                    <BasketItem
                      image={
                        'https://gfx.r-gol.com/media/res/products/68/149068/100x130/2080697450544_1.jpg'
                      }
                      name={'Książka "Kowal. Prawdziwa historia" z autografem'}
                      price={89.9}
                      code={'2080697450544'}
                      changeQuality
                    />
                  </div>
                </ProductList>
              </ItemWrap>
              <FreeDelivery>
                <div>
                  <p>
                    <span>
                      Do darmowej dostawy brakuje Ci <b>133,01 zł</b>
                    </span>
                    <a>
                      Kontynuuj zakupy <i>{'>'}</i>
                    </a>
                  </p>
                </div>
              </FreeDelivery>
              <InputWrap>
                <CashbackInput>
                  <Col>
                    <InputLabel
                      onClick={() =>
                        setIsOpen((prev) => ({
                          ...prev,
                          CashoutInputOpen: !prev.CashoutInputOpen,
                        }))
                      }
                    >
                      <div>
                        <strong>Użyj kodu Rabatowego</strong>
                        <i
                          style={{
                            rotate: isOpen.CashoutInputOpen ? '0deg' : '90deg',
                          }}
                        >
                          {'>'}
                        </i>
                      </div>
                    </InputLabel>
                    <div
                      style={{
                        display: isOpen.CashoutInputOpen ? '' : 'none',
                      }}
                    >
                      <FormWrap style={{ marginTop: '1.6rem' }}>
                        <Formik
                          initialValues={{
                            Code: '',
                          }}
                          onSubmit={(values: Values) => {
                            console.log(values);
                          }}
                        >
                          {({ isSubmitting }) => (
                            <Form style={{ display: 'flex' }}>
                              <Field
                                type="text"
                                name="Code"
                                label="Wpisz kod"
                                inputType="input"
                                component={CustomField}
                              />

                              <SubmitButton
                                style={{
                                  width: '30%',
                                  paddingLeft: '0.8rem',
                                  textAlign: 'left',
                                  justifyContent: 'center',
                                  alignItems: 'flex-start',
                                }}
                              >
                                <button type="submit">Zastosuj kod</button>
                              </SubmitButton>
                            </Form>
                          )}
                        </Formik>
                      </FormWrap>
                    </div>
                  </Col>
                </CashbackInput>
                <CartInput>
                  <Col>
                    <InputLabel
                      onClick={() =>
                        setIsOpen((prev) => ({
                          ...prev,
                          CartInputOpen: !prev.CartInputOpen,
                        }))
                      }
                    >
                      <Title>
                        <strong>Karta podarunkowa</strong>
                        <i
                          style={{
                            rotate: isOpen.CartInputOpen ? '270deg' : '90deg',
                          }}
                        >
                          {'>'}
                        </i>
                      </Title>
                    </InputLabel>
                    <div
                      style={{
                        display: isOpen.CartInputOpen ? '' : 'none',
                      }}
                    >
                      <Text>Dodaj kartę podarunkową</Text>
                      <FormWrap>
                        <Formik
                          initialValues={{
                            Code: '',
                            PIN: '',
                          }}
                          onSubmit={(values: Values) => {
                            console.log(values);
                          }}
                        >
                          {({ isSubmitting }) => (
                            <Form>
                              <Field
                                type="text"
                                name="Code"
                                label="Kod kreskowy karty"
                                inputType="input"
                                component={CustomField}
                              />
                              <Field
                                type="text"
                                name="PIN"
                                label="PIN"
                                inputType="input"
                                component={CustomField}
                                style={{ margin: 0 }}
                              />
                              <SubmitButton>
                                <button type="submit">Dodaj kartę</button>
                              </SubmitButton>
                            </Form>
                          )}
                        </Formik>
                      </FormWrap>
                    </div>
                  </Col>
                </CartInput>
              </InputWrap>
              <SummaryWrap>
                <SummaryConteiner>
                  <SummaryInfo>
                    <p>
                      <span>Z programem lojalnościowym R-TEAM otrzymasz</span>
                      &nbsp;
                      <b>
                        <span>
                          <span>20 zł</span>
                        </span>
                      </b>{' '}
                      <span>&nbsp;</span>
                    </p>
                    <CheckboxBasket>
                      <input type="checkbox" id="s" />
                      <label htmlFor="s">
                        Zakładam konto, akceptuję Regulamin oraz przystepuję do
                        programu R-TEAM.
                      </label>
                    </CheckboxBasket>
                  </SummaryInfo>
                  <ul>
                    <li>
                      <label>Produkty (suma):</label> <span>199,99 zł</span>
                    </li>
                    <li>
                      <label>Wysyłka:</label>{' '}
                      <div>
                        <span>od 9,99 zł</span>
                      </div>
                    </li>{' '}
                    <li>
                      <strong>Do zapłaty:</strong>{' '}
                      <strong>
                        <span>199,99 zł</span>
                      </strong>
                    </li>
                  </ul>
                </SummaryConteiner>
              </SummaryWrap>
              <ButtonWrap>
                <ButtonConteiner>
                  <div>
                    <button>Dostawa i płatność</button>
                  </div>
                  <div>
                    <a>Powrót do zakupów</a>
                  </div>
                </ButtonConteiner>
              </ButtonWrap>
            </Flex>
          </LeftDiv>
          <RightDiv>
            <ul>
              <li>
                <img src="https://gfx.r-gol.com/media/pub/ikony_usp/delivery.svg" />
                DOSTAWA GRATIS OD 249 ZŁ
              </li>
              <li>
                <img src="https://gfx.r-gol.com/media/pub/ikony_usp/cashback.svg" />
                10% CASHBACK W R-TEAM
              </li>
              <li>
                <img src="https://gfx.r-gol.com/media/pub/ikony_usp/recommend.svg" />
                Ocena 4.9 w TrustMate
              </li>
              <li>
                <img src="https://gfx.r-gol.com/media/pub/ikony_usp/return.svg" />
                30 dni na darmowy zwrot
              </li>
            </ul>
          </RightDiv>
        </Flex>
      </BasketPageWrap>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  await dbConnect();
  const ProductID = [];
  const ProductQuantity = [];
  const items = getCookie('bas', { req, res });

  JSON.parse(items).forEach(({ quantity, productKey }) => {
    ProductID.push(productKey);
    ProductQuantity.push({ quantity, productKey });
  });
  console.log(ProductQuantity);
  const data = await Product.find({
    productKey: { $in: ProductID },
  });
  const merged = _.map(data, (item) => {
    return _.assign(
      item,
      _.find(ProductQuantity, ['productKey', item.productKey])
    );
  });

  return {
    props: {
      userName: JSON.parse(
        JSON.stringify({
          merged,
        })
      ),
    },
  };
};
export default ResultBox;
