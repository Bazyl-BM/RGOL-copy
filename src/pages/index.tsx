import 'swiper/css';
import 'swiper/css/navigation';

import { useEffect, useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import ForYouSwiper from '@/components/ForYouSwiper/ForYouSwiper';
import useMediaQuery from '@/hooks/useMediaQuery';

import addidasBallImg from '../assets/image/adidas_alrihla_poziom.webp';
import addidasBootsImg from '../assets/image/adidas_diamond_edge_poziom.webp';
import Category1 from '../assets/image/dla_kibica_pl.jpg';
import WomanEuroImg from '../assets/image/euro_kobiet_22_pion_pl.webp';
import KSImg from '../assets/image/Kafel_KS_SG_4.webp';
import PolandImg from '../assets/image/Kafel_SG_POLSKA-2.webp';
import TeamImg_D from '../assets/image/kafelek_d.webp';
import TeamImg from '../assets/image/kafelek_m.webp';
import Lanki from '../assets/image/lanki_pl.webp';
import slider1 from '../assets/image/slider1.webp';
import slider1_D from '../assets/image/slider1_D.webp';
import slider2 from '../assets/image/slider2.jpg';
import slider2_D from '../assets/image/slider2_D.jpg';
import slider3 from '../assets/image/slider3.webp';
import slider3_D from '../assets/image/slider3_D.jpg';
import slider4 from '../assets/image/slider4.webp';
import slider4_D from '../assets/image/slider4_D.webp';
import {
  BannerButton,
  BannerContent,
  BannerItem,
  BannerPhoto,
  BannerSection,
  BannerText,
  BannerWrapper,
  BannerWrapperSmall,
  CategorySection,
  FirstCategorySection,
  HomePageBannerContainer,
  HomePageBannerDiv,
  HomePageBannerFlex,
  HomePageBannerItem,
  HomePageBannerWrapper,
  SlideItemHero,
} from '../assets/styles/pages/index.style';

const Index = () => {
  const matches = useMediaQuery('(max-width: 768px)');
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(
    () => setIsDesktop((prev) => (prev !== matches ? matches : prev)),
    [matches]
  );
  return (
    <>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        slidesPerGroup={1}
        speed={800}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        className="hero-Swiper"
      >
        <SwiperSlide>
          <SlideItemHero>
            <img src={isDesktop ? slider1.src : slider1_D.src} />
          </SlideItemHero>
        </SwiperSlide>
        <SwiperSlide>
          <SlideItemHero>
            <img src={isDesktop ? slider2.src : slider2_D.src} />
          </SlideItemHero>
        </SwiperSlide>
        <SwiperSlide>
          <SlideItemHero>
            <img src={isDesktop ? slider3.src : slider3_D.src} />
          </SlideItemHero>
        </SwiperSlide>
        <SwiperSlide>
          <SlideItemHero>
            <img src={isDesktop ? slider4.src : slider4_D.src} />
          </SlideItemHero>
        </SwiperSlide>
      </Swiper>
      <HomePageBannerWrapper>
        <HomePageBannerDiv>
          <HomePageBannerFlex>
            <HomePageBannerContainer>
              <HomePageBannerItem>
                <a>
                  <img src={addidasBallImg.src} />
                </a>
              </HomePageBannerItem>
              <HomePageBannerItem>
                <a>
                  <img src={addidasBootsImg.src} />
                </a>
              </HomePageBannerItem>
              <HomePageBannerItem>
                <a>
                  <img src={WomanEuroImg.src} />
                </a>
              </HomePageBannerItem>
            </HomePageBannerContainer>
          </HomePageBannerFlex>
        </HomePageBannerDiv>
      </HomePageBannerWrapper>
      <ForYouSwiper />
      <FirstCategorySection>
        <a>
          <img src={matches ? TeamImg.src : TeamImg_D.src} />
        </a>
        <a>
          <img src={Lanki.src} />
        </a>
        <a>
          <img src={Lanki.src} />
        </a>
        <a>
          <img src={Lanki.src} />
        </a>
        <a>
          <img src={Lanki.src} />
        </a>
      </FirstCategorySection>
      <BannerSection>
        <BannerWrapper>
          <BannerWrapperSmall>
            <BannerItem>
              <BannerPhoto>
                <a>
                  <img src={PolandImg.src} />
                </a>
              </BannerPhoto>
              <BannerContent>
                <BannerText>
                  <a>
                    <h3>OFICJALNY SKLEP KIBICA REPREZENTACJI POLSKI</h3>
                  </a>
                  <p>
                    <a>
                      Wejdź do biało-czerwonego świata kibica reprezentacji
                      Polski. Wybierz coś dla siebie spośród tysięcy
                      licencjonowanych produktów. Kupuj koszulki reprezentacji
                      Polski, gadżety do domu lub inne wyjątkowe produkty z
                      naszymi reprezentantami. Spraw prezent sobie lub innym
                      fanom Biało-Czerwonych!
                    </a>
                  </p>
                </BannerText>
                <BannerButton>Sprawdź</BannerButton>
              </BannerContent>
            </BannerItem>
          </BannerWrapperSmall>
        </BannerWrapper>
      </BannerSection>
      <BannerSection>
        <BannerWrapper>
          <BannerWrapperSmall>
            <BannerItem isReserve={!matches}>
              <BannerPhoto>
                <a>
                  <img src={KSImg.src} />
                </a>
              </BannerPhoto>
              <BannerContent>
                <BannerText>
                  <a>
                    <h3>OFICJALNY SKLEP KANAŁU SPORTOWEGO</h3>
                  </a>
                  <p>
                    <a>
                      Produkty związane z Kanałem Sportowym znajdziesz w naszym
                      sklepie internetowym, <br />
                      ale także przy Puławskiej 255 w Warszawie, gdzie
                      stworzyliśmy wyjątkową strefę <br /> poświęconą projektowi
                      Mateusza Borka, Michała Pola, Tomasza Smokowskiego <br />i
                      Krzysztofa Stanowskiego!
                    </a>
                  </p>
                </BannerText>
                <BannerButton>Sprawdź</BannerButton>
              </BannerContent>
            </BannerItem>
          </BannerWrapperSmall>
        </BannerWrapper>
      </BannerSection>
      <CategorySection>
        <a>
          <div>
            <img src={Category1.src} />
          </div>
        </a>
        <a>
          <div>
            <img src={Category1.src} />
          </div>
        </a>
        <a>
          <div>
            <img src={Category1.src} />
          </div>
        </a>
        <a>
          <div>
            <img src={Category1.src} />
          </div>
        </a>
        <a>
          <div>
            <img src={Category1.src} />
          </div>
        </a>
        <a>
          <div>
            <img src={Category1.src} />
          </div>
        </a>
        <a>
          <div>
            <img src={Category1.src} />
          </div>
        </a>
        <a>
          <div>
            <img src={Category1.src} />
          </div>
        </a>
      </CategorySection>
    </>
  );
};

export default Index;
