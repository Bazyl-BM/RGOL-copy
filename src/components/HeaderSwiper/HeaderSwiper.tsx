import * as React from 'react';
import styled from 'styled-components';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import CashbackIcon from '../../assets/icons-components/cashback.svg';
import DeliveryIcon from '../../assets/icons-components/delivery.svg';
import RecommnendIcon from '../../assets/icons-components/recommend.svg';
import ReturnIcon from '../../assets/icons-components/return.svg';

const SwiperWrapper = styled.div`
  background-color: #fff;
`;
const SlideItem = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 12px;
  line-height: 1;
  color: #424242;
`;

const SlideLink = styled.a`
  img {
    margin-right: 0.25rem;
    width: 25px;
    vertical-align: middle;
    border-style: none;
  }
`;
const HeaderSwiper = () => (
  <SwiperWrapper>
    <Swiper
      modules={[Autoplay]}
      slidesPerView={2}
      slidesPerGroup={2}
      speed={800}
      breakpoints={{
        // when window width is >= 640px
        580: {
          slidesPerView: 3,
          slidesPerGroup: 1,
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 4,
          slidesPerGroup: 0,
        },
      }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      style={{ background: '#fff' }}
    >
      <SwiperSlide>
        <SlideItem>
          <SlideLink href="#">
            <img src={DeliveryIcon.src} />
            DOSTAWA GRATIS OD 249 ZŁ
          </SlideLink>
        </SlideItem>
      </SwiperSlide>
      <SwiperSlide>
        <SlideItem>
          <SlideLink href="#">
            <img src={CashbackIcon.src} />
            10% CASHBACK W R-TEAM
          </SlideLink>
        </SlideItem>
      </SwiperSlide>
      <SwiperSlide>
        <SlideItem>
          <SlideLink href="#">
            <img src={RecommnendIcon.src} />
            Ocena 4.9 w TrustMate
          </SlideLink>
        </SlideItem>
      </SwiperSlide>
      <SwiperSlide>
        <SlideItem>
          <SlideLink href="#">
            <img src={ReturnIcon.src} />
            30 dni na darmowy zwrot
          </SlideLink>
        </SlideItem>
      </SwiperSlide>
    </Swiper>
  </SwiperWrapper>
);

export default HeaderSwiper;
