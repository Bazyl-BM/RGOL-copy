import { deleteCookie } from 'cookies-next';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getSession, signOut, useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export const NoItemText = styled.div`
  text-align: center;
  padding: 1.6rem 0;
`;
export const Table = styled.table`
  width: 100%;
  margin-bottom: 1.6rem;
  color: #727272;
  text-align: left;
  border-collapse: collapse;
`;
export const SubTable = styled.table`
  width: 100%;
  margin-bottom: 1.6rem;
  color: #727272;
  text-align: left;
  border-collapse: collapse;
  thead {
    th {
      text-align: center;
      padding: 1.2rem;
      font-weight: 500;
      vertical-align: bottom;
      border: none;
      border-bottom: 1px solid #fafafa;
    }
  }
  tbody {
    th {
      text-align: inherit;
      padding: 1.2rem;
      vertical-align: top;
      font-weight: 500;
      border: none;
      border-bottom: 1px solid #fafafa;
    }
    td {
      border: none;
      border-bottom: 1px solid #fafafa;
      padding: 1.2rem;
      vertical-align: top;
      a {
        font-family: Oswald, Fira Sans Extra Condensed, sans-serif;
        font-weight: 300;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: color 0.15s ease-in-out, background 0.15s ease-in-out,
          border 0.15s ease-in-out;
        background-color: #86c042;
        border: 2px solid #86c042;
        color: #fff;
        cursor: pointer;
        margin-top: 1.6rem;
        width: 100%;
        display: inline-block;
        padding: 0.8rem 4.6rem;
        font-size: 1.4rem;
        line-height: 1.5;
        border-radius: 0;
        text-align: center;
        vertical-align: middle;
        user-select: none;
      }
    }
  }
`;
export const Thead = styled.thead`
  th {
    border-bottom-width: 1px !important;
    border-top-width: 0 !important;
    vertical-align: bottom;
    border-bottom: 2px solid #c4c4c4;
    font-weight: 500;
    padding: 1.2rem;
    border-top: 1px solid #c4c4c4;
    :first-of-type {
      @media (min-width: 768px) {
        display: table-cell;
      }
      display: none;
    }
    :last-of-type {
      @media (min-width: 768px) {
        display: table-cell;
      }
      display: none;
    }
  }
`;
export const Tr = styled.tr`
  cursor: pointer;
  :hover {
    color: #727272;
    background-color: rgba(0, 0, 0, 0.075);
  }
  td {
    padding: 1.2rem;
    vertical-align: top;
    border-top: 1px solid #c4c4c4;
    :first-of-type {
      @media (min-width: 768px) {
        display: table-cell;
      }
      display: none;
    }
  }
`;
export const Td = styled.td`
  border: none;
  border-bottom: 1px solid #fafafa;
  vertical-align: top;
  padding: 0;
`;
export const Row = styled.td`
  display: flex;
  flex-wrap: wrap;
  margin-right: 0;
  margin-left: 0;
`;
export const Conteiner = styled.td`
  padding: 0;
  padding-right: 0.8rem;
  flex: 0 0 100%;
  max-width: 100%;
  position: relative;
  width: 100%;
  @media (min-width: 1200px) {
    flex: 0 0 50%;
    max-width: 50%;
  }
`;
export const ProductList = styled.div`
  flex: 0 0 100%;
  max-width: 100%;
  padding: 0;
  position: relative;
  width: 100%;
  @media (min-width: 1200px) {
    flex: 0 0 50%;
    max-width: 50%;
    padding-left: 0.8rem;
  }
`;
export const ProductElement = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2.4rem;
`;
export const ProductHeader = styled.div`
  width: 100%;
  align-items: flex-start;
  flex-wrap: nowrap;
  display: flex;
`;
export const ProductFooter = styled.div`
  @media (max-width: 575.98px) {
    flex-direction: column;
  }
  display: flex;
  margin-top: 1.6rem;
`;
export const ProductDetails = styled.div`
  display: none;
  @media (min-width: 576px) {
    margin-bottom: 0 !important;
    display: flex;
    margin-top: 0 !important;
  }
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;
export const ProductPrice = styled.div`
  margin-right: 2rem;
  margin-top: 1rem;
  max-width: 40%;
  min-width: 70px;
  @media (min-width: 576px) {
    display: block !important;
  }
  strong {
    font-weight: 500;
    s {
      display: block;
      color: #c4c4c4;
      font-weight: 300;
      font-size: 0.8em;
      @media (min-width: 768px) {
        margin-top: -7px;
      }
    }
  }
`;
export const ProductValue = styled.div`
  margin-top: 1.6rem;
  max-width: 40%;
  min-width: 70px;
  text-align: right;
  margin-right: 0;
  display: none;
  @media (min-width: 576px) {
    display: block;
  }
  strong {
    font-weight: 500;
    s {
      color: #c4c4c4;
      font-weight: 300;
      display: block;
      font-size: 0.8em;
      @media (min-width: 768px) {
        margin-top: -7px;
      }
    }
  }
`;
export const ProductQuantity = styled.div`
  margin-top: 1.6rem;
  max-width: 40%;
  min-width: 70px;
  margin-right: 3.2rem;
  border-right: 1px solid #f2f2f2;
  border-left: 1px solid #f2f2f2;
  text-align: center;
  display: none;
  @media (min-width: 576px) {
    display: block;
  }
`;
export const ProductPhoto = styled.div`
  margin-right: 1.6rem;
  background-color: #fafafa;
  width: 80px;
  font-size: 12px;
  a {
    text-decoration: none;
    background-color: transparent;
    word-break: break-word;
    color: #000;
    border-bottom: 0;
    img {
      width: 80px;
      vertical-align: middle;
      border-style: none;
    }
  }
`;
export const ProductConteiner = styled.div`
  flex-grow: 1;
`;
export const ProductName = styled.strong`
  font-weight: 500;
  display: inline-block;
  a {
    color: #000;
    border-bottom: 0;
    line-height: 16px;
    word-break: break-word;
    margin-bottom: 0.4rem;
    display: inline-block;
    text-decoration: none;
    background-color: transparent;
  }
`;
export const ProductAttr = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.4rem;
  div {
    margin-right: 0.8rem;
  }
`;
export const Price = styled.span`
  white-space: nowrap;
`;
export const FooterAttr = styled.div`
  min-width: 70px;
  text-align: center;
  @media (max-width: 575.98px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 16px;
    width: 100%;
    max-width: 100%;
    margin-top: 0;
    margin-right: 0;
    width: 100%;
    padding: 0.8rem 0;
    strong {
      white-space: normal;
    }
  }
`;
export const FooterPrice = styled.span`
  @media (max-width: 575.98px) {
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-end;
    line-height: 1;
  }
  span {
    white-space: nowrap;
  }
  s {
    color: #c4c4c4;
    font-weight: 300;
    font-size: 0.8em;
    display: block;
    @media (max-width: 575.98px) {
      margin-right: 0.25rem;
    }
  }
`;
export const FooterQuality = styled.div`
  min-width: 70px;
  max-width: 100%;
  margin-top: 0;
  margin-right: 0;
  text-align: center;
  @media (max-width: 575.98px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 16px;
    padding-left: 0;
    padding-right: 0;
    border-color: #f2f2f2 currentcolor;
    border-style: solid none;
    border-width: 1px 0;
    max-width: 100%;
    margin-top: 0;
    margin-right: 0;
    padding: 0.8rem 0;
    width: 100%;
  }
`;
export const Details = styled.span`
  padding-left: 1.5rem;
  align-items: center;
  display: flex;
  span {
    display: none;
    @media (min-width: 992px) {
      display: inline-block;
    }
  }
`;
export const Arrow = styled.i`
  transition: transform 0.3s ease-in-out;
  transform: rotate(90deg);
  margin-left: 10px;
`;
const Returns = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (!session || session.error === 'RefreshAccessTokenError') {
      signOut();
      router.push('/access/login');
    }
  }, [session, status]);
  const ref = useRef<HTMLTableElement>(null);
  return (
    // <NoItemText>
    //   Niestety nie złożyłeś jeszcze żadnego zamówienia w naszym sklepie
    // </NoItemText>
    <div>
      <Table>
        <Thead ref={ref}>
          <tr>
            <th>#</th> <th>Data złożenia</th>
            <th>Status zamówienia</th> <th>Wartość</th>
            <th></th>
          </tr>
        </Thead>
        <tbody>
          <Tr
            onClick={() => {
              if (!isOpen) {
                const header = document.querySelector('header')?.offsetHeight;

                if (ref.current?.getBoundingClientRect().top >= header + 1)
                  window.scrollTo({
                    behavior: 'smooth',
                    top: ref.current?.getBoundingClientRect().top - header,
                  });
              }
              setIsOpen((prev) => !prev);
            }}
          >
            <td>R20535949</td>
            <td>2022-08-16 10:12:42</td> <td>Zrealizowane</td>
            <td>
              <Price>
                <span>299,99</span>
                <span>zł</span>
              </Price>
            </td>
            <td>
              <Details>
                <span>Szczegóły</span>
                <Arrow>{'>'}</Arrow>
              </Details>
            </td>
          </Tr>
          {isOpen && (
            <tr className="no-hover">
              <Td colSpan={6} className="p-0">
                <Row className="row mx-0">
                  <Conteiner className="col-12 col-xl-6 pr-xl-2 p-0">
                    <SubTable className="table-nohover order-details table">
                      <thead>
                        <tr>
                          <th colSpan={2} className="text-center">
                            Szczegóły zamówienia
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>Numer zamówienia</th> <td>R20535949</td>
                        </tr>
                        <tr>
                          <th>Data zamówienia</th> <td>2022-08-16 10:12:42</td>
                        </tr>
                        <tr>
                          <th>Status zamówienia</th> <td>Zrealizowane</td>
                        </tr>
                        <tr>
                          <th>Metoda dostawy</th>{' '}
                          <td>InPost Paczkomaty 24/7</td>
                        </tr>
                        <tr>
                          <th>Metoda płatności</th>
                          <td>
                            <div>Płatność online</div>
                            <div>
                              <div className="d-flex flex-wrap">
                                <span>Płatność przyjęta:&nbsp;</span>
                                <strong>299,99&nbsp;zł</strong>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>Wartość produktów</th>
                          <td>
                            <span className="text-nowrap">
                              <span className="price">299,99</span>
                              <span className="currency">zł</span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th>Koszty dostawy</th>
                          <td>
                            <span className="text-nowrap">
                              <span className="price">0,00</span>
                              <span className="currency">zł</span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th>Wartość zamówienia</th>
                          <td>
                            <span className="text-nowrap">
                              <span className="price">299,99</span>
                              <span className="currency">zł</span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={2}>
                            <a>
                              <span>Zgłoś zwrot lub reklamację</span>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </SubTable>
                  </Conteiner>
                  <ProductList>
                    <SubTable className="table-nohover table">
                      <thead>
                        <tr>
                          <th>Lista produktów</th>
                        </tr>
                      </thead>
                    </SubTable>
                    <ProductElement className="basket__list-item mb-4">
                      <ProductHeader className="d-flex align-items-start w-100 flex-nowrap">
                        <ProductPhoto className="list-item__photo">
                          <a href="https://www.r-gol.com/korki-adidas-copa-sense-3-fg,p-152318">
                            <img
                              alt="Korki adidas Copa Sense.3 FG"
                              src="https://gfx.r-gol.com/media/res/products/318/152318/100x130/gy8928_1.jpg"
                            />
                          </a>
                        </ProductPhoto>
                        <ProductConteiner className="list-item__containter">
                          <ProductName>
                            <a
                              href="https://www.r-gol.com/korki-adidas-copa-sense-3-fg,p-152318"
                              className="d-inline-block mb-1"
                            >
                              Korki adidas Copa Sense.3 FG
                            </a>
                          </ProductName>
                          <ProductAttr className="item-attr d-flex align-items-center mb-1">
                            <div className="mr-2">Rozmiar:</div>
                            <span>44 2/3</span>
                          </ProductAttr>
                          <ProductDetails className="d-none d-sm-flex my-sm-0 my-4 flex-wrap">
                            <ProductPrice className="list-item__attr d-none d-sm-block">
                              <div>Kwota</div>
                              <strong>
                                <span className="list-item__prices">
                                  <span className="text-nowrap">
                                    <span className="price">299,99</span>
                                    <span className="currency">zł</span>
                                  </span>
                                  <s className="d-block">
                                    <span className="text-nowrap">
                                      <span className="price">349,00</span>
                                      <span className="currency">zł</span>
                                    </span>
                                  </s>
                                </span>
                              </strong>
                            </ProductPrice>
                            <ProductQuantity className="list-item__attr list-item__attr--border d-none d-sm-block text-center">
                              <div>Ilość</div>
                              <div className="text-nowrap">
                                <strong>1</strong>
                              </div>
                            </ProductQuantity>
                            <ProductValue className="list-item__attr d-none d-sm-block mr-0 text-right">
                              <div>Wartość</div>
                              <strong>
                                <span className="list-item__prices">
                                  <span className="text-nowrap">
                                    <span className="price">299,99</span>
                                    <span className="currency">zł</span>
                                  </span>
                                  <s className="d-block">
                                    <span className="text-nowrap">
                                      <span className="price">349,00</span>
                                      <span className="currency">zł</span>
                                    </span>
                                  </s>
                                </span>
                              </strong>
                            </ProductValue>
                          </ProductDetails>
                        </ProductConteiner>
                      </ProductHeader>
                      <ProductFooter className="list-item__footer d-sm-none mt-3">
                        <FooterAttr className="list-item__attr">
                          <div>Kwota</div>
                          <strong>
                            <FooterPrice className="list-item__prices">
                              <span className="text-nowrap">
                                <span className="price">299,99</span>
                                <span className="currency">zł</span>
                              </span>
                              <s className="d-block">
                                <span className="text-nowrap">
                                  <span className="price">349,00</span>
                                  <span className="currency">zł</span>
                                </span>
                              </s>
                            </FooterPrice>
                          </strong>
                        </FooterAttr>
                        <FooterQuality className="list-item__attr list-item__attr--border">
                          <div>Ilość</div>
                          <div className="text-nowrap">
                            <strong>1</strong>
                          </div>
                        </FooterQuality>
                        <FooterAttr className="list-item__attr mr-0">
                          <div>Wartość</div>
                          <strong>
                            <FooterPrice className="list-item__prices">
                              <span className="text-nowrap">
                                <span className="price">299,99</span>
                                <span className="currency">zł</span>
                              </span>
                              <s className="d-block">
                                <span className="text-nowrap">
                                  <span className="price">349,00</span>
                                  <span className="currency">zł</span>
                                </span>
                              </s>
                            </FooterPrice>
                          </strong>
                        </FooterAttr>
                      </ProductFooter>
                    </ProductElement>
                  </ProductList>
                </Row>
              </Td>
            </tr>
          )}
        </tbody>
      </Table>
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
export default Returns;
