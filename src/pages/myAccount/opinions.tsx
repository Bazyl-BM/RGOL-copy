import { deleteCookie } from 'cookies-next';
import type { FormikHelpers } from 'formik';
import { Field, Form, Formik } from 'formik';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getSession, signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { CustomField } from '@/components/Formik/FIeld';
import Modal2, {
  ModalBodyWrapper,
  ModalFooter,
  ModalHeader,
} from '@/components/Modal/Modal2';

const Title = styled.div`
  justify-content: center;
  display: flex;
  margin: 2.4rem 0;
  h3 {
    text-align: center;
    font-size: 2rem;
  }
`;
const RowOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
`;
const ItemWrap = styled.div`
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  flex: 0 0 100%;
  max-width: 100%;
  margin: 0.8rem 0;
  @media (min-width: 992px) {
    flex: 0 0 50%;
    max-width: 50%;
  }
`;
const Border = styled.div`
  border: 1px solid #e0e0e0;
  display: flex;
  height: 100%;
  padding: 1.6rem;
`;
const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: none;
  padding-bottom: 0;
  margin-bottom: 0;
`;
const Item = styled.div`
  align-items: flex-start;
  flex-wrap: nowrap;
  display: flex;
  width: 100%;
`;
const Photo = styled.div`
  margin-right: 1.6rem;
  background-color: #fafafa;
  width: 80px;
  img {
    width: 100%;
  }
`;
const Content = styled.div`
  flex-grow: 1;
  strong {
    font-weight: 500;
    display: inline-block;
    a {
      color: #000;
      border-bottom: 0;
      line-height: 16px;
      word-break: break-word;
      margin-bottom: 0.4rem;
      display: inline-block;
    }
  }
  div {
    button {
      max-width: 300px;
      cursor: pointer;
      background-color: #86c042;
      border: 2px solid #86c042;
      color: #fff;
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
      width: 100%;
      margin-top: 4.8rem;

      @media (min-width: 576px) {
        padding-left: 4.8rem !important;
        padding-right: 4.8rem !important;
      }
    }
  }
`;

const Returns = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  interface Values {
    rating: number;
    name: string;
    text: string;
  }
  const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Pole Imię jest wymagane'),
    text: Yup.string().required('Pole Treść jest wymagane'),
  });
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session || session.error === 'RefreshAccessTokenError') {
      signOut();
      router.push('/access/login');
    }
  }, [session, status]);

  return (
    <>
      <Title>
        <h3>Opinie zamówionych przez ciebie produktów</h3>
      </Title>
      <RowOptions>
        <ItemWrap onClick={() => setModalIsOpen(true)}>
          <Border>
            <ItemContainer>
              <Item>
                <Photo>
                  <a>
                    <img src="https://gfx.r-gol.com/media/res/products/113/124113/100x130/koszulka-adidas-estro-19_1.png" />
                  </a>
                </Photo>
                <Content>
                  <strong>
                    <a>Koszulka adidas Estro 19</a>
                  </strong>
                  <div>
                    <button>Oceń Produkt</button>
                  </div>
                </Content>
              </Item>
            </ItemContainer>
          </Border>
        </ItemWrap>
      </RowOptions>
      <Modal2 modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
        <ModalHeader>
          <h5>Oceń Produkt</h5>
          <button
            type="button"
            aria-label="Close"
            onClick={() => setModalIsOpen(false)}
          >
            ×
          </button>
        </ModalHeader>
        <ModalBodyWrapper>
          <Formik
            initialValues={{ rating: 0, name: '', text: '' }}
            validationSchema={SignupSchema}
            onSubmit={(
              values: Values,
              { setSubmitting }: FormikHelpers<Values>
            ) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));

                setSubmitting(false);
              }, 500);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="rating"
                  label="Ocena"
                  component={CustomField}
                  notFocus
                  inputType="rating"
                />
                <Field
                  type="text"
                  name="name"
                  label="Imię lub Nick"
                  component={CustomField}
                  inputType="input"
                />
                <Field
                  type="text"
                  name="text"
                  label="Treść"
                  component={CustomField}
                  notFocus
                  inputType="textArea"
                  maxLength="1024"
                />

                <ModalFooter>
                  <button onClick={() => setModalIsOpen(false)}>Anuluj</button>
                  <button disabled={isSubmitting} type="submit">
                    Zapisz
                  </button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBodyWrapper>
      </Modal2>
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

export default Returns;
