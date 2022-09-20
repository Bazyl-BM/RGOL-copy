import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef } from 'react';
import styled from 'styled-components';

import useOnClickOutside from '@/hooks/useOnClickOutside';

export const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(114, 114, 114, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;
export const ModalWrapper = styled(motion.div)`
  min-height: calc(100% - 3.5rem);
  @media (min-width: 576px) {
    min-height: calc(100% - 1rem);
    max-width: 600px;
    margin: 1.75rem auto;
  }
  display: flex;
  align-items: center;
  position: relative;
  width: auto;
  margin: 0.8rem;
  pointer-events: none;
  z-index: 9999;
`;
export const ModalCointeiner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 0 solid rgba(0, 0, 0, 0.2);
  border-radius: 0;
  outline: 0;
`;
export const ModalHeader = styled.header`
  background-color: #fafafa;

  padding: 2.4rem;
  position: relative;
  justify-content: center;
  display: flex;
  align-items: flex-start;
  border-bottom: 0 solid #c4c4c4;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  h5 {
    letter-spacing: normal;
    display: flex;
    letter-spacing: 2px;
    align-items: center;
    margin-right: 40px;
    margin-left: 40px;
    margin-bottom: 0;
    line-height: 1.5;
    font-weight: 500;
    text-transform: uppercase;
    position: relative;
    font-size: 1.8rem;
    @media (max-width: 767.98px) {
      font-size: 14.4px;
      margin-left: 0;
    }
  }
  button {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    padding: 0.8rem !important;
    margin: 0;
    font-size: 5.32rem;
    font-style: normal;
    font-weight: 100;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-shadow: transparent 0 0 0;
    background-color: transparent;
    border: 0;
    cursor: pointer;
  }
`;
export const ModalBodyWrapper = styled.div`
  position: relative;
  flex: 1 1 auto;
  padding: 1.6rem 3.2rem;
`;
export const ModalBodyFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
`;
export const ModalBodyMobile = styled(ModalBodyFlex)`
  @media (min-width: 576px) {
    display: none !important;
  }

  display: block !important;
`;
export const ModalBodyMobileConteiner = styled.div`
  flex: 0 0 100%;
  max-width: 100%;
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
`;
export const ListWrapper = styled.div`
  flex: 0 0 58.33333%;
  max-width: 58.33333%;
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  div {
    text-transform: uppercase;
    align-self: center;
    ul {
      padding-left: 0;
      list-style: none;
      margin-bottom: 0;
      text-align: left;
      strong {
        font-weight: 500;
      }
    }
  }
`;
export const ModalBodyImage = styled.div`
  flex: 0 0 41.66667%;
  max-width: 41.66667%;
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  display: flex;
  text-align: center;
  div {
    width: 100%;

    align-items: center;
    justify-content: center;
    display: flex;
    img {
      max-width: 100%;
      height: auto;
      width: 100%;
      background-color: #fafafa;
    }
  }
`;
export const ModalBodyContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 0 0 58.33333%;
  max-width: 58.33333%;
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  img {
    max-height: 60px;
    max-width: 60px;
    margin-bottom: 10px;
    @media (max-width: 575.98px) {
      max-width: 50px;
    }
  }
  h2 {
    letter-spacing: normal;
    font-size: 24px;
    margin-top: 0;
    @media (max-width: 575.98px) {
      font-size: 18px;
    }

    @media (max-width: 767.98px) and (min-width: 575.98px) {
      font-size: 22.4px;
    }
    @media (max-width: 1199.98px) and (min-width: 767.98px) {
      font-size: 25.2px;
    }
    text-align: left;
  }
`;
export const ModalBodyList = styled.div`
  @media (min-width: 576px) {
    display: block !important;
  }

  display: none;
  div {
    :first-of-type {
      text-transform: uppercase;
      align-self: center;
      ul {
        padding-left: 0;
        list-style: none;
        margin: 0;
        text-align: left;
        strong {
          font-weight: 500;
        }
      }
    }
    :last-of-type {
      margin-top: 10px;
      span {
        font-size: 2.4rem;
        color: #000;
        min-height: 35px;
        display: flex;
        justify-content: left;
        align-items: center;
        font-weight: 500;
        strong {
          white-space: nowrap;
        }
      }
    }
  }
`;
export const ModalFooter = styled.footer`
  display: flex;
  flex-wrap: nowrap;
  @media (max-width: 575.98px) {
    flex-wrap: wrap;
    flex-direction: column-reverse;
    button {
      :last-of-type {
        width: 100%;
      }
    }
  }
  align-items: center;
  justify-content: flex-end;
  padding: 2.8rem;
  border-top: 0 solid #c4c4c4;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  font-weight: 200;
  background: #fff;
  font-size: 16px;
  justify-content: space-between;
  button {
    font-family: Oswald, Fira Sans Extra Condensed, sans-serif;
    font-weight: 300;
    margin: 0.4rem;
    width: 225px;
    white-space: nowrap;
    padding: 0.8rem 4.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    display: inline-block;
    vertical-align: middle;
    user-select: none;
    background-color: transparent;
    border: 2px solid transparent;
    cursor: pointer;
    font-size: 1.4rem;
    display: inline-block;
    line-height: 1.5;
    border-radius: 0;
    transition: color 0.15s ease-in-out, background 0.15s ease-in-out,
      border 0.15s ease-in-out;
    :first-of-type {
      @media (min-width: 575.98px) {
        padding-left: 0;
        text-align: left;
      }

      color: #727272;
    }
    :last-of-type {
      background-color: #86c042;
      border: 2px solid #86c042;
      color: #fff;

      :hover {
        background-color: #79ae3a;
        border-color: #79ae3a;
        color: #fff;
      }
    }
  }
`;

export default function Modal({ modalIsOpen, setModalIsOpen, content }) {
  const overlayVariants = {
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        duration: 0.2,
        delayChildren: 0.3,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
        duration: 0.2,
        delay: 0.3,
      },
    },
  };
  const ModalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(ModalRef, () => setModalIsOpen(false));
  return (
    <>
      <AnimatePresence>
        {modalIsOpen && (
          <ModalOverlay
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
          >
            <ModalWrapper
              ref={ModalRef}
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3 }}
            >
              <ModalCointeiner>
                <ModalHeader>
                  <h5>Produkt został dodany do koszyka</h5>
                  <button
                    type="button"
                    aria-label="Close"
                    onClick={() => setModalIsOpen(false)}
                  >
                    ×
                  </button>
                </ModalHeader>
                <ModalBodyWrapper>
                  <div>
                    <div style={{ alignItems: 'center' }}>
                      <ModalBodyFlex>
                        <ModalBodyImage>
                          <div>
                            <img src={content.images[0].src} />
                          </div>
                        </ModalBodyImage>
                        <ModalBodyContent>
                          <img
                            src="https://gfx.r-gol.com/media/res/producers/56/232956/logo ks1.png"
                            alt="Kanał Sportowy"
                          />
                          <h2>{content.name}</h2>
                          <ModalBodyList>
                            <div>
                              <ul>
                                <li>
                                  Kod produktu:
                                  <strong>{content.productKey}</strong>
                                </li>
                                <li>
                                  Rozmiar: <strong>One Size</strong>
                                </li>
                                <li>
                                  Ilość: <strong>{content.quantity}</strong>
                                </li>
                              </ul>
                            </div>
                            <div>
                              <span>
                                <strong>
                                  {(content.price * content.quantity).toFixed(
                                    2
                                  )}
                                  zł
                                </strong>
                              </span>
                            </div>
                          </ModalBodyList>
                        </ModalBodyContent>
                      </ModalBodyFlex>
                      <ModalBodyMobile>
                        <ModalBodyMobileConteiner>
                          <ModalBodyFlex>
                            <ListWrapper>
                              <div>
                                <ul>
                                  <li>
                                    Kod produktu:
                                    <strong>{content.productKey}</strong>
                                  </li>
                                  <li>
                                    Rozmiar: <strong>One Size</strong>
                                  </li>
                                  <li>
                                    Ilość: <strong>{content.quantity}</strong>
                                  </li>
                                </ul>
                              </div>
                            </ListWrapper>
                          </ModalBodyFlex>
                        </ModalBodyMobileConteiner>
                      </ModalBodyMobile>
                    </div>
                  </div>
                </ModalBodyWrapper>
                <ModalFooter>
                  <button onClick={() => setModalIsOpen(false)}>
                    Powrót do zakupów
                  </button>
                  <button>Przejdź do koszyka</button>
                </ModalFooter>
              </ModalCointeiner>
            </ModalWrapper>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
}
