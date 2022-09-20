import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useGetProductsQuery } from '@/redux/api/products/productAPI';

import {
  Container,
  FlexBox,
  SlideDecs,
  SlideImg,
  SlideItem,
  SlideLink,
  SlideName,
  SlidePrice,
  SwiperWrapper,
  Title,
  Wrapper,
} from './ForYouSwiper.style';

const ForYouSwiper = () => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  const { data: products, isSuccess } = useGetProductsQuery();

  return (
    <Wrapper>
      <Container>
        <FlexBox>
          <Title>
            <h1>Wybrane dla Ciebie</h1>
          </Title>
          <SwiperWrapper>
            {domLoaded && (
              <Swiper
                modules={[Navigation]}
                slidesPerView={2}
                loop={true}
                navigation={true}
                breakpoints={{
                  565: {
                    slidesPerView: 3,
                  },

                  740: {
                    slidesPerView: 4,
                  },
                }}
                className="forYou-Swiper"
              >
                {isSuccess &&
                  products.map((item) => (
                    <SwiperSlide key={item.productKey}>
                      <SlideItem>
                        <SlideLink
                          passHref
                          href={`/${encodeURIComponent(
                            _.deburr(item.name)
                              .split(' ')
                              .join('-')
                              .toLowerCase()
                          )}?productKey=${item.productKey}`}
                        >
                          <SlideDecs>
                            <SlideImg imageSource={item.images[0]?.src} />
                            <SlideName
                              style={
                                item.name.length < 45 ? { height: '45px' } : {}
                              }
                            >
                              <p>{item.name}</p>
                            </SlideName>
                            <SlidePrice>
                              <span>{`${item.price.toFixed(2)} zł`}</span>
                            </SlidePrice>
                          </SlideDecs>
                        </SlideLink>
                      </SlideItem>
                    </SwiperSlide>
                  ))}
              </Swiper>
            )}
          </SwiperWrapper>
        </FlexBox>
      </Container>
    </Wrapper>
  );
};
export default ForYouSwiper;
