import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  padding-right: 0;
  padding-left: 0;
  margin-bottom: 2.4rem;
  hr {
    border-top: 1px solid #e0e0e0;
    margin-top: 0;
  }
`;
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
`;
export const Cointeiner = styled.div`
  margin-bottom: 0.8rem;
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
  h1 {
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;
    margin-bottom: 0.5rem;
    font-family: Oswald, Fira Sans Extra Condensed, sans-serif;
    line-height: 1.2;
    color: #000;
    font-size: 3.2rem;
    text-align: center;
  }
`;
export const ChildrenRow = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin: 1.6rem -10px;
`;
export const ChildrenCointeiner = styled.div`
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
export const ChildrenWrap = styled.div`
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
  h3 {
    margin-top: 2.4rem;
    font-size: 2rem;
  }
  hr {
    margin-top: 1.6rem;
  }
`;
export const MyAccountList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
`;
interface Props {
  isActive: boolean;
  isRed?: boolean;
}
export const MyAccountListItem = styled.li<Props>`
  border-bottom: 3px solid transparent;
  text-align: center;

  border-color: ${(props) => (props.isActive ? '#86c042' : '')};
  a {
    display: block;
    padding: 0.8rem 1.6rem;
    color: ${(props) => (props.isRed ? '#e72b37' : '#000')};
    font-weight: ${(props) => (props.isRed ? 'bolder' : '')};
    border-bottom: 0 !important;
  }
`;

export const MyAccountLinkData: {
  title: string;
  link?: string;
  islogOut?: boolean;
  isRed?: boolean;
}[] = [
  {
    title: 'Schowki',
    link: '/myAccount/cupboards',
  },
  {
    title: 'Zamówienia',
    link: '/myAccount/orders',
  },
  {
    title: 'Zwroty i reklamacje',
    link: '/myAccount/returns',
  },
  {
    title: 'R-TEAM',
    link: '/myAccount/loyaltyProgram',
  },
  {
    title: 'Moje dane',
    link: '/myAccount/personalData',
  },
  {
    title: 'Adresy',
    link: '/myAccount/adress',
  },
  {
    title: 'Zmiana hasła',
    link: '/myAccount/passwordChange',
  },
  {
    title: 'BOK',
    link: '/myAccount/bok',
  },
  {
    title: 'Opinie',
    link: '/myAccount/opinions',
  },
  {
    title: 'Wyloguj',
    isRed: true,
  },
];

const MyAccountHeader = ({ children }) => {
  const router = useRouter();

  return (
    <Wrapper>
      <div style={{ marginTop: '10px' }}>
        <hr />
        <Cointeiner>
          <h1>Moje konto</h1>
          <MyAccountList>
            {MyAccountLinkData.map((item) => (
              <MyAccountListItem
                isActive={router.pathname.includes(item.link)}
                key={item.title}
                isRed={item.isRed}
              >
                {item.link ? (
                  <Link passHref href={item.link}>
                    <a>{item.title}</a>
                  </Link>
                ) : (
                  <a
                    onClick={() =>
                      signOut({ callbackUrl: 'http://localhost:3000/' })
                    }
                  >
                    {' '}
                    {item.title}
                  </a>
                )}
              </MyAccountListItem>
            ))}
          </MyAccountList>
        </Cointeiner>
        <hr />
      </div>
      <ChildrenCointeiner>
        <ChildrenRow>
          <ChildrenWrap>{children}</ChildrenWrap>
        </ChildrenRow>
      </ChildrenCointeiner>
      <hr style={{ marginTop: '1.6rem' }} />
    </Wrapper>
  );
};
export default MyAccountHeader;
