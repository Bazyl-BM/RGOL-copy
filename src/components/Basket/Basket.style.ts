import { motion } from 'framer-motion';
import styled from 'styled-components';

export const BasketContainer = styled(motion.section)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1002;
  width: 35vw;
  max-width: 450px;
  transition: transform 0.7s;
  padding: 5px 10px;
  @media (min-width: 767px) {
    width: 40vw !important;
  }
  @media (min-width: 480px) {
    width: 55vw;
  }
  @media (max-width: 480px) {
    width: 80vw;
  }
`;

export const BasketButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  padding-bottom: 10px;
  background: #fff;
  border-top: 1px solid #fafafa;
  width: 35vw;
  max-width: 450px;
  margin-right: 0;
  transition: margin 0.7s;
  @media (max-width: 992px) {
    width: 40vw;
  }
`;

export const BasketContent = styled.div`
  padding: 0.8rem 0;
  @media (max-width: 992px) {
    padding: 0;
  }
  ::-webkit-scrollbar {
    width: 6px;
    background-color: #e0e0e0;
    border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #e0e0e0;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
  }
  ::-webkit-scrollbar-track {
    background-color: #f2f2f2;
    border-radius: 6px;
  }
  padding-bottom: 4.8rem;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #fff;
  z-index: 1003;
  overflow: auto;

  h5 {
    text-align: center;
    padding-top: 2.4rem;
    margin-bottom: 4.8rem;
  }
  section {
    text-align: center;
  }
`;
export const BasketCloseIcon = styled.div`
  height: 30px;
  svg {
    position: absolute;
    right: 0;
    height: 30px;
    width: 30px;
    margin-right: 5px;
    path {
      fill: #000;
    }
  }
`;
export const BasketOverlay = styled(motion.div)`
  background: rgba(0, 0, 0, 0.3) !important;
  opacity: 1 !important;
`;
export const BasketRemove = styled.div`
  flex: 0 0 45px;
  margin-right: -45px;
  transition: margin 0.3s;
  text-align: center;
  position: relative;
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1400px) {
    flex: 0 0 35px;
    margin-right: -35px;
  }
  @media (max-width: 991px) {
    margin-right: 8px !important;
  }
  svg {
    height: 20px;
    width: 20px;
    path {
      fill: #000;
    }
  }
`;
export const BasketList = styled.ul`
  font-weight: 600;
  overflow-x: hidden;
  text-align: left;
  padding: 0 0.8rem;
  margin-bottom: 0.8rem;
  display: flex;
  flex-direction: column;
  li {
    :last-child {
      border-bottom: 0;
      margin-bottom: 0;
    }
    padding-bottom: 1.6rem;
    margin-bottom: 1.6rem;
    overflow: hidden;
    justify-content: space-between;
    margin-left: -8px;
    margin-right: -8px;
    display: flex;
    :hover ${BasketRemove} {
      margin-right: 8px;
    }
  }
`;

export const BasketItemWrapper = styled(motion.div)`
  margin-right: 20px;
  transition: margin 0.3s;
  width: 100%;
  @media (max-width: 991px) {
    margin-right: 10px;
  }
`;
export const BasketItem = styled.div`
  margin-left: 5px;
  display: flex;
`;
export const BasketImgLink = styled.a`
  flex: 0 0 80px;
  background-color: #fafafa;
  max-height: 120px;
  border: none;
  color: #000;
  margin: 0 0.8rem;
  img {
    max-width: 100%;
    height: auto;
  }
`;
export const Content = styled.div`
  flex-grow: 1;
  flex-direction: column;
  display: flex;
  font-size: 14px;
  a {
    color: #000;
    border: none;
    word-break: break-word;
    color: #000;
    @media (max-width: 991px) {
      font-size: 13.5px;
    }
  }
`;
export const Code = styled.div`
  font-size: 12px;
  color: #858585;
  font-weight: 400;
  line-height: 14px;
  margin-bottom: 0.8rem;
`;
export const Info = styled.div`
  font-size: 12px;
  font-weight: 300;
  margin-bottom: 0.8rem;
  width: 100%;
  align-items: stretch;
  justify-content: space-between;
  display: flex;
`;
export const PriceWrapper = styled.div`
  justify-content: flex-end;
  flex-direction: column;
  display: flex;
`;
export const PriceItem = styled.span`
  display: flex;
  flex-direction: column-reverse;
`;
export const BasketHearthIconWrapper = styled.div`
  display: flex;

  cursor: pointer;
  text-align: right;
  svg {
    width: 18px;
    height: 18px;
    path {
      fill: #000;
    }
  }
`;
export const ValueWrapper = styled.span`
  white-space: nowrap;
  span {
    :first-of-type {
      font-size: 14px;
      font-weight: 600;
      color: #000;
      text-align: right;
    }

    :last-of-type {
      font-weight: 600;
      color: #000;
    }
  }
`;
export const BasketSummary = styled.div`
  margin-bottom: auto;

  padding-bottom: 2.4rem;
  width: 100%;
  ul {
    padding: 0 13px;
    font-weight: 600;
    overflow-x: hidden;
    width: 100%;
    list-style: none;

    li {
      margin: 0;
      font-size: 14px;
      font-weight: 300;
      text-align: left;
      overflow: hidden;
      border: 0;
      ${ValueWrapper} {
        span {
          font-weight: 300;
          color: inherit;
        }
      }
      label {
        margin-bottom: 0;
        display: inline-block;
      }
      :first-child {
        display: flex;
        justify-content: space-between;
      }
      :nth-of-type(2) {
        margin-bottom: 0.8rem;
        display: flex;
        justify-content: space-between;
      }
      :nth-of-type(3) {
        margin-bottom: 1.6rem;
      }
      :last-of-type {
        font-size: 20px;
        color: #000;
        text-transform: uppercase;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }
    }
  }
`;
export const BasketFreeDelivery = styled.div`
  margin-bottom: 0;
  div {
    margin-bottom: 10px;
    min-height: 40px;
    background: #f4f2f2;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 4px 20px;
    p {
      padding: 0;
      margin: 0 0 0 10px;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
`;
interface BasketButtonProps {
  secondary?: boolean;
}
export const BasketButton = styled.a<BasketButtonProps>`
  font-family: Oswald, Fira Sans Extra Condensed, sans-serif;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.15s ease-in-out, background 0.15s ease-in-out,
    border 0.15s ease-in-out;
  cursor: pointer;
  width: 80%;

  display: inline-block;

  text-align: center;
  vertical-align: middle;
  user-select: none;

  padding: 0.8rem 1.6rem;
  font-size: 1.4rem;
  line-height: 1.5;
  border-radius: 0;
  margin: ${(props) => (props.secondary ? '0' : '2.4rem 0 1.6rem 0')};
  color: ${(props) => (props.secondary ? '#000' : '#fff')};
  border: ${(props) =>
    props.secondary ? '2px solid #b2b2b2' : '2px solid #86c042'};
  background-color: ${(props) => (props.secondary ? 'transparent' : '#86c042')};
  :hover {
    color: #fff;
    border-color: ${(props) => (props.secondary ? '#727272' : '#79ae3a')};
    background-color: ${(props) => (props.secondary ? '#727272' : '#79ae3a')};
  }
  :focus {
    color: #fff;
    border-color: ${(props) => (props.secondary ? '#727272' : '#79ae3a')};
    background-color: ${(props) => (props.secondary ? '#727272' : '#79ae3a')};
  }
`;
