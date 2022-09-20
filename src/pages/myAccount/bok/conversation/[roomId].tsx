import { Field, Form, Formik } from 'formik';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getSession, signOut, useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';

import {
  FormField,
  FormFieldLabel,
} from '@/components/AccordianProduct/AskForm';
import { CustomField } from '@/components/Formik/FIeld';
import dbConnect from '@/utils/dbConnect';

import ConversationM from '../../../../models/ConversationModel';
import User from '../../../../models/UserModel';
import { ButtonWrap } from '../../passwordChange';

const Header = styled.div`
  justify-content: space-between;
  display: flex;
  margin-bottom: 2.4rem;
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
const MessengeWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border-radius: 0.4rem;
  border: 1px solid #c4c4c4;
  width: 75%;
  margin-bottom: 2.4rem;
  img {
    max-width: 100%;
    height: auto;
    padding: 0.4rem;
    background-color: #fff;
    border: 1px solid #c4c4c4;
    border-radius: 0.4rem;
  }
`;
const MessengeBody = styled.div`
  flex: 1 1 auto;
  min-height: 1px;
  padding: 2rem;
`;
const MessengeHeader = styled.div`
  padding: 1.2rem 2rem;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 0 solid rgba(0, 0, 0, 0.125);
`;
const MessengeForm = styled.div`
  border: 1px solid #c4c4c4;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;

  border-radius: 0.4rem;
  form {
    flex: 1 1 auto;
    min-height: 1px;
    padding: 2rem;
    padding-bottom: 0;
  }
`;
let socket;
const Conversation = ({ data, userName }) => {
  const router = useRouter();
  const isLoaded = useRef<boolean>(false);
  const [messages, setMessages] = useState<Array<any>>([]);
  const [pmessages, setpMessages] = useState<Array<any>>();
  function GetFormattedDate(date) {
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const year = date.getFullYear();
    const hour = `0${date.getHours()}`.slice(-2);
    const min = `0${date.getMinutes()}`.slice(-2);
    const seg = `0${date.getSeconds()}`.slice(-2);
    return `${year}-${month}-${day} ${hour}:${min}:${seg}`;
  }

  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session || session.error === 'RefreshAccessTokenError') {
      signOut();
      router.push('/access/login');
    }
  }, [session, status]);
  socket = io();
  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await fetch('/api/myAccount/socket', {
      method: 'POST',
      body: data.data._id,
    });

    socket.on('connect', function () {
      socket.emit('room', data.data._id);
    });
    socket.on('newIncomingMessage', (msg) => {
      setpMessages(msg);
    });
  };

  useEffect(() => {
    socketInitializer();

    setMessages(data.data.message);
    return () => socket.emit('leave', data.data._id);
  }, []);
  useEffect(() => {
    if (!messages.some((message) => message.id === pmessages.id) && pmessages) {
      setMessages((prev) => [...prev, pmessages]);
    }
  }, [pmessages]);

  return (
    <>
      <Header>
        <h3>Zapytanie o produkt</h3>
        <ButtonWrapper>
          <button onClick={() => router.back()}>Lista zgłoszeń</button>
        </ButtonWrapper>
      </Header>
      {messages.map((item) => (
        <MessengeWrap key={item.Date}>
          <MessengeBody>
            {item.imagesLinks !== undefined && (
              <a href={item.imagesLinks[0].url}>
                <img src={item.imagesLinks[0].url} />
              </a>
            )}
            {item.comment}
          </MessengeBody>
          <MessengeHeader>
            {userName}, {GetFormattedDate(new Date(item.Date))}
          </MessengeHeader>
        </MessengeWrap>
      ))}

      <MessengeForm>
        <MessengeHeader>Odpowiedź</MessengeHeader>
        <Formik
          initialValues={{
            message: '',
            images: '',
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            // console.log(values);
            // axios({
            //   method: 'post',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   url: 'http://localhost:3000/api/myAccount/conversation',
            //   params: { email: session!.user!.email },
            //   data: { ...values },
            // })
            //   .then(() => {
            //     setSubmitting(false);
            //   })
            //   .finally(() => {
            //     resetForm();
            //   });

            socket.emit('createdMessage', {
              ...values,
              email: session!.user!.email,
              roomId: router.query.roomId,
              id: data.data._id,
            });
            resetForm();
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <Field
                type="text"
                name="message"
                label="Treść wiadomości"
                maxLength={2048}
                inputType="textArea"
                component={CustomField}
              />

              {/* <Field
                name="images"
                label="Załącznik"
                maxLength={2048}
                type="file"
                inputType="fileInput"
                component={CustomField}
              /> */}
              <FormField>
                <div style={{ marginTop: '10px' }}>
                  <input
                    name="images"
                    type="file"
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      files.forEach((file) => {
                        const reader = new FileReader();

                        reader.onload = () => {
                          if (reader.readyState === 2) {
                            setFieldValue('images', reader.result);
                          }
                        };

                        reader.readAsDataURL(file);
                      });
                    }}
                  />
                </div>
                <FormFieldLabel>
                  <span>*</span>
                  Załącznik
                </FormFieldLabel>
              </FormField>

              <ButtonWrap>
                <button type="submit" disabled={isSubmitting}>
                  Zapisz
                </button>
              </ButtonWrap>
            </Form>
          )}
        </Formik>
      </MessengeForm>
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
  const { query } = context;
  console.log(context);
  const data = await ConversationM.findOne({
    _id: { $in: roomId },
    roomId: query.roomId,
  });
  console.log(data);
  return {
    props: {
      session: await getSession(context),
      data: JSON.parse(
        JSON.stringify({
          data,
        })
      ),
      userName: `${user.firstName} ${user.lastName}`,
    },
  };
};
export default Conversation;
