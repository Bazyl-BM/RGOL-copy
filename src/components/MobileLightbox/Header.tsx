import type { FC } from 'react';
import React from 'react';
import { IoIosClose } from 'react-icons/io';
import styled from 'styled-components';

const PageIndicator = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  height: 44px;
  font-size: 13px;
  line-height: 44px;
  color: #727272;
  opacity: 0.75;
  padding: 0 10px;
`;

const CloseButton = styled.div`
  width: 44px;
  height: 44px;

  color: #000;
  float: right;
`;

const TopHeaderBar = styled.header`
  background-color: #ededed;
  z-index: 999;
  opacity: 0;
  transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
`;
interface Props {
  currentIndex: number;
  onClose: React.MouseEventHandler<HTMLDivElement>;
  images: { src: string }[];
}
const LightboxHeader: FC<Props> = ({ images, currentIndex, onClose }) => (
  <TopHeaderBar>
    <PageIndicator>
      {currentIndex + 1} / {images.length}
    </PageIndicator>
    <CloseButton onClick={onClose}>
      <IoIosClose size={40} />
    </CloseButton>
  </TopHeaderBar>
);

export default LightboxHeader;
