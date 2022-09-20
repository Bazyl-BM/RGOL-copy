import { deleteCookie } from 'cookies-next';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getSession, signOut, useSession } from 'next-auth/react';
import * as React from 'react';
import styled from 'styled-components';

const SumarySection = styled.div`
  text-align: right;
  margin: 2.4rem 0;
  h6 {
    line-height: 1.5;
    margin-bottom: 0.4rem;
    font-size: 1.4rem;
  }
  span {
    font-weight: 500;
    white-space: nowrap;
  }
`;

const NotItem = styled.div`
  text-align: center;
  padding: 0 1.6rem;
  margin-bottom: 1rem;
`;
const HeaderSwiper = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  React.useEffect(() => {
    if (!session || session.error === 'RefreshAccessTokenError') {
      signOut();
      router.push('/access/login');
    }
  }, [session, status]);
  return (
    <div>
      <h3>Środki R-TEAM</h3>
      <SumarySection>
        <h6>Podsumowanie:</h6>
        Wszystkie środki:<span> 0 zł</span>
        <br />
        Dostępne środki:<span> 0 zł</span>
      </SumarySection>
      <NotItem>Niestety, nie masz jeszcze środków R-TEAM</NotItem>
    </div>
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

export default HeaderSwiper;
