import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteCookie } from 'cookies-next';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getSession, signOut, useSession } from 'next-auth/react';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import AddCupboardsForm from '@/components/cupboardsForm/addCupboardsForm';
import RemoveCupboardsForm from '@/components/cupboardsForm/removeCupboardsForm';
import Modal2 from '@/components/Modal/Modal2';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getAllcupboardsBox } from '@/redux/Slice/cupboardsBox';
import dbConnect from '@/utils/dbConnect';

import User from '../../models/UserModel';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
  margin-bottom: 4.8rem;
  @media (min-width: 992px) {
    justify-content: flex-start;
  }
`;
const ItemWrap = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  padding-right: 10px;
  padding-left: 10px;
  flex: 0 0 100%;
  padding-bottom: 2.4rem;
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
interface Props {
  isDefault: boolean;
}
const ItemContainer = styled.div<Props>`
  border: 1px solid #c4c4c4;
  display: flex;
  height: 100%;
  box-shadow: ${(props) =>
    props.isDefault ? 'inset 0 0 0 3px #86c042' : '1px solid #c4c4c4'};
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
  p {
    span {
      font-weight: 500;
    }
    :last-of-type {
      display: flex;
      margin-bottom: 0;
      padding: 0;
      margin-top: auto;
      a {
        color: #000;
        border-bottom: 0;
        margin-right: 1.6rem;
      }
    }
  }
  a {
    color: #000;
  }
`;
const RightContent = styled.div`
  display: flex;
  align-self: center;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  width: 100%;
  padding: 1.5rem;
  cursor: pointer;
  flex-direction: column;
`;
const RightItemContainer = styled.div`
  border: 1px solid #c4c4c4;
  display: flex;
  height: 100%;
  width: 100% !important;
  :hover {
    box-shadow: inset 0 0 0 3px #86c042;
  }
  svg {
    margin: 20px;
    font-size: 30px;
  }
`;
const Returns = ({ addressData }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();
  const router = useRouter();
  const cupboardItems = useAppSelector((state) => state.cupboardBox);
  console.log(cupboardItems);
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (!session || session.error === 'RefreshAccessTokenError') {
      signOut();
      router.push('/access/login');
    }
  }, [session, status]);
  useLayoutEffect(() => {
    if (cupboardItems.length === 0 && firstUpdate.current) {
      dispatch(getAllcupboardsBox(addressData));
      console.log(addressData);
      firstUpdate.current = false;
    }
  });
  const [modalCupboardsData, setModalCupboardsData] = useState({
    isOpen: false,
    initalValue: {},
    idItem: '',
  });
  console.log(cupboardItems);
  return (
    <Wrapper>
      {cupboardItems.map((item) => (
        <ItemWrap key={item.idBox}>
          <ItemContainer isDefault={item.isDefault}>
            <Content>
              <h5>{item.cupboardsBoxName}</h5>
              <p>
                Ilość produktów: <span>1 </span>(<a>Zobacz</a>)
              </p>
              <p>
                {!item.isInital && (
                  <div>
                    <a
                      onClick={() =>
                        setModalCupboardsData({
                          isOpen: true,
                          initalValue: item,
                          idItem: '',
                        })
                      }
                    >
                      Zmień nazwę
                    </a>
                    <a
                      onClick={() =>
                        setModalCupboardsData({
                          isOpen: true,
                          initalValue: '',
                          idItem: item.idBox,
                        })
                      }
                    >
                      Usuń
                    </a>
                  </div>
                )}

                {!item.isDefault && <a>Ustaw jako domyślny</a>}
              </p>
            </Content>
          </ItemContainer>
        </ItemWrap>
      ))}
      <ItemWrap
        onClick={() => {
          setModalCupboardsData({ isOpen: true });
        }}
      >
        <RightItemContainer>
          <RightContent>
            <FontAwesomeIcon icon={faCirclePlus as IconProp} />
            <p>Dodaj schowek</p>
          </RightContent>
        </RightItemContainer>
      </ItemWrap>
      <Modal2
        modalIsOpen={modalCupboardsData.isOpen}
        setModalIsOpen={setModalCupboardsData}
      >
        {modalCupboardsData.idItem === '' && (
          <AddCupboardsForm
            setModalIsOpen={setModalCupboardsData}
            initalValue={modalCupboardsData.initalValue}
          />
        )}
        {modalCupboardsData.idItem !== '' && (
          <RemoveCupboardsForm
            setModalIsOpen={setModalCupboardsData}
            idItem={modalCupboardsData.idItem}
          />
        )}
      </Modal2>
    </Wrapper>
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
  const user = await User.findOne({
    email: session!.user!.email,
  });
  const addressData = [];
  if (user && user?.cupboards?.length !== 0) {
    user.cupboards.map((prod) => addressData.push(prod));
  }
  return {
    props: {
      session: await getSession(context),
      addressData: JSON.parse(JSON.stringify(addressData)),
    },
  };
};
export default Returns;
