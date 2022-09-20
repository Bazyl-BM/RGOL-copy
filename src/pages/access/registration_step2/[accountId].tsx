import axios from 'axios';
import type { FormikHelpers } from 'formik';
import { Field, Form, Formik } from 'formik';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { CustomChecbox } from '@/components/Formik/Checbox';
import { CustomField } from '@/components/Formik/FIeld';
import dbConnect from '@/utils/dbConnect';

import User from '../../../models/UserModel';

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
  firstName: string;
  lastName: string;
  telefonNumber: string;
  password: string;
  passwordConfirmation: string;
  AcceptSendEmail: boolean;
  JoinClub: boolean;
}

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('Pole Imię jest wymagane'),
  lastName: Yup.string().required('Pole Nazwisko jest wymagane'),
  telefonNumber: Yup.string()
    .required('Pole Telefon jest wymagane')
    .min(9, 'Numer powinien zawierać 9 cyfr.')
    .max(9, 'Numer powinien zawierać 9 cyfr.'),
  password: Yup.string()
    .required('Pole Hasło jest wymagane')
    .min(6, 'Hasło powinno zawierać minimum 6 znaków.'),
  passwordConfirmation: Yup.string()
    .required('Pole Potwierdzenie hasła jest wymagane')
    .oneOf(
      [Yup.ref('password'), null],
      'Pole Potwierdzenie hasła ma inną wartość niż pole Hasło.'
    ),
});

interface Props {
  initalEmail: string;
}
const Registration: FC<Props> = ({ initalEmail }) => {
  const router = useRouter();
  return (
    <Wrapper>
      <Row>
        <Cointeiner>
          <Title>Dane osobowe</Title>
          <Formik
            initialValues={{
              email: initalEmail,
              firstName: '',
              lastName: '',
              telefonNumber: '',
              password: '',
              passwordConfirmation: '',
              AcceptSendEmail: false,
              JoinClub: false,
            }}
            validationSchema={SignupSchema}
            onSubmit={(
              values: Values,
              { setStatus, setSubmitting }: FormikHelpers<Values>
            ) => {
              setSubmitting(false); // this line should be in the commented success of the axios call
              setStatus('sent'); // this line should be in the commented success of the axios call
              axios({
                method: 'post',
                url: 'http://localhost:3000/api/register/register_step2',
                data: values,
              }).then(() => {
                setSubmitting(false);
                router.push('/');
              });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  type="email"
                  name="email"
                  inputType="input"
                  label="E-mail"
                  component={CustomField}
                  disabled
                />
                <Field
                  type="text"
                  name="firstName"
                  label="Imię"
                  inputType="input"
                  component={CustomField}
                />
                <Field
                  type="text"
                  name="lastName"
                  label="Nazwisko"
                  inputType="input"
                  component={CustomField}
                />
                <Field
                  type="text"
                  name="telefonNumber"
                  label="Telefon"
                  inputType="input"
                  component={CustomField}
                />
                <Field
                  type="text"
                  name="password"
                  label="Hasło"
                  inputType="input"
                  component={CustomField}
                />
                <Field
                  type="text"
                  name="passwordConfirmation"
                  label="Potwierdzenie Hasła"
                  inputType="input"
                  component={CustomField}
                />
                <Field
                  name="AcceptSendEmail"
                  type="checkbox"
                  label=" Chcę otrzymywać informację handlową o ofercie sklepu R-GOL.com na podany adres e-mail."
                  component={CustomChecbox}
                />
                <Field
                  name="JoinClub"
                  type="checkbox"
                  label="Chcę przystąpić do Programu Lojalnościowego R-TEAM"
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
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const id = query?.accountId;
  await dbConnect();
  const user = await User.findOne({
    _id: id,
  });
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  return {
    props: {
      initalEmail: user.email,
    },
  };
};
export default Registration;
