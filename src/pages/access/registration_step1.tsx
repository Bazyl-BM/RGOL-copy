import axios from 'axios';
import type { FormikHelpers } from 'formik';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { CustomChecbox } from '@/components/Formik/Checbox';
import { CustomField } from '@/components/Formik/FIeld';

export const Wrapper = styled.div`
  padding: 1.6rem 4.8rem;

  @media (min-width: 768px) {
    margin: 4.8rem auto;
  }
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
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
`;
export const Cointeiner = styled.div`
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  flex: 0 0 100%;
  max-width: 100%;
  margin: auto;
  @media (min-width: 768px) {
    flex: 0 0 50%;
    max-width: 50%;
  }
  @media (min-width: 576px) and (max-width: 768px) {
    flex: 0 0 83.33333%;
    max-width: 83.33333%;
  }
`;
export const Title = styled.h3`
  margin-bottom: 2.4rem;
  text-align: center;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  font-size: 2rem;
  text-align: center;
`;
export const ButtonWrap = styled.div`
  text-align: right;
  button {
    background-color: #86c042;
    border: 2px solid #86c042;
    color: #fff;
    font-family: Oswald, Fira Sans Extra Condensed, sans-serif;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: color 0.15s ease-in-out, background 0.15s ease-in-out,
      border 0.15s ease-in-out;
    cursor: pointer;
    padding: 0.8rem 4.8rem;
    font-size: 1.4rem;
    line-height: 1.5;
    border-radius: 0;
    :hover {
      background-color: #79ae3a;
      border-color: #79ae3a;
      color: #fff;
    }
  }
`;

interface Values {
  email: string;

  AcceptRegulamin: boolean;
}

const SignupSchema = Yup.object().shape({
  email: Yup.string().required('Pole Imię jest wymagane'),
  AcceptRegulamin: Yup.bool().oneOf([true], 'Musisz zaakceptować regulamin'),
});

const Registration = () => {
  return (
    <Wrapper>
      <Row>
        <Cointeiner>
          <Title>ZAREJESTRUJ SIĘ</Title>
          <Formik
            initialValues={{
              email: '',
              AcceptRegulamin: false,
            }}
            validationSchema={SignupSchema}
            onSubmit={(
              values: Values,
              { setSubmitting }: FormikHelpers<Values>
            ) => {
              setSubmitting(true);
              axios({
                method: 'post',
                url: 'http://localhost:3000/api/register/register_step1',
                data: { email: values.email },
              }).then(() => {
                setSubmitting(false);
              });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  type="email"
                  name="email"
                  label="E-mail"
                  inputType="input"
                  component={CustomField}
                />

                <Field
                  name="AcceptRegulamin"
                  type="checkbox"
                  label="*Akceptuję Regulamin (link) oraz Politykę prywatności (link) R-GOL.com."
                  component={CustomChecbox}
                />

                <ButtonWrap>
                  <button type="submit" disabled={isSubmitting}>
                    Zapisz
                  </button>
                </ButtonWrap>
              </Form>
            )}
          </Formik>
        </Cointeiner>
      </Row>
    </Wrapper>
  );
};
export default Registration;
