import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteCookie } from 'cookies-next';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getSession, signOut, useSession } from 'next-auth/react';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';

import AddAddressForm from '@/components/addressForm/addAddress';
import RemoveAddressForm from '@/components/addressForm/delete';
import AddInvokeForm from '@/components/invokeForm/addInvokeForm';
import RemoveInvokeForm from '@/components/invokeForm/removeInvokeForm';
import Modal2 from '@/components/Modal/Modal2';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getAllAddress } from '@/redux/Slice/addressSlide';
import { getAllInvoke } from '@/redux/Slice/invokeSlide';
import dbConnect from '@/utils/dbConnect';

import User from '../../models/UserModel';

const AdressDiv = styled.div`
  margin-top: 2.4rem;
  h2 {
    margin-bottom: 1.6rem;
  }
`;
const InvokeDiv = styled.div`
  margin-top: 2.4rem;
  h2 {
    margin-bottom: 1.6rem;
  }
`;
export const AdressWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
  margin-bottom: 4.8rem;
  @media (min-width: 992px) {
    justify-content: flex-start;
  }
`;
interface ItemContainerProps {
  isPointer?: boolean;
}
const ItemContainer = styled.div<ItemContainerProps>`
  cursor: ${(props) => (props.isPointer ? 'pointer' : '')};
  padding-bottom: 2.4rem;
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  flex: 0 0 100%;
  height: auto;
  min-height: 200px;
  max-width: 100%;
  @media (min-width: 1200px) {
    flex: 0 0 25%;
    max-width: 25%;
  }
  @media (min-width: 992px) and (max-width: 1200px) {
    flex: 0 0 33.33333%;
    max-width: 33.33333%;
  }
  @media (min-width: 576px) and (max-width: 992px) {
    flex: 0 0 50%;
    max-width: 50%;
  }
`;
const RightContent = styled.div`
  border: 1px solid #c4c4c4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100% !important;
  :hover {
    box-shadow: inset 0 0 0 3px #86c042;
  }
  svg {
    margin: 20px;

    font-size: 30px;
  }
  p {
    text-align: center;
  }
`;
interface Props {
  isDefault: boolean;
}
const ContentWrap = styled.div<Props>`
  border: ${(props) =>
    props.isDefault ? '3px solid #86c042;' : '1px solid #c4c4c4'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100% !important;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
  div {
    p {
      margin-bottom: 0;
      :first-of-type {
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
`;
const Returns = ({ addressData, invokeData }) => {
  const [modalAdressData, setModalAdressData] = useState({
    isOpen: false,
    initalValue: {},
    idItem: '',
  });
  const [modalInvokeData, setModalInvokeData] = useState({
    isOpen: false,
    initalValue: {},
    idItem: '',
  });

  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session || session.error === 'RefreshAccessTokenError') {
      signOut();
      router.push('/access/login');
    }
  }, [session, status]);

  const dispatch = useAppDispatch();
  const add = useAppSelector((state) => state.addressItems);
  const invoke = useAppSelector((state) => state.invokeItems);
  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (add.length === 0 && invoke.length === 0 && firstUpdate.current) {
      dispatch(getAllAddress(addressData));
      dispatch(getAllInvoke(invokeData));

      firstUpdate.current = false;
    }
  });
  console.log(invoke);
  
  return (
    <>
      <AdressDiv>
        <h2>ADRES DO KORESPONDENCJI</h2>
        <AdressWrap>
          {add.length > 0 &&
            add.map((data) => (
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
                    <span>
                      <a
                        onClick={() =>
                          setModalAdressData({
                            isOpen: true,
                            initalValue: data,
                            idItem: '',
                          })
                        }
                      >
                        Edytuj
                      </a>
                      <a
                        onClick={() =>
                          setModalAdressData({
                            isOpen: true,
                            initalValue: {},
                            idItem: data.idItem,
                          })
                        }
                      >
                        Usuń
                      </a>
                    </span>
                  </Content>
                </ContentWrap>
              </ItemContainer>
            ))}

          <ItemContainer
            isPointer
            onClick={() =>
              setModalAdressData((prevState) => ({
                ...prevState,
                isOpen: true,
              }))
            }
          >
            <RightContent>
              <FontAwesomeIcon icon={faCirclePlus as IconProp} />
              <p>Nowy adres do korespondencji</p>
            </RightContent>
          </ItemContainer>
        </AdressWrap>
      </AdressDiv>
      <Modal2
        modalIsOpen={modalAdressData.isOpen}
        setModalIsOpen={setModalAdressData}
      >
        {modalAdressData.idItem === '' && (
          <AddAddressForm
            initalValue={modalAdressData.initalValue}
            setModalIsOpen={setModalAdressData}
          />
        )}
        {modalAdressData.idItem !== '' && (
          <RemoveAddressForm
            idItem={modalAdressData.idItem}
            setModalIsOpen={setModalAdressData}
          />
        )}
      </Modal2>
      <InvokeDiv>
        <h2>DANE DO FAKTURY</h2>
        <AdressWrap>
          {invoke.length > 0 &&
            invoke.map((data) => (
              <ItemContainer key={data.idItem}>
                <ContentWrap isDefault={!!data.isDefault}>
                  <Content>
                    <div>
                      <p>{data.companyName}</p>
                      <p>{data.NIP}</p>
                      <p>{`${data.street} ${
                        data.flatNumber !== ''
                          ? `${data.buldingNumber}/${data.flatNumber}`
                          : data.buldingNumber
                      }`}</p>
                      <p>{`${data.postCode} ${data.city}`}</p>
                      <p>Polska</p>
                      <p>{data.email}</p>
                    </div>
                    <span>
                      <a
                        onClick={() =>
                          setModalInvokeData({
                            isOpen: true,
                            initalValue: data,
                            idItem: '',
                          })
                        }
                      >
                        Edytuj
                      </a>
                      <a
                        onClick={() =>
                          setModalInvokeData({
                            isOpen: true,
                            initalValue: {},
                            idItem: data.idItem,
                          })
                        }
                      >
                        Usuń
                      </a>
                    </span>
                  </Content>
                </ContentWrap>
              </ItemContainer>
            ))}
          <ItemContainer
            isPointer
            onClick={() =>
              setModalInvokeData((prevState) => ({
                ...prevState,
                isOpen: true,
              }))
            }
          >
            <RightContent>
              <FontAwesomeIcon icon={faCirclePlus as IconProp} />
              <p>Nowy adres do faktury</p>
            </RightContent>
          </ItemContainer>
        </AdressWrap>
      </InvokeDiv>

      <Modal2
        modalIsOpen={modalInvokeData.isOpen}
        setModalIsOpen={setModalInvokeData}
      >
        {modalInvokeData.idItem === '' && (
          <AddInvokeForm
            initalValue={modalInvokeData.initalValue}
            setModalIsOpen={setModalInvokeData}
          />
        )}
        {modalInvokeData.idItem !== '' && (
          <RemoveInvokeForm
            idItem={modalInvokeData.idItem}
            setModalIsOpen={setModalInvokeData}
          />
        )}
      </Modal2>
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
export default Returns;
