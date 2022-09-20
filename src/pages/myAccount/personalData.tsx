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

import { CustomChecbox } from '@/components/Formik/Checbox';
import { CustomField } from '@/components/Formik/FIeld';
import dbConnect from '@/utils/dbConnect';

import User from '../../models/UserModel';

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
  email: string;
  firstName: string;
  lastName: string;
  telefonNumber: string;

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
});
const PersonalData = ({ res }) => {
  const {
    email,
    firstName,
    lastName,
    telefonNumber,
    JoinClub,
    AcceptSendEmail,
  } = res;
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session || session.error === 'RefreshAccessTokenError') {
      signOut();
      router.push('/access/login');
    }
  }, [session, status]);
  const toastId = React.useRef<Id>();
  let count = 0;
  return (
    <>
      <h2>Moje dane</h2>
      <Formik
        initialValues={{
          email,
          firstName,
          lastName,
          telefonNumber,
          JoinClub,
          AcceptSendEmail,
        }}
        validationSchema={SignupSchema}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          fetch('/api/myAccount/personalData', {
            method: 'POST',
            body: JSON.stringify(values as BodyInit & Values),
          })
            .then((response) => {
              count++;
              if (!toast.isActive(toastId.current)) {
                toastId.current = toast.success(
                  'Dane klienta zostały zaktualizowane',
                  {
                    position: 'top-center',
                    hideProgressBar: true,
                  }
                );
              }

              toast.update(toastId.current, {
                render: `Dane klienta zostały zaktualizowane ${
                  count === 1 ? '' : `(${count})`
                }`,
              });
            })
            .catch(console.error)
            .finally(() => setSubmitting(false));
        }}
      >
        {({ isSubmitting }) => (
          <Form>
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
              type="email"
              name="email"
              label="E-mail"
              inputType="input"
              component={CustomField}
              disabled
            />
            <Field
              type="text"
              name="telefonNumber"
              label="Telefon"
              inputType="input"
              component={CustomField}
            />

            <Field
              name="AcceptSendEmail"
              type="checkbox"
              label="Wyrażam zgodę na otrzymywanie od R-GOL Sp. z o.o. Sp. K. z siedzibą w Ostródzie, Górka 3D (14-100) informacji handlowych o produktach i usługach tej Spółki przesyłanych drogą elektroniczną w formie Newslettera na podany przeze mnie adres e-mail. Przyjmuję do wiadomości, że moja zgoda może zostać w każdej chwili wycofana."
              component={CustomChecbox}
            />
            <Field
              name="JoinClub"
              type="checkbox"
              label="Akceptuję regulamin i chcę przystąpić do programu R-TEAM"
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
  await dbConnect();
  const sessionData = await User.findOne({
    email: session!.user!.email,
  });
  if (!sessionData) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  const UserData = {
    email: sessionData.email,
    firstName: sessionData.firstName,
    lastName: sessionData.lastName,
    JoinClub: sessionData.JoinClub,
    AcceptSendEmail: sessionData.AcceptSendEmail,
    telefonNumber: sessionData.telefonNumber,
  };

  return {
    props: {
      res: UserData,
    },
  };
};
export default PersonalData;
