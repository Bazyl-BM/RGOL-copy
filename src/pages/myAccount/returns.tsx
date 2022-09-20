import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getSession, signOut, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const NoItemText = styled.div`
  text-align: center;
  padding: 1.6rem 0;
`;

const Returns = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session || session.error === 'RefreshAccessTokenError') {
      signOut();
      router.push('/access/login');
    }
  }, [session, status]);
  return <NoItemText>Nie dokonałeś jeszcze żadnego zwrotu</NoItemText>;
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
  return {
    props: {
      session: await getSession(context),
    },
  };
};
export default Returns;
