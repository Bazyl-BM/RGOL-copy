import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { AnimationControls } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import type { FC, SetStateAction } from 'react';
import * as React from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { decrementBasketProduct } from '@/redux/Slice/basketSlide';

import {
  BasketButton,
  BasketButtonWrapper,
  BasketCloseIcon,
  BasketContainer,
  BasketContent,
  BasketFreeDelivery,
  BasketHearthIconWrapper,
  BasketImgLink,
  BasketItem,
  BasketItemWrapper,
  BasketList,
  BasketOverlay,
  BasketRemove,
  BasketSummary,
  Code,
  Content,
  Info,
  PriceItem,
  PriceWrapper,
  ValueWrapper,
} from './Basket.style';

interface BasketProps {
  control: AnimationControls;
  isOpen: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

const Basket: FC<BasketProps> = ({ control, isOpen, setOpen }) => {
  const BasketItems = useAppSelector((state) => state.basketItems.cart);
  const totalCost = BasketItems.reduce((acc, obj) => {
    let { price } = obj;
    if (obj.quantity !== 1) {
      price = obj.price * obj.quantity;
    }
    return acc + price;
  }, 0);

  const dispatch = useAppDispatch();
  return (
    <>
      <BasketOverlay
        key="overlay"
        onClick={() => {
          control.start('close');

          setOpen((prev) => !prev);
        }}
        animate={control}
        initial="close"
        variants={{
          open: {
            position: 'fixed',
            top: '0',
            right: '0',
            left: '0',
            bottom: '0',
            zIndex: '1002',
            cursor: 'pointer',
          },
          close: { display: 'none', position: 'unset' },
        }}
      />
      <BasketContainer
        key="content"
        animate={control}
        initial="close"
        variants={{
          open: { transform: 'translateX(0)' },
          close: { transform: 'translateX(100%)' },
        }}
        transition={{
          duration: 0,
        }}
      >
        <BasketContent>
          <BasketCloseIcon>
            <FontAwesomeIcon
              style={{ cursor: 'pointer' }}
              icon={faXmark as IconProp}
              onClick={() => {
                if (isOpen) control.start('close');
                else control.start('open');
                setOpen((prev) => !prev);
              }}
            />
          </BasketCloseIcon>
          <h5>Mój koszyk ({BasketItems.length})</h5>

          <section>
            <BasketList>
              <AnimatePresence initial={false}>
                {BasketItems.map((item) => (
                  <motion.li
                    exit={{
                      x: 600,
                      opacity: 0,
                      transition: {
                        duration: 0.8,
                        ease: [0.57, 0.21, 0.69, 1.25],
                      },
                    }}
                    key={item.productKey}
                  >
                    <BasketItemWrapper>
                      <BasketItem>
                        <BasketImgLink>
                          <img src={item.images[0]?.src}></img>
                        </BasketImgLink>
                        <Content>
                          <a>{item.name}</a>
                          <Code>{item.productKey}</Code>
                          <Info>
                            <div>Ilość: {item.quantity}</div>
                            <PriceWrapper>
                              <PriceItem>
                                <ValueWrapper>
                                  <span>{item.price.toFixed(2)}</span>
                                  <span>zł</span>
                                </ValueWrapper>
                              </PriceItem>
                            </PriceWrapper>
                          </Info>
                          <BasketHearthIconWrapper>
                            <FontAwesomeIcon icon={faHeart as IconProp} />
                          </BasketHearthIconWrapper>
                        </Content>
                      </BasketItem>
                    </BasketItemWrapper>
                    <BasketRemove
                      onClick={() => {
                        dispatch(decrementBasketProduct(item));
                      }}
                    >
                      <FontAwesomeIcon
                        style={{ cursor: 'pointer' }}
                        icon={faXmark as IconProp}
                      />
                    </BasketRemove>
                  </motion.li>
                ))}
              </AnimatePresence>
            </BasketList>
            {BasketItems.length !== 0 && (
              <>
                <BasketSummary>
                  <ul>
                    <li>
                      <label>Produkty (suma):</label>
                      <ValueWrapper>
                        <span>{totalCost.toFixed(2)}</span> <span>zł</span>
                      </ValueWrapper>
                    </li>
                    <li>
                      <label>Wysyłka:</label>
                      {250 - totalCost > 0 ? (
                        <div>
                          <span>
                            od 9,99
                            <span>zł</span>
                          </span>
                        </div>
                      ) : (
                        <div
                          style={{
                            color: '#86c042',
                            textTransform: 'uppercase',
                          }}
                        >
                          Darmowa
                        </div>
                      )}
                    </li>
                    <li>
                      <BasketFreeDelivery>
                        <div>
                          <i>
                            <span></span>
                            <span></span>
                          </i>
                          <p>
                            {250 - totalCost > 0 ? (
                              <span>
                                Do darmowej dostawy brakuje Ci
                                <b>
                                  {` ${(250 - totalCost).toFixed(2)}`}{' '}
                                  <span>zł</span>
                                </b>
                              </span>
                            ) : (
                              <span>Spełniasz warunki Darmowej Dostawy</span>
                            )}
                          </p>
                        </div>
                      </BasketFreeDelivery>
                    </li>
                    <li>
                      <strong>Do zapłaty:</strong>
                      <strong>
                        <span>
                          <span>{totalCost.toFixed(2)}</span> <span>zł</span>
                        </span>
                      </strong>
                    </li>
                  </ul>
                </BasketSummary>
                <BasketButtonWrapper>
                  <BasketButton>Przejdź do koszyka</BasketButton>
                  <BasketButton
                    secondary
                    onClick={() => {
                      control.start('close');
                      setOpen((prev) => !prev);
                    }}
                  >
                    Powrót do zakupów
                  </BasketButton>
                </BasketButtonWrapper>
              </>
            )}
            {BasketItems.length === 0 && 'Koszyk jest pusty'}
          </section>
        </BasketContent>
      </BasketContainer>
    </>
  );
};
export default Basket;
