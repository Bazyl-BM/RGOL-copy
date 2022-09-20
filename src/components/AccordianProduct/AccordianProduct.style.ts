import { motion } from 'framer-motion';
import styled from 'styled-components';

export const AccordionProductItem = styled.div`
  border-top: 2px solid #fafafa;
  text-align: left;
  border-bottom: 2px solid #fafafa;
  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 1rem;
    font-family: Oswald, Fira Sans Extra Condensed, sans-serif;
    font-size: 20px;
    text-transform: uppercase;
    text-decoration: none !important;
    font-weight: 400;
    border-bottom: 0 !important;
    color: #000 !important;
    cursor: pointer;
    ::after {
      position: relative;
      right: 0;

      content: '>';

      margin-left: 0.8rem;
      font-size: 24px;
      font-weight: 300;
      transition: transform 0.2s ease-in-out 0s;
      transform: rotate(90deg);
    }
    svg {
      margin-bottom: 0.7rem;
    }
  }
`;
export const AccordionProductTitle = styled.span`
  margin-right: 2.4rem;
`;
export const AccordionProductList = styled(motion.div)`
  font-family: Oswald, Fira Sans Extra Condensed, sans-serif;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
  text-transform: none;
  position: relative;

  overflow: hidden;
  td:first-child {
    padding-right: 4.8rem;
    max-width: 200px;
  }
  strong {
    color: #000;
    font-weight: 500;
  }
`;
