import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  bottom: -1px;
  right: 0;
  width: 150%;
  transform: translateY(100%);
  height: auto;
  z-index: 1000;
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-top: 0;
  color: #727272;
`;
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
`;
export const Conteiner = styled.div`
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  flex: 0 0 100%;
  max-width: 100%;
  @media (min-width: 576px) {
    padding-right: 0 !important;
    flex: 0 0 33.33333%;
    max-width: 33.33333%;
  }
`;
export const SearchHints = styled.div`
  background-color: #fff;
  padding-bottom: 0.5rem;
  height: 100%;
  p {
    font-weight: 700;
    color: #000;
    padding: 0.8rem 0.8rem 0;
    margin: 0;
  }
  ul {
    padding-left: 0;
    list-style: none;
    margin-bottom: 0;
    margin-top: 0;
    li {
      padding: 0.8rem 0.8rem 0 0.8rem;
      a {
        color: #000;
        border-bottom: 0;
        transition: color 0.25s;
        text-decoration: none;
        background-color: transparent;
        span {
          color: #86c042;
        }
        :hover {
          color: #86c042;
          border-bottom: 0;
          text-decoration: none;
        }
      }
    }
  }
`;
export const SearchBox = styled.div`
  position: relative;
  width: 100%;

  flex: 0 0 100%;
  max-width: 100%;
  @media (min-width: 576px) {
    flex: 0 0 66.66667%;
    max-width: 66.66667%;
    display: none;
    display: block;
  }
`;
export const Wrap = styled.div`
  padding-bottom: 0.8rem;
  ul {
    margin-bottom: 0;
    padding-left: 0.8rem;
    list-style: none;
    a {
      display: flex;
    }
  }
`;
export const Item = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
  padding-top: 0.8rem;
  padding-right: 0.8rem;
`;
export const Photo = styled.div`
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  @media (min-width: 576px) {
    flex: 0 0 16.66667%;
    max-width: 16.66667%;
  }
  flex: 0 0 25%;
  max-width: 25%;
  img {
    max-width: 100%;
    height: auto;
    max-height: 75px;
    font-size: 8px;
  }
`;
export const Content = styled.div`
  flex: 0 0 75%;
  max-width: 75%;
  @media (min-width: 576px) {
    flex: 0 0 83.33333%;
    max-width: 83.33333%;
  }
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  h5 {
    font-weight: 400;
    font-size: 1.4rem !important;
    margin-bottom: 0.4rem !important;
    span {
      color: #86c042;
    }
  }
  span {
    white-space: nowrap;
    color: #000;
    font-weight: 700;
  }
`;
export const Action = styled.div`
  margin-top: 0.8rem;
  margin-right: 0.8rem;
  margin-bottom: -0.8rem;
  a {
    display: block;
    width: 100%;
    padding: 0.5rem;
    border-top: 1px solid #e0e0e0;
    text-align: center;
    font-weight: 500;
    border-bottom: 0;
    border-bottom: 0;
    color: #000;
    text-decoration: none;
    transition: color 0.25s;
    :hover {
      color: #86c042;
    }
  }
`;
// interface CustomInputProps {
//   type?: string;
//   label: string;
//   disabled?: boolean;
// }
export const ResultBox = ({ searchValue, searchProduct }) => {
  const [word, setWord] = useState([]);
  useEffect(() => {
    setWord([]);
    searchProduct.forEach((product) => {
      const name = product.name.toLowerCase();
      const ind = name.search(searchValue.toLowerCase());
      const nsew = name.replace(searchValue.toLowerCase(), '');
      const first = nsew.slice(0, ind);
      const second = nsew.slice(ind);
      console.log(searchValue);
      console.log(first, second, ind);
      setWord((prev) => [...prev, { ...product, first, second, index: ind }]);
    });
    console.log(word);
  }, [searchValue, searchProduct]);

  return (
    <>
      <Wrapper>
        <Row>
          <Conteiner>
            <SearchHints>
              <p>Zobacz w kategorii</p>
              <ul>
                <li>
                  <a>
                    <div>
                      odzież piłkar
                      <span>ska</span>
                      (242)
                    </div>
                  </a>
                </li>
              </ul>
            </SearchHints>
          </Conteiner>
          <SearchBox>
            <Wrap>
              <ul>
                {word.map((item) => (
                  <li key={item.productKey}>
                    <a>
                      <Photo>
                        <img src={item.images[0]?.src} />
                      </Photo>
                      <Content>
                        <h5>
                          {item.index >= 0 ? (
                            <>
                              {item.first}
                              <span>{searchValue}</span>
                              {item.second}
                            </>
                          ) : (
                            <>{item.name}</>
                          )}
                        </h5>
                        <span>49,99 zł</span>
                      </Content>
                    </a>
                  </li>
                ))}
              </ul>
              <Action>
                <a>Zobacz wszystkie (577)</a>
              </Action>
            </Wrap>
          </SearchBox>
        </Row>
      </Wrapper>
    </>
  );
};
