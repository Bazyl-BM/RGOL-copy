import type { FormikHelpers } from 'formik';
import { Field, Form, Formik } from 'formik';
import type { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { BasketItem } from '@/components/BasketItem';
import MapView from '@/components/CustomMap';
import { DeliveryOptionItem } from '@/components/DeliveryOptionItem';
import { CustomChecbox } from '@/components/Formik/Checbox';
import { CustomField } from '@/components/Formik/FIeld';
import { Checkbox } from '@/components/Newsletter/Newsletter.style';
import { PaymentOptionItem } from '@/components/PaymentOptionItem';
import BasketPageWrap from '@/templates/basketPageWrap';
import dbConnect from '@/utils/dbConnect';

import User from '../../models/UserModel';
import { ProductList } from '.';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1140px;
  margin: 0 auto;

  padding-right: 1rem;
`;
export const LeftSection = styled.div`
  position: relative;
  width: 100%;
  flex: 0 0 100%;
  max-width: 100%;
  padding-left: 0;
  @media (min-width: 992px) {
    flex: 0 0 50%;
    max-width: 50%;
    padding-right: 1.6rem;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: center;
  div {
    p {
      margin-bottom: 0;
      white-space: normal;
      line-height: 16px;
      :first-of-type {
        margin-bottom: 0.4rem;
        font-weight: 500;
      }
    }
  }
  span {
    display: flex;
    margin-bottom: 0;
    margin-top: 1.6rem;
    padding: 0;
    a {
      color: #000;
      border-bottom: 0;
      margin-right: 1.6rem;
    }
  }
  a {
    pointer-events: auto;
    opacity: 1;
    bottom: 7px;
    right: 7px;
    text-decoration: underline;
    font-weight: 300;
    border-bottom: none !important;
    line-height: 1.6rem;
    color: #000;
    position: absolute;
    margin: 0;
    padding: 0.4rem;
  }
`;
interface ItemContainerProps {
  isPointer?: boolean;
}
const ItemContainer = styled.div<ItemContainerProps>`
  cursor: ${(props) => (props.isPointer ? 'pointer' : '')};
  position: relative;
  width: 100%;
  padding: 10px;
  flex: 0 0 100%;
  height: auto;
  text-align: center;
  min-height: 200px;
  max-width: 100%;
  margin-left: -10px;
  @media (min-width: 576px) {
    flex: 0 0 50%;
    max-width: 50%;
  }
`;
export const SubmitWrap = styled.div`
  align-items: center;
  margin-bottom: 1.6rem;
  label {
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;
    text-align: center;
    display: block;
    font-family: Oswald, Fira Sans Extra Condensed, sans-serif;
    line-height: 1.2;
    color: #000;
    margin-bottom: 2.4rem;
    font-size: 2.8rem;
  }
`;
export const SubmitList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
  margin-top: -10px;
`;
export const ButtonWrap = styled.div`
  padding-right: 0;
  padding-left: 0;
  @media (min-width: 576px) {
    order: 13;
  }
  flex: 0 0 100%;
  max-width: 100%;
  position: relative;
  width: 100%;
  button {
    :hover {
      background-color: #79ae3a;
      border-color: #79ae3a;
      color: #fff;
    }
    background-color: #86c042;
    border: 2px solid #86c042;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    border: 2px solid #86c042;
    font-family: Oswald, Fira Sans Extra Condensed, sans-serif;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: color 0.15s ease-in-out, background 0.15s ease-in-out,
      border 0.15s ease-in-out;
    width: 100%;
    padding: 0.8rem 4.8rem;
    font-size: 1.4rem;
    line-height: 1.5;
    border-radius: 0;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    display: inline-block;
  }
`;

export const ListDelivery = styled.div`
  label {
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;
    text-align: center;
    display: block;
    color: #000;
    font-size: 2.8rem;
    font-family: Oswald, Fira Sans Extra Condensed, sans-serif;
    line-height: 1.2;
    margin-bottom: 1.6rem;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    margin-left: -10px;
    margin-bottom: 1.6rem;
    margin-top: -10px;
    max-height: 260px;
    overflow-x: hidden;
    padding-left: 0;
    list-style: none;
    li {
      display: block;
      padding-bottom: 10px;
      padding-top: 10px;
      padding-right: 10px;
      padding-left: 10px;
      line-height: 1.92rem;
      width: 100%;
      position: relative;
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
    }

    span {
      margin: 0;
      width: 100%;
      display: inline-block;
      input {
      }
      div {
        border: 1px solid #e0e0e0;
        min-height: 110px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #000 !important;
        background-color: #fff;
        color: #000;
        box-shadow: inset 0 0 0 3px #86c042;
        font-family: Oswald, Fira Sans Extra Condensed, sans-serif;
        font-weight: 300;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: color 0.15s ease-in-out, background 0.15s ease-in-out,
          border 0.15s ease-in-out;
        text-align: center;
        padding: 0.8rem;
        font-size: 1.4rem;
        line-height: 1.5;
        border-radius: 0;
        vertical-align: middle;
        user-select: none;
      }
    }
  }
`;
export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 0;
  padding-left: 0;
  @media (min-width: 992px) {
    padding-left: 1.6rem;
    flex: 0 0 50%;
    max-width: 50%;
  }
  flex: 0 0 100%;
  max-width: 100%;
  position: relative;
  width: 100%;
`;

export const Title = styled.label`
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  text-align: center;
  display: block;
  color: #000;
  font-size: 2.8rem;
  font-family: Oswald, Fira Sans Extra Condensed, sans-serif;
  line-height: 1.2;
  margin-bottom: 1.6rem;
`;
export const SummaryWrap = styled.div`
  flex-grow: 1;
`;
export const SummaryConteiner = styled.div`
  background: #fafafa;
  padding: 3.2rem 1.6rem;
  position: sticky;
  top: 0;
  h2 {
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;
    font-family: Oswald, Fira Sans Extra Condensed, sans-serif;
    line-height: 1.2;
    color: #000;
    font-size: 2rem;
    margin-bottom: 2.4rem;
  }
`;
interface Props {
  isDefault?: boolean;
}
const ContentWrap = styled.div<Props>`
  border: ${(props) =>
    props.isDefault ? '3px solid #86c042;' : '1px solid #c4c4c4'};
  :hover {
    border: '3px solid #86c042;';
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100% !important;
  padding: 30px;
  position: relative;
`;
export const PriceConteiner = styled.div`
  width: 100%;
  ul {
    padding-left: 0;
    list-style: none;
    width: 100%;
    li {
      line-height: 1.8rem;
      label {
        margin-bottom: 0;
      }
      span {
        float: right;
      }
      :first-of-type {
        margin-bottom: 0.4rem;
      }
      :last-of-type {
        text-transform: uppercase;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        font-size: 20px;
        color: #000;
        margin-top: 1.5rem;
        span {
          font-size: 20px;
          color: #000;
        }
      }
    }
  }
`;
export const FinalForm = styled.div`
  margin-top: 2.5rem;
`;
export const AdressWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 -10px;
`;

const Delivery = ({ addressData, invokeData }) => {
  const [basketValue, setBasketValue] = useState({
    deliveryMetod: '',
    paymentMetod: '',
    deliveryPlace: null,
  });
  const [isSetInvoke, setIsSetInvoke] = useState(false);

  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);

  const addressRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (isAddressFormOpen && addressRef.current)
      addressRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'end',
      });
  }, [isAddressFormOpen, addressRef]);

  return (
    <BasketPageWrap step={2}>
      <Formik
        initialValues={{
          message: '',
          confirmChec: false,
        }}
        onSubmit={(
          values: Values,
          { setSubmitting, resetForm }: FormikHelpers<Values>
        ) => {}}
      >
        {({ isSubmitting }) => (
          <Form>
            <Wrapper>
              <LeftSection>
                <ListDelivery>
                  <label>Wybierz kraj dostawy</label>
                  <ul>
                    <li>
                      <span>
                        {/* <input type="radio" name="country" value="1" /> */}
                        <div>Polska</div>
                      </span>
                    </li>
                  </ul>
                </ListDelivery>
                <SubmitWrap>
                  <label>Wybierz sposób dostawy</label>
                  <SubmitList>
                    <DeliveryOptionItem
                      image={
                        'https://gfx.r-gol.com/media/res/deliveries/4/PL_logo_Paczkomat1231 (1).jpg'
                      }
                      handleClick={() =>
                        setBasketValue((prev) => ({
                          ...prev,
                          deliveryMetod: 'InPost Paczkomaty 24/7',
                        }))
                      }
                      name={'InPost Paczkomaty 24/7'}
                      price={11.99}
                      value={basketValue.deliveryMetod}
                      delivery={'1-2'}
                    />
                    <DeliveryOptionItem
                      image={
                        'https://gfx.r-gol.com/media/res/deliveries/1/DPD_PNG_1000.jpg'
                      }
                      handleClick={() =>
                        setBasketValue((prev) => ({
                          ...prev,
                          deliveryMetod: 'Kurier DPD',
                        }))
                      }
                      name={'Kurier DPD'}
                      price={11.99}
                      value={basketValue.deliveryMetod}
                      delivery={'1-2'}
                    />
                    <DeliveryOptionItem
                      image={
                        'https://gfx.r-gol.com/media/res/deliveries/3/delivery.jpg'
                      }
                      handleClick={() =>
                        setBasketValue((prev) => ({
                          ...prev,
                          deliveryMetod: 'Odbiór osobisty w sklepie',
                        }))
                      }
                      name={'Odbiór osobisty w sklepie'}
                      price={0}
                      value={basketValue.deliveryMetod}
                      delivery={'1-2'}
                    />
                    <DeliveryOptionItem
                      image={
                        'https://gfx.r-gol.com/media/res/deliveries/65/dpdpickuplogo (1).jpg'
                      }
                      handleClick={() =>
                        setBasketValue((prev) => ({
                          ...prev,
                          deliveryMetod: 'DPD Pickup',
                        }))
                      }
                      name={'DPD Pickup'}
                      price={9.99}
                      value={basketValue.deliveryMetod}
                      delivery={'1-2'}
                    />
                  </SubmitList>
                </SubmitWrap>
                {basketValue.deliveryMetod !== '' && (
                  <SubmitWrap>
                    <label>WYBIERZ METODĘ PŁATNOŚCI</label>
                    <SubmitList>
                      <PaymentOptionItem
                        image={
                          'https://gfx.r-gol.com/media/res/payments/17/1500.jpg'
                        }
                        name={'Płatność kartą'}
                        price={1}
                        valueName={basketValue.paymentMetod}
                        handleClick={() =>
                          setBasketValue((prev) => ({
                            ...prev,
                            paymentMetod: 'card',
                          }))
                        }
                        value="card"
                      />
                      <PaymentOptionItem
                        image={
                          'https://www.przelewy24.pl/themes/przelewy24/assets/img/base/przelewy24_logo_2022.svg'
                        }
                        name={'Przelewy24'}
                        handleClick={() =>
                          setBasketValue((prev) => ({
                            ...prev,
                            paymentMetod: 'p24',
                          }))
                        }
                        price={1}
                        valueName={basketValue.paymentMetod}
                        value="p24"
                      />
                    </SubmitList>
                  </SubmitWrap>
                )}

                {(basketValue.deliveryMetod === 'DPD Pickup' ||
                  basketValue.deliveryMetod === 'InPost Paczkomaty 24/7') &&
                  basketValue.paymentMetod !== '' && (
                    <MapView
                      mapType={basketValue.deliveryMetod}
                      setBasketValue={setBasketValue}
                      deliveryPlace={basketValue.deliveryPlace}
                      setIsSetInvoke={setIsSetInvoke}
                      setIsAddressFormOpen={setIsAddressFormOpen}
                    />
                  )}
                {(basketValue.deliveryMetod === 'Kurier DPD' ||
                  basketValue.deliveryMetod === 'Odbiór osobisty w sklepie' ||
                  basketValue.deliveryPlace) &&
                  basketValue.paymentMetod !== '' && (
                    <>
                      <Title>PODAJ TWOJE DANE</Title>
                      <AdressWrap>
                        {addressData.length > 0 &&
                          addressData.map((data) => (
                            <ItemContainer key={data.idItem}>
                              <ContentWrap isDefault={!!data.isDefault}>
                                <Content>
                                  <div>
                                    <p>{data.companyName}</p>
                                    <p>{`${data.firstName} ${data.surname}`}</p>
                                    <p>{`${data.street} ${
                                      data.flatNumber !== ''
                                        ? `${data.buldingNumber}/${data.flatNumber}`
                                        : data.buldingNumber
                                    }`}</p>
                                    <p>{`${data.postCode} ${data.city}`}</p>
                                    <p>Polska</p>
                                    <p>{data.phoneNumber}</p>
                                  </div>
                                  <a>Edytuj</a>
                                </Content>
                              </ContentWrap>
                            </ItemContainer>
                          ))}
                        {addressData.length > 0 && (
                          <ItemContainer
                            isPointer
                            onClick={() => setIsAddressFormOpen(true)}
                          >
                            <ContentWrap>
                              <Content>
                                <div
                                  style={{ color: '#000', fontWeight: '500' }}
                                >
                                  Podaj nowy adres...
                                </div>
                              </Content>
                            </ContentWrap>
                          </ItemContainer>
                        )}
                      </AdressWrap>
                    </>
                  )}
                {addressData.length === 0 ||
                  (isAddressFormOpen && (
                    <div ref={addressRef}>
                      <Field
                        type="text"
                        name="firstName"
                        label="Imię"
                        inputType="input"
                        component={CustomField}
                      />
                      <Field
                        type="text"
                        name="surname"
                        label="Nazwisko"
                        inputType="input"
                        component={CustomField}
                      />
                      <Field
                        type="text"
                        name="companyName"
                        label="Firma"
                        inputType="input"
                        component={CustomField}
                      />
                      <Field
                        type="text"
                        name="street"
                        label="Ulica"
                        inputType="input"
                        component={CustomField}
                      />
                      <Field
                        type="text"
                        name="buldingNumber"
                        label="Numer Budynku"
                        inputType="input"
                        component={CustomField}
                      />
                      <Field
                        type="text"
                        name="flatNumber"
                        label="Numer Lokalu"
                        inputType="input"
                        component={CustomField}
                      />
                      <Field
                        type="text"
                        name="city"
                        label="Miasto"
                        inputType="input"
                        component={CustomField}
                      />
                      <Field
                        type="text"
                        name="postCode"
                        label="Kod Pocztowy"
                        inputType="input"
                        component={CustomField}
                      />
                      <Field
                        type="text"
                        name="phoneNumber"
                        label="Telefon"
                        inputType="input"
                        component={CustomField}
                      />
                      <Field
                        name="phoneNumber"
                        label="Zapisz jako nowy adres dostawy"
                        component={CustomChecbox}
                      />
                    </div>
                  ))}
                {(basketValue.deliveryMetod === 'Kurier DPD' ||
                  basketValue.deliveryMetod === 'Odbiór osobisty w sklepie' ||
                  basketValue.deliveryPlace) &&
                  basketValue.paymentMetod !== '' && (
                    <>
                      <Title>FAKTURA VAT</Title>
                      <Checkbox>
                        <div>
                          <input
                            type="checkbox"
                            id="delivery"
                            onChange={() => setIsSetInvoke((prev) => !prev)}
                          />
                          <label htmlFor="delivery">
                            <p>Chcę otrzymać fakturę VAT</p>
                          </label>
                        </div>
                      </Checkbox>
                      {isSetInvoke && invokeData.lenght === 0 && (
                        <>
                          <Field
                            type="text"
                            name="companyName"
                            label="Nazwa Płatnika"
                            inputType="input"
                            component={CustomField}
                          />
                          <Field
                            type="text"
                            name="NIP"
                            label="Nip"
                            inputType="input"
                            component={CustomField}
                          />
                          <Field
                            type="text"
                            name="street"
                            label="Ulica"
                            inputType="input"
                            component={CustomField}
                          />
                          <Field
                            type="text"
                            name="buldingNumber"
                            label="Numer Budynku"
                            inputType="input"
                            component={CustomField}
                          />
                          <Field
                            type="text"
                            name="flatNumber"
                            label="Numer Lokalu"
                            inputType="input"
                            component={CustomField}
                          />
                          <Field
                            type="text"
                            name="city"
                            label="Miasto"
                            inputType="input"
                            component={CustomField}
                          />
                          <Field
                            type="text"
                            name="postCode"
                            label="Kod Pocztowy"
                            inputType="input"
                            component={CustomField}
                          />
                        </>
                      )}
                    </>
                  )}
              </LeftSection>
              <RightSection>
                <Title>LISTA ZAKUPÓW</Title>
                <ProductList>
                  <div>
                    <BasketItem
                      image={
                        'https://gfx.r-gol.com/media/res/products/68/149068/100x130/2080697450544_1.jpg'
                      }
                      name={'Książka "Kowal. Prawdziwa historia" z autografem'}
                      price={89.9}
                      code={'2080697450544'}
                    />
                  </div>
                </ProductList>
                <SummaryWrap>
                  <SummaryConteiner>
                    <h2>Podsumowanie</h2>
                    <PriceConteiner>
                      <ul>
                        <li>
                          <label>Produkty (suma):</label> <span>89,90 zł</span>
                        </li>
                        <li>
                          <label>Wysyłka:</label>

                          <span>11,99 zł</span>
                        </li>
                        <li>
                          <strong>Do zapłaty:</strong>
                          <strong>
                            <span>101,89 zł</span>
                          </strong>
                        </li>
                      </ul>
                    </PriceConteiner>
                    <FinalForm>
                      <Field
                        type="password"
                        name="message"
                        label="Uwagi do zamówienia"
                        inputType="textArea"
                        component={CustomField}
                        maxLength={128}
                      />
                      <Field
                        type="password"
                        name="confirmChec"
                        label="*Akceptuję Regulamin (link) oraz Politykę prywatności (link) R-GOL.com."
                        inputType="checkbox"
                        component={CustomChecbox}
                      />

                      <ButtonWrap>
                        <button type="submit" disabled={isSubmitting}>
                          Kupuje i płacę
                        </button>
                      </ButtonWrap>
                    </FinalForm>
                  </SummaryConteiner>
                </SummaryWrap>
              </RightSection>
            </Wrapper>
          </Form>
        )}
      </Formik>
    </BasketPageWrap>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session || session.error === 'RefreshAccessTokenError') {
    return {
      props: {
        session: await getSession(context),
        addressData: [],
        invokeData: [],
      },
    };
  }
  await dbConnect();
  const products = await User.findOne({
    email: session!.user!.email,
  });
  const addressData: {
    idItem: string;
    firstName: string;
    surname: string;
    companyName: string;
    street: string;
    buldingNumber: string;
    flatNumber: string;
    city: string;
    postCode: string;
    phoneNumber: string;
    isDefault: boolean;
  }[] = [];

  if (products && products?.adress?.length !== 0) {
    products.adress.map((prod) => addressData.push(prod));
  }
  const invokeData: {
    idItem: string;
    NIP: string;
    companyName: string;
    street: string;
    buldingNumber: string;
    flatNumber: string;
    city: string;
    postCode: string;
    phoneNumber: string;
    isDefault: boolean;
  }[] = [];
  if (products && products?.invoke?.length !== 0) {
    products.invoke.map((prod) => invokeData.push(prod));
  }
  console.log(invokeData);

  return {
    props: {
      session: await getSession(context),
      addressData: JSON.parse(JSON.stringify(addressData)),
      invokeData: JSON.parse(JSON.stringify(invokeData)),
    },
  };
};
export default Delivery;
