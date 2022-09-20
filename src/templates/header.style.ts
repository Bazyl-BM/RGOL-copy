import Link from 'next/link';
import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  background-color: #000;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
  .swiper {
    height: 28px;
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    max-width: 1600px;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;
export const HeaderMiddle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  max-width: 1920px;
  color: #fff;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  height: 46px;
  img {
    height: 21px;
    width: auto;
    max-width: 100%;
    display: block;
    cursor: pointer;
  }
`;
export const HeaderPhoneIcon = styled.div`
  ${({ theme }) => theme.mq.desktop} {
    display: inline-flex;
    flex-basis: 25%;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-left: auto;
    border-left: 2px solid #727272;
    padding: 0 0 0 1rem;
    height: 100%;
  }

  display: none;
  a {
    display: inline-flex;
    img {
      width: 21px;
      height: 21px;
    }
  }
`;
export const HeaderNotifications = styled.div`
  background-color: #86c042;
  color: #fff;
  margin-top: -6px;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
`;
export const Logo = styled(Link)`
  display: block;
  border: 0 !important;
  margin: 6px 1rem 0 0;
  padding: 10px 0;
  height: 100%;
  img {
    height: 21px;
    width: auto;
    max-width: 100%;
    display: block;
  }
`;

export const HeaderSearch = styled.div`
  @media (min-width: 992px) {
    display: none;
  }
  padding: 0 16px;
  background: #fff;
  div {
    height: 35px;
    position: relative;
    input {
      border-bottom: 1px solid #727272 !important;
      color: #727272 !important;
      width: 100%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);

      background: 0 0;
      border: 0;
      outline: none;

      display: block;

      height: auto;
      padding: 4px 16px;
      font-size: 13px;
      font-weight: 300;
      line-height: 1.5;

      border-radius: 0;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
  }
`;

export const SearchWrapper = styled.div`
  @media (max-width: 992px) {
    display: none;
  }
  position: relative;
  input {
    width: 400px;
    background: 0 0;
    padding: 0.4rem 1.6rem;
    border: 0;
    border-bottom: 1px solid #fff;
    color: #fff !important;
    outline: none;
  }
  svg {
    @media (min-width: 992px) {
      fill: #fff;
    }
    fill: #000;
  }
`;
export const SearchIconWrapper = styled.a.attrs({
  href: '#',
})`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border-bottom: 0 !important;
`;
export const BottomMenu = styled.div`
  ${({ theme }) => theme.mq.desktop} {
    padding: 1.6rem;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 55px;
    border-top: 1px solid #e0e0e0;
    background-color: #fff;
    display: flex;
    margin: 0;
    z-index: 88;
    ul {
      margin: 0;
      width: 100%;

      li {
        color: #000 !important;
        margin-right: 0;
        width: 25%;
      }
    }
  }
  display: flex;
  align-items: center;
  margin-left: 50px;
  ul {
    flex-wrap: nowrap;
    display: flex;
    padding-left: 0;

    list-style: none;
    li {
      margin-right: 3.2rem;
      color: #fff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      @media (min-width: 992px) {
        :first-child {
          display: none;
        }
      }
      a {
        position: relative;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
      :last-child {
        margin-right: 0;
      }
      svg {
        @media (min-width: 992px) {
          height: 24px;
          width: 24px;
        }
        height: 21px;
        width: 21px;
        cursor: pointer;
        path {
          transition: fill 0.25s;
        }
        :hover {
          path {
            fill: #86c042 !important;
          }
        }
      }
    }
  }
`;

export const BasketBagde = styled.div`
  position: absolute;
  top: -7px;
  right: -10px;
  width: 20px;
  height: 20px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: #fff;
  background-color: #86c042;
  font-size: 12px !important;
  font-weight: 400 !important;
  line-height: 1;
`;
