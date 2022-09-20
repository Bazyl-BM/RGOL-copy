import { deleteCookie } from 'cookies-next';
import type { FormikHelpers } from 'formik';
import { Field, Form, Formik } from 'formik';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getSession, signOut, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import type { Id } from 'react-toastify';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import * as Yup from 'yup';

import { CustomField } from '@/components/Formik/FIeld';

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

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin: 1.6rem -10px;
`;
export const Cointeiner = styled.div`
  padding: 0 1.6rem;
  margin-top: 1.6rem;
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
export const FormWrap = styled.div`
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  flex: 0 0 100%;
  max-width: 100%;
  margin: auto;
  @media (min-width: 768px) {
    flex: 0 0 83.33333%;
    max-width: 83.33333%;
  }
  h2 {
    margin: 2.4rem 0;
    font-size: 2.8rem;
  }
  hr {
    margin-top: 1.6rem;
  }
`;

interface Props {
  isActive: boolean;
}
export const MyAccountListItem = styled.li<Props>`
  border-bottom: 3px solid transparent;
  text-align: center;
  border-color: ${(props) => (props.isActive ? '#86c042' : '')};
  a {
    display: block;
    padding: 0.8rem 1.6rem;
    color: #000;
    border-bottom: 0 !important;
  }
`;
interface Values {
  password: string;
  newPassword: string;
  passwordConfirmation: string;
  email?: string;
}
const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .required('Pole Hasło jest wymagane')
    .min(6, 'Hasło powinno zawierać minimum 6 znaków.'),
  newPassword: Yup.string()
    .required('Pole Hasło jest wymagane')
    .min(6, 'Hasło powinno zawierać minimum 6 znaków.'),
  passwordConfirmation: Yup.string()
    .required('Pole Potwierdzenie hasła jest wymagane')
    .oneOf(
      [Yup.ref('newPassword'), null],
      'Pole Potwierdzenie hasła ma inną wartość niż pole Hasło.'
    ),
});
const PasswordChange = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session || session.error === 'RefreshAccessTokenError') {
      signOut();
      router.push('/access/login');
    }
  }, [session, status]);
  const toastId = React.useRef<Id>();

  return (
    <>
      <Formik
        initialValues={{
          password: '',
          newPassword: '',
          passwordConfirmation: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(
          values: Values,
          { setSubmitting, resetForm }: FormikHelpers<Values>
        ) => {
          fetch('/api/myAccount/passwordChange', {
            method: 'POST',
            body: JSON.stringify({
              ...values,
              email: session!.user!.email,
            } as BodyInit & Values),
          })
            .then((response) => {
              console.log(response);
              if (response.ok) {
                toastId.current = toast.success(
                  'Dane klienta zostały zaktualizowane',
                  {
                    position: 'top-center',
                    hideProgressBar: true,
                  }
                );
              }
            })
            .catch((e) => console.error(e))
            .finally(() => {
              setSubmitting(false);
              resetForm();
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              type="password"
              name="password"
              label="Hasło"
              inputType="input"
              component={CustomField}
            />
            <Field
              type="password"
              name="newPassword"
              label="nowe Hasło"
              inputType="input"
              component={CustomField}
            />
            <Field
              type="password"
              name="passwordConfirmation"
              label="Potwierdź nowe Hasło"
              inputType="input"
              component={CustomField}
            />

            <ButtonWrap>
              <button type="submit" disabled={isSubmitting}>
                Zapisz
              </button>
            </ButtonWrap>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  const { req, res } = context;
  if (!session || session.error === 'RefreshAccessTokenError') {
    deleteCookie('next-auth.session-token', { req, res });
    deleteCookie('next-auth.csrf-token', { req, res });
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  return {
    props: {
      session: await getSession(context),
    },
  };
};
export default PasswordChange;
