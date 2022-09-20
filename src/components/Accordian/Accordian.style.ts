import { motion } from 'framer-motion';
import styled from 'styled-components';

interface AccordionItemProps {
  isContact?: boolean;
}

export const AccordionItem = styled.div<AccordionItemProps>`
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  flex: ${(props) => (props.isContact ? '100% !important' : '')};
  max-width: ${(props) => (props.isContact ? '100% !important' : '')};
  @media (max-width: 992px) {
    text-align: ${(props) => (props.isContact ? 'center' : '')};
  }
  text-align: ${(props) => (props.isContact ? 'right !important' : '')};
  @media (min-width: 1200px) {
    flex: 0 0 16.66667%;
    max-width: 16.66667%;
  }
  @media (min-width: 992px) and (max-width: 1200px) {
    flex: 0 0 25%;
    max-width: 25%;
  }

  @media (min-width: 768px) and (max-width: 992px) {
    flex: 0 0 100%;
    max-width: 100%;
  }

  h4 {
    padding-bottom: 1.6rem;
    margin-bottom: 0;

    @media (max-width: 992px) {
      cursor: pointer;
      text-align: center;
      margin-top: 1.6rem;
      width: 100%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-indent: 0;
    }
    span {
      position: relative;
      .open {
        ::after {
          transform: rotate(-90deg);
        }
      }
      ::after {
        position: relative;
        right: 0;
        display: inline-block;
        content: '>';
        @media (min-width: 992px) {
          display: none;
        }
        margin-left: 0.8rem;
        font-size: 17px;
        font-weight: 300;
        transition: transform 0.2s ease-in-out 0s;
        transform: rotate(90deg);
      }
    }
  }
`;
export const AccordionList = styled(motion.ul)<AccordionItemProps>`
  position: relative;
  p {
    text-align: ${(props) => (props.isContact ? 'right' : 'center')};
  }
  @media (min-width: 992px) {
    border: none;
    text-align: left;
  }
  @media (max-width: 992px) {
    p {
      text-align: ${(props) => (props.isContact ? 'center' : '')};
    }
  }
  border-bottom: 2px solid #e0e0e0;
  display: block;

  overflow: hidden;
  flex-direction: column;
  text-align: center;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  width: 100%;
  margin-top: 0;

  p {
    &:first-of-type {
      margin-top: 16px !important;
    }
  }
  li {
    padding: 0.4rem 0;
    :last-of-type {
      margin-bottom: 1.6rem;
    }
    a {
      font-weight: 400;
      text-transform: uppercase;
      line-height: 1.5;
      color: #000;
      font-size: 14px;
      transition: color 0.25s;
      cursor: pointer;
      :hover {
        color: #86c042;
      }
    }
  }
`;
