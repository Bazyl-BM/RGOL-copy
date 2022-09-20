import 'swiper/css';
import 'swiper/css/navigation';

import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { GetServerSideProps } from 'next';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import { Rating } from 'react-simple-star-rating';
import styled from 'styled-components';
import { Autoplay, Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import AccordionProduct from '@/components/AccordianProduct/AccordianProduct';
import AskForm from '@/components/AccordianProduct/AskForm';
import DescriptionFeature from '@/components/AccordianProduct/DescriptionFeature';
import OpinionsProduct from '@/components/AccordianProduct/OpinionsProduct';
import ShippingBox from '@/components/AccordianProduct/ShippingBox';
import MobileLightbox from '@/components/MobileLightbox/LightBox';
import Modal from '@/components/Modal/Modal';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { incrementBasketProduct } from '@/redux/Slice/basketSlide';
import { incrementCupboardProduct } from '@/redux/Slice/cupboardSlide';
import dbConnect from '@/utils/dbConnect';

import type { IProduct } from '../models/productModel';
import Product from '../models/productModel';

const ProductPageWrapper = styled.div`
  padding-left: 0;
  padding-right: 0;
  margin-bottom: 2.4rem;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
`;
const ProductPageCointeiner = styled.div`
  padding-right: 1.6rem;
  padding-left: 1.6rem;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
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
const ProductPageFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
`;
const ProductPageFlexCointeiner = styled.div`
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  flex: 0 0 100%;
  max-width: 100%;
`;
const ProductPageFlexCointeinerRes = styled(ProductPageFlexCointeiner)`
  @media (min-width: 992px) {
    flex: 0 0 91.66667%;
    max-width: 91.66667%;
  }
`;
const ProductPageFlexCointeinerRes2 = styled(ProductPageFlexCointeiner)`
  @media (min-width: 768px) {
    flex: 0 0 50%;
    max-width: 50%;
  }
`;

const ProductPageJustifyContent = styled(ProductPageFlex)`
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
  justify-content: center;
`;
const Badges = styled.div`
  @media (max-width: 767.98px) {
    gap: 0 5px;
    top: 30px;
    left: 10px;
  }

  position: absolute;
  top: 5px;
  left: 100px;
  z-index: 1;
  pointer-events: none;
  display: flex;
  flex-wrap: wrap;
  max-width: 65%;
  gap: 5px 10px;
  align-items: center;
  span {
    padding: 8px 10px;
    background: hsla(0, 0%, 100%, 0.6);
    font-weight: 600;
    color: #000;
    text-transform: uppercase;
    line-height: 1;
    margin: 5px 0 0;
    display: block;
    font-size: 90%;

    border: 1px solid #000;
  }
`;
const ProcuderPhoto = styled.div`
  @media (min-width: 992px) {
    max-width: 120px;
  }
  @media (min-width: 768px) {
    max-width: 95px;
  }
  position: absolute;
  top: 30px;
  right: 15px;
  z-index: 1;
  width: auto;
  max-width: 70px;
  pointer-events: none;
  img {
    display: block;
    width: auto;
    max-width: 100%;
  }
`;
const ProductCardWrapper = styled.div`
  flex: 0 0 100%;
  max-width: 100%;
  text-align: center;
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  text-align: center;

  @media (min-width: 768px) {
    flex: 0 0 50%;
    max-width: 50%;
  }
`;
const ProductCardCointeiner = styled.div`
  @media (max-width: 767.98px) {
    margin-top: 1rem;
  }
  max-width: 520px;
  margin: 0 auto;
  h1 {
    @media (max-width: 767.98px) {
      margin-top: 1rem;
      font-size: 24px;
    }
    font-size: 28px;
    font-weight: 500;
    text-transform: uppercase;
    word-break: break-word;
  }
`;
const ProductPrice = styled.div`
  padding-bottom: 0.8rem;

  padding-top: 0.8rem;
  div {
    font-size: 2.4rem;
    color: #000;
    min-height: 35px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    span {
      white-space: nowrap;
      font-weight: 500;
    }
  }
`;
const RatingWrapper = styled.div`
  cursor: pointer;
  margin-bottom: 1.6rem;
`;
const RatingCardContainer = styled.div`
  @media (max-width: 991.98px) {
    display: block;
  }
  vertical-align: middle;
  font-weight: 400;
  span {
    :first-of-type {
      font-weight: 500;
      font-size: 17px;
    }
    :last-of-type {
      color: #b2b2b2;
    }
  }
`;
const RatingCard = styled.div`
  display: inline-block;
`;
const ProductSizeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 1.6rem;
`;
const AddBasketWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 0;
`;
const AddBasketButtonBar = styled.div`
  @media (max-width: 767.98px) {
    position: fixed;
    bottom: 55px;
    z-index: 100;
    left: 0;
    padding: 1.6rem;
  }
  display: flex;
  background: #fff;
  width: 100%;
  padding: 1.6rem 0;
`;
const AddBasketButton = styled.div`
  flex: 1;
  margin-right: 10px;
`;
const AddBasketFlex = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
`;
const AddBasketCenter = styled.div`
  flex: 0 0 100%;
  max-width: 100%;
  text-align: center;
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
`;
const AddBasketButtonWrapper = styled.div`
  @media (max-width: 991.98px) {
    min-width: 200px;
    min-height: 41px;
  }
  button {
    min-height: 41px;
    min-width: 200px;
    width: 100%;
    cursor: pointer;
    background-color: #86c042;
    border: 2px solid #86c042;
    color: #fff;
    font-family: Oswald, Fira Sans Extra Condensed, sans-serif;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: color 0.15s ease-in-out, background 0.15s ease-in-out,
      border 0.15s ease-in-out;
  }
`;
const AddToFavouriteButton = styled.div`
  text-align: center;
  button {
    @media (max-width: 575.98px) {
      width: 65px;
    }
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    border: 1px solid #c4c4c4;
    max-height: 50px;
    height: 100%;
    cursor: pointer;
    font-size: 27px;
    background-color: transparent;
    :disabled {
      svg {
        path {
          fill: #86c042;
        }
      }
    }
  }
`;

const AddBasketQuantity = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 0 5px;
  border: 1px solid #c4c4c4;
  padding: 0 0.8rem;
  max-width: 150px;
  background-color: transparent;
  height: 100%;
  text-align: center;
  user-select: none;
  a {
    border-width: 0 !important;
    border-radius: 50%;
    background-color: #000;
    color: #fff !important;
    height: 20px;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.25s;
    font-size: 30px;
  }
  input {
    min-width: 60px;
    width: 60px;
    background: 0 0;
    border: 1px solid #c4c4c4;
    border-top: none;
    border-bottom: none;
    min-height: 40px;
    padding: 0.5rem;
    text-align: center;
    box-shadow: none;
    outline: none;
    display: block;

    height: auto;

    font-size: 1.4rem;
    font-weight: 300;
    line-height: 1.5;
    color: #495057;
    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    border-radius: 0;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
`;
const StationaryShops = styled.div`
  margin-bottom: 1.6rem;
  a {
    text-transform: uppercase;
    font-weight: 500;
    text-decoration: underline;
    color: #000;
    border-bottom: 0;
    :hover {
      border-bottom: 0;
      text-decoration: none;
    }
  }
`;
const LoyalityWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
`;
const LoyalityItem = styled.div`
  display: flex;
  align-items: center;
  color: #727272;
  fill: #727272;
  max-width: 50%;
  width: 50%;
  padding: 10px;
  justify-content: flex-end;
  p {
    margin-bottom: 0;
    strong {
      white-space: nowrap;
      font-weight: 500;
    }
  }
  :last-child {
    justify-content: flex-start;
    span {
      margin-left: 6px;
      font-weight: 600;
      font-size: 14px;
    }
  }
`;
const LoyalitySeparator = styled.div`
  width: 2px;
  background: #727272;
  max-width: 2px;
  margin: 0 15px;
  padding: 0;
  display: flex;

  align-items: center;
  color: #727272;
  fill: #727272;

  justify-content: flex-end;
`;
const ProductParamsWrapper = styled.div`
  margin-top: 4.8rem;
`;
const ThumbnailList = styled.div`
  float: left;
  margin-right: 1.6rem;
  width: 70px;
  @media (max-width: 1200px) {
    display: none;
  }
`;
const Nav = styled.nav`
  @media (min-width: 768px) {
    display: flex !important;
  }
  display: none !important;
  ol {
    background-color: transparent;
    padding: 0 0.5rem;
    font-size: 1.4rem;
    list-style: none;
    flex-wrap: nowrap;
    border-radius: 0.4rem;

    padding-left: 0.4rem !important;

    padding-right: 0.4rem !important;

    margin-bottom: 1.6rem !important;
    li {
      list-style: none;
      text-transform: capitalize;
      line-height: 30px;
      display: inline-block;
      flex-wrap: nowrap;
      font-size: 13px;
      font-weight: 400;
      color: #000;
      padding-left: 0.8rem;
      :last-of-type {
        a {
          :after {
            content: '';
          }
          white-space: nowrap;
          width: auto;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #000;
          font-weight: 300;
          cursor: default;
        }
      }
      a {
        white-space: nowrap;
        :after {
          content: '/';
          padding-left: 0.8rem;
          color: #232323;
        }
      }
    }
  }
`;

interface Props {
  res: IProduct;
}

const ProductPage: FC<Props> = ({ res }) => {
  const matches = useMediaQuery('(min-width: 992px)');
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(
    () => setIsDesktop((prev) => (prev !== matches ? matches : prev)),
    [matches]
  );
  const [isOpen, setOpen] = useState(false);
  const [currentImageIndex, setCurrentIndex] = useState(0);
  const swiperItems = res.images.map((item, index) => {
    return (
      <SwiperSlide key={index}>
        <div>
          {isDesktop ? (
            <ReactImageMagnify
              style={{ cursor: 'auto ' }}
              {...{
                smallImage: {
                  isFluidWidth: true,
                  src: item.src,
                },
                largeImage: {
                  src: item.src,
                  width: 1200,
                  height: 1800,
                },
                lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' },
              }}
              {...{
                shouldHideHintAfterFirstActivation: false,
                enlargedImagePosition: 'over',
                imageStyle: {
                  height: '100%',
                  objectFit: 'cover',
                  display: 'inline',
                  maxWidth: '100%',
                },
              }}
            />
          ) : (
            <img
              src={item.src}
              onClick={() => {
                setCurrentIndex(index);
                setOpen(true);
              }}
              style={{
                height: '100%',
                objectFit: 'cover',
                display: 'inline',
                maxWidth: '100%',
              }}
            />
          )}

          {/* <img src={item.url} /> */}
        </div>
      </SwiperSlide>
    );
  });
  const swiperSmallItems = res.images.map((item, index) => {
    return (
      <SwiperSlide key={index}>
        <div>
          <img src={item.src} />
        </div>
      </SwiperSlide>
    );
  });
  const [basketQuality, setBasketQuality] = useState(1);
  const ratingsAverage = res.reviews.reduce(function (acc, obj) {
    return acc + obj.rating;
  }, 0);

  const cupboardItem = useAppSelector((state) => state.cupboardItems.products);
  const dispatch = useAppDispatch();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [scrollTop, setScrollTop] = useState(0);
  const [isEndSticky, setIsEndSticky] = useState(false);
  const cardRef = useRef<HTMLDivElement>();
  const cardRef2 = useRef<HTMLDivElement>();
  useEffect(() => {
    function onScroll() {
      const currentPosition = window.pageYOffset; // or use document.documentElement.scrollTop;

      setScrollTop(currentPosition <= 0 ? 0 : currentPosition);
      if (cardRef.current && cardRef2.current) {
        setIsEndSticky(
          cardRef.current.getBoundingClientRect().height -
            cardRef2.current.getBoundingClientRect().height +
            40 <=
            currentPosition
        );
      }
    }

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollTop]);
  // console.log(scrollTop);

  return (
    <section>
      <ProductPageWrapper>
        <ProductPageCointeiner>
          <ProductPageFlex>
            <ProductPageFlexCointeiner>
              <Nav>
                <ol>
                  <li>
                    <a>
                      <span>Strona główna</span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <span>Sklep kibica</span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <span>Książka "Szamo" z autografem</span>
                    </a>
                  </li>
                </ol>
              </Nav>
            </ProductPageFlexCointeiner>
          </ProductPageFlex>
          <ProductPageFlex>
            <ProductPageFlexCointeiner>
              <ProductPageJustifyContent>
                <ProductPageFlexCointeinerRes>
                  <ProductPageFlex>
                    <ProductPageFlexCointeinerRes2>
                      <div>
                        <MobileLightbox
                          currentImageIndex={currentImageIndex}
                          setCurrentIndex={setCurrentIndex}
                          isOpen={isOpen}
                          onClose={() => setOpen(false)}
                          images={res.images}
                        />
                        <ThumbnailList>
                          <Swiper
                            onSwiper={setThumbsSwiper}
                            slidesPerView={res.images.length}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[Navigation, Thumbs]}
                            className="thumbs-Swiper"
                          >
                            {swiperSmallItems}
                          </Swiper>
                        </ThumbnailList>
                        <Swiper
                          modules={[Autoplay, Navigation, Pagination, Thumbs]}
                          slidesPerView={1}
                          slidesPerGroup={1}
                          speed={400}
                          loop={true}
                          navigation={true}
                          thumbs={{
                            swiper:
                              thumbsSwiper && !thumbsSwiper.destroyed
                                ? thumbsSwiper
                                : null,
                          }}
                          pagination={{
                            clickable: true,
                          }}
                          className="product-Swiper"
                        >
                          {swiperItems}
                        </Swiper>
                        <Badges>
                          <span>New</span>
                        </Badges>
                        <ProcuderPhoto>
                          <img src="https://gfx.r-gol.com/media/res/producers/56/232956/logo ks1.png" />
                        </ProcuderPhoto>
                      </div>
                    </ProductPageFlexCointeinerRes2>
                    <ProductCardWrapper ref={cardRef}>
                      <div
                        ref={cardRef2}
                        style={
                          isDesktop &&
                          cardRef.current &&
                          cardRef2.current &&
                          cardRef.current.getBoundingClientRect().top < 156
                            ? {
                                position: isEndSticky ? 'absolute' : 'fixed',
                                top: isEndSticky ? 'auto' : '156px',
                                width: `${
                                  cardRef2.current.getBoundingClientRect().width
                                }px`,
                                left: isEndSticky
                                  ? '10px'
                                  : `${
                                      cardRef2.current.getBoundingClientRect()
                                        .left
                                    }px`,
                                bottom: isEndSticky ? '0' : 'auto',
                              }
                            : {}
                        }
                      >
                        <ProductCardCointeiner>
                          <h1>{res.name}</h1>
                          <span>{`Kod produktu: ${res.productKey}`}</span>
                          <ProductPrice>
                            <div>
                              <span>{`${res.price.toFixed(2)} zł`}</span>
                            </div>
                          </ProductPrice>
                          <RatingWrapper>
                            <div>
                              <RatingCardContainer>
                                <RatingCard>
                                  <Rating
                                    ratingValue={
                                      (ratingsAverage / res.reviews.length) * 20
                                    }
                                    readonly
                                    size={18.5}
                                    fillColor="#86c042"
                                  />
                                </RatingCard>
                                {res.reviews.length > 0 && (
                                  <RatingCardContainer>
                                    <span>
                                      {(
                                        ratingsAverage / res.reviews.length
                                      ).toFixed(1)}
                                    </span>
                                    /5
                                    <span>
                                      <sup>({res.reviews.length})</sup>
                                    </span>
                                  </RatingCardContainer>
                                )}
                              </RatingCardContainer>
                            </div>
                          </RatingWrapper>
                          <ProductSizeWrapper>
                            <AddBasketQuantity>
                              <a
                                onClick={
                                  basketQuality - 1 !== 0
                                    ? () => setBasketQuality((prev) => prev - 1)
                                    : () => {}
                                }
                                style={
                                  basketQuality === 1
                                    ? { opacity: 0.5, pointerEvents: 'none' }
                                    : {}
                                }
                              >
                                -
                              </a>
                              <input
                                type="number"
                                value={basketQuality}
                                max={res.stock}
                                min="1"
                              />
                              <a
                                onClick={
                                  res.stock > basketQuality
                                    ? () => setBasketQuality((prev) => prev + 1)
                                    : () => {}
                                }
                                style={
                                  basketQuality === res.stock
                                    ? { opacity: 0.5, pointerEvents: 'none' }
                                    : {}
                                }
                              >
                                +
                              </a>
                            </AddBasketQuantity>
                          </ProductSizeWrapper>
                          <AddBasketWrapper>
                            <AddBasketButtonBar>
                              <AddBasketButton>
                                <AddBasketFlex>
                                  <AddBasketCenter>
                                    <AddBasketButtonWrapper>
                                      <button
                                        onClick={() => {
                                          dispatch(
                                            incrementBasketProduct({
                                              ...res,
                                              quantity: basketQuality,
                                            })
                                          );
                                          setModalIsOpen(true);
                                        }}
                                      >
                                        Dodaj do Koszyka
                                      </button>
                                    </AddBasketButtonWrapper>
                                  </AddBasketCenter>
                                </AddBasketFlex>
                              </AddBasketButton>
                              <Modal
                                modalIsOpen={modalIsOpen}
                                setModalIsOpen={setModalIsOpen}
                                content={{ ...res, quantity: basketQuality }}
                              />
                              <AddToFavouriteButton>
                                <button
                                  disabled={
                                    !!cupboardItem.find(
                                      (product) =>
                                        product.productKey === res.productKey
                                    )
                                  }
                                  onClick={() => {
                                    dispatch(incrementCupboardProduct(res));
                                  }}
                                >
                                  <FontAwesomeIcon icon={faHeart as IconProp} />
                                </button>
                              </AddToFavouriteButton>
                            </AddBasketButtonBar>
                          </AddBasketWrapper>
                          <StationaryShops>
                            <div>
                              <a>Sprawdź dostępność w salonach</a>
                            </div>
                          </StationaryShops>
                          <LoyalityWrapper>
                            <LoyalityItem>
                              <p>
                                <span>Z R-TEAM otrzymasz </span>
                                <strong>
                                  {`${Math.ceil(
                                    (basketQuality * res.price) / 10
                                  )}
                                  zł`}
                                </strong>
                              </p>
                            </LoyalityItem>
                            <LoyalitySeparator />
                            <LoyalityItem>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="48.219"
                                height="26"
                                viewBox="0 0 48.219 29"
                                className="product-card__cashback-icon"
                              >
                                <g
                                  id="Group_259"
                                  data-name="Group 259"
                                  transform="translate(-15.034 -8.386)"
                                >
                                  <g
                                    id="Group_235"
                                    data-name="Group 235"
                                    transform="translate(16.156 8.386)"
                                  >
                                    <text
                                      id="CASH"
                                      transform="translate(22.097 14)"
                                      fontSize="11"
                                      fontFamily="Oswald-Medium, Oswald"
                                      fontWeight="500"
                                      letterSpacing="-0.02em"
                                    >
                                      <tspan x="0" y="0">
                                        CASH
                                      </tspan>
                                    </text>
                                    <text
                                      id="BACK"
                                      transform="translate(22.097 26)"
                                      fontSize="11"
                                      fontFamily="Oswald-Medium, Oswald"
                                      fontWeight="500"
                                      letterSpacing="-0.02em"
                                    >
                                      <tspan x="0" y="0">
                                        BACK
                                      </tspan>
                                    </text>
                                    <g
                                      id="Icon_feather-rotate-ccw"
                                      data-name="Icon feather-rotate-ccw"
                                      transform="translate(0 4.754)"
                                    >
                                      <path
                                        id="Path_9"
                                        data-name="Path 9"
                                        d="M2.946,4.866V8.733H6.633"
                                        transform="translate(-2.946 -1.982)"
                                        fill="none"
                                        stroke="#727272"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                      ></path>
                                      <path
                                        id="Path_10"
                                        data-name="Path 10"
                                        d="M4.674,17.5a9.3,9.3,0,0,0,9.3,6.491A9.43,9.43,0,0,0,22.5,16.422,9.926,9.926,0,0,0,17.932,5.73,8.968,8.968,0,0,0,6.873,7.363l-3.5,3.493"
                                        transform="translate(-3.079 -4.514)"
                                        fill="none"
                                        stroke="#727272"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                      ></path>
                                    </g>
                                  </g>
                                </g>
                              </svg>
                              <span>{`${Math.ceil(res.price / 10)} zł`}</span>
                            </LoyalityItem>
                          </LoyalityWrapper>
                        </ProductCardCointeiner>
                      </div>
                    </ProductCardWrapper>
                    <ProductParamsWrapper>
                      <AccordionProduct
                        title={'Cechy Produktu'}
                        desktopOpen={matches}
                        content={<DescriptionFeature />}
                      />
                      <AccordionProduct
                        title={'Opis Produktu'}
                        desktopOpen={matches}
                        content={<p>{res.description}</p>}
                      />
                      <AccordionProduct
                        title={'Zapytaj o Produkt'}
                        content={<AskForm />}
                      />
                      {res.reviews.length > 0 && (
                        <AccordionProduct
                          title={'Opinie o produkcie '}
                          starRating={ratingsAverage / res.reviews.length}
                          content={
                            <OpinionsProduct
                              opinions={res.reviews}
                              average={ratingsAverage / res.reviews.length}
                            />
                          }
                        />
                      )}
                      <AccordionProduct
                        title={'Wysyłka'}
                        content={<ShippingBox />}
                      />
                    </ProductParamsWrapper>
                  </ProductPageFlex>
                </ProductPageFlexCointeinerRes>
              </ProductPageJustifyContent>
            </ProductPageFlexCointeiner>
          </ProductPageFlex>
        </ProductPageCointeiner>
      </ProductPageWrapper>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const id = query?.productKey;

  await dbConnect();
  const product = await Product.findOne({
    productKey: id,
  });
  return {
    props: {
      res: JSON.parse(JSON.stringify(product)),
    },
  };
};
export default ProductPage;
