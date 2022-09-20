// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faBasketShopping,
  faHeart,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useAnimation } from 'framer-motion';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';

import Basket from '@/components/Basket/Basket';
import HeaderSwiper from '@/components/HeaderSwiper/HeaderSwiper';
import NavBar from '@/components/NavBar/NavBar';
import { ResultBox } from '@/components/resultBox/resultBox';
import useDebounce from '@/hooks/useDebounce';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { useAppSelector } from '@/redux/hooks';

import PhoneIcon from '../assets/icons-components/phone.svg';
import LogoImg from '../assets/image/logo2.webp';
import {
  BasketBagde,
  BottomMenu,
  HeaderMiddle,
  HeaderNotifications,
  HeaderPhoneIcon,
  HeaderSearch,
  HeaderWrapper,
  Logo,
  SearchIconWrapper,
  SearchWrapper,
} from './header.style';

const Header = () => {
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(true);
  const [searchProduct, setSearchProduct] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const control = useAnimation();
  const { data: session } = useSession();
  const BasketItems = useAppSelector((state) => state.basketItems.cart);
  const cupboardItem = useAppSelector((state) => state.cupboardItems.products);
  const debouncedValue = useDebounce<string>(searchValue, 300);
  useEffect(() => {
    if (!isResultOpen) setIsResultOpen(true);
    if (searchValue.length > 2)
      axios
        .post('/api/searchProduct', {
          searchValue,
        })
        .then(function (response) {
          console.log(response.data);
          setSearchProduct(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
  }, [debouncedValue]);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsResultOpen(false));

  return (
    <>
      <Basket
        control={control}
        isOpen={isBasketOpen}
        setOpen={setIsBasketOpen}
      />
      <HeaderWrapper>
        <HeaderNotifications>2+1 MEGA PROMOCJA !!!</HeaderNotifications>
        <HeaderSwiper />
        <HeaderMiddle>
          <Logo href="/">
            <img src={LogoImg.src}></img>
          </Logo>
          <HeaderPhoneIcon>
            <a href="tel:+48 11 111 11 11">
              <img src={PhoneIcon.src} />
            </a>
          </HeaderPhoneIcon>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SearchWrapper ref={ref}>
              <div>
                <input
                  type="search"
                  placeholder="Szukaj..."
                  maxLength={60}
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                ></input>
                <SearchIconWrapper>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30 30"
                    width="18px"
                    height="18px"
                  >
                    <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
                  </svg>
                </SearchIconWrapper>
              </div>
              {searchValue.length > 2 && isResultOpen && (
                <ResultBox
                  searchValue={searchValue}
                  searchProduct={searchProduct}
                />
              )}
            </SearchWrapper>

            <BottomMenu>
              <ul>
                <li>
                  <FontAwesomeIcon icon={faBars as IconProp} />
                </li>
                <li>
                  <Link passHref href="/cupboard">
                    <a>
                      <FontAwesomeIcon icon={faHeart as IconProp} />
                      {cupboardItem.length !== 0 && (
                        <BasketBagde>{cupboardItem.length}</BasketBagde>
                      )}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    passHref
                    href={session ? '/myAccount/personalData' : '/access/login'}
                  >
                    <a>
                      <FontAwesomeIcon icon={faUser as IconProp} />
                    </a>
                  </Link>
                </li>
                <li>
                  <a>
                    <FontAwesomeIcon
                      icon={faBasketShopping as IconProp}
                      onClick={() => {
                        if (isBasketOpen) control.start('close');
                        else control.start('open');
                        setIsBasketOpen((prev) => !prev);
                      }}
                    />
                    {BasketItems.length !== 0 && (
                      <BasketBagde>{BasketItems.length}</BasketBagde>
                    )}
                  </a>
                </li>
              </ul>
            </BottomMenu>
          </div>
        </HeaderMiddle>
        <HeaderSearch>
          <div>
            <input
              type="search"
              placeholder="Szukaj..."
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              maxLength={60}
            ></input>
            <SearchIconWrapper>
              <svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                width="18px"
                height="18px"
              >
                <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
              </svg>
            </SearchIconWrapper>
            {/* {searchValue.length > 2 && <ResultBox />} */}
          </div>
        </HeaderSearch>
        <NavBar />
      </HeaderWrapper>
    </>
  );
};

export default Header;
