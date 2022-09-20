import type { FormikHelpers } from 'formik';
import { Field, Form, Formik } from 'formik';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getSession, signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import type { Id } from 'react-toastify';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import * as Yup from 'yup';

import { CustomField } from '@/components/Formik/FIeld';
import Modal2, {
  ModalBodyWrapper,
  ModalFooter,
  ModalHeader,
} from '@/components/Modal/Modal2';
import dbConnect from '@/utils/dbConnect';

import Conversation from '../../../models/ConversationModel';
import User from '../../../models/UserModel';
import { Table, Thead, Tr } from '../orders';

const NoItemText = styled.div`
  text-align: center;
  padding: 1.6rem 0;
`;
const ButtonWrapper = styled.div`
  text-align: right;
  margin-bottom: 2.4rem;
  button {
    cursor: pointer;
    color: #86c042;
    background-image: none;
    background-color: transparent;
    font-family: Oswald, Fira Sans Extra Condensed, sans-serif;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: color 0.15s ease-in-out, background 0.15s ease-in-out,
      border 0.15s ease-in-out;
    border: 2px solid #86c042;
    padding: 0.8rem 4.8rem;
    font-size: 1.4rem;
    line-height: 1.5;
    border-radius: 0;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    display: inline-block;
    :hover {
      color: #fff;
      background-color: #86c042;
      border-color: #86c042;
    }
  }
`;

const Returns = ({ data }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  interface Values {
    subject: string;
    text: string;
    email: string;
  }
  const SignupSchema = Yup.object().shape({
    subject: Yup.string().required('Pole Temat Zgłoszenia jest wymagane'),
    text: Yup.string().required('Pole Treść Zgłoszenia jest wymagane'),
  });
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session || session.error === 'RefreshAccessTokenError') {
      signOut();
      router.push('/access/login');
    }
  }, [session, status]);
  const toastId = React.useRef<Id>();
  console.log(data);
  function GetFormattedDate(date) {
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const year = date.getFullYear();
    const hour = `0${date.getHours()}`.slice(-2);
    const min = `0${date.getMinutes()}`.slice(-2);
    const seg = `0${date.getSeconds()}`.slice(-2);
    return `${year}-${month}-${day} ${hour}:${min}:${seg}`;
  }
  return (
    <>
      <ButtonWrapper>
        <button onClick={() => setModalIsOpen(true)}>Dodaj zgłoszenie</button>
      </ButtonWrapper>
      {/* <NoItemText>Brak zgłoszeń</NoItemText> */}
      <div>
        <Table>
          <Thead>
            <tr>
              <th>#</th> <th>Temat zgłoszenia</th>
              <th>Data zgłoszenia </th> <th>Status zgłoszenia</th>
            </tr>
          </Thead>
          <tbody>
            {data.map(({ roomId, subject, status, createDate }) => (
              <Tr
                key={roomId}
                onClick={() => router.push(`bok/conversation/${roomId}`)}
              >
                <td>{roomId}</td>
                <td>{subject}</td>
                <td>{GetFormattedDate(new Date(createDate))}</td>
                <td>{status}</td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal2 modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
        <ModalHeader>
          <h5>EDYCJA ADRESÓW</h5>
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
            initialValues={{
              subject: '',
              text: '',
              email: session!.user!.email as string,
            }}
            validationSchema={SignupSchema}
            onSubmit={(
              values: Values,
              { setSubmitting, resetForm }: FormikHelpers<Values>
            ) => {
              fetch('/api/myAccount/bok', {
                method: 'POST',
                body: JSON.stringify({
                  ...values,
                } as BodyInit & Values),
              })
                .then((response) => {
                  if (response.ok) {
                    toastId.current = toast.success(
                      'Wiadomość została wysłana',
                      {
                        position: 'top-center',
                        hideProgressBar: true,
                      }
                    );
                  }
                })
                .catch((e) => console.error(e))
                .finally(() => {
                  setModalIsOpen(false);
                  setSubmitting(false);
                  resetForm();
                });
            }}
          >
            {({ isSubmitting, errors }) => (
              <Form>
                <Field
                  type="text"
                  name="subject"
                  label="Temat Zgłoszenia"
                  component={CustomField}
                  notFocus
                  inputType="input"
                />
                <Field
                  type="text"
                  name="text"
                  label="Treść zgłoszenia"
                  component={CustomField}
                  notFocus
                  inputType="textArea"
                  maxLength={2048}
                />
                <Field
                  type="text"
                  name="email"
                  label="Adres E-mail"
                  component={CustomField}
                  disabled
                  inputType="input"
                />

                <ModalFooter>
                  <button onClick={() => setModalIsOpen(false)}>Anuluj</button>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    onClick={() => {
                      if (!errors) setModalIsOpen(false);
                    }}
                  >
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
  if (!session || session.error === 'RefreshAccessTokenError') {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  await dbConnect();
  const user = await User.findOne({
    email: session!.user!.email,
  });
  const roomId = [];

  if (user && user?.myConversation?.length !== 0) {
    user.myConversation.map((id) => roomId.push(id));
  }
  const data = await Conversation.find({ _id: { $in: roomId } });
  return {
    props: {
      session: await getSession(context),
      data: JSON.parse(JSON.stringify(data)),
    },
  };
};
export default Returns;
