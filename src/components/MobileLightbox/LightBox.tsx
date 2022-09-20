/* eslint-disable @typescript-eslint/no-unused-expressions */
import type { FC, SetStateAction } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import Lightbox from 'react-spring-lightbox';

import ArrowButton from './ArrowButton';
import Footer from './Footer';
import Header from './Header';

interface Props {
  currentImageIndex: number;
  onClose: (() => void) | undefined;
  images: { src: string; alt: string }[];
  isOpen: boolean;
  setCurrentIndex: React.Dispatch<SetStateAction<number>>;
}

const MobileLightbox: FC<Props> = ({
  images,
  currentImageIndex,
  setCurrentIndex,
  isOpen,
  onClose,
}) => {
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const a = document.querySelector('[data-testid]');

    a &&
      a.addEventListener(
        'mouseover',
        () => {
          clearTimeout(timeout.current as NodeJS.Timeout);
          setIsVisible(true);
          timeout.current = setTimeout(() => {
            setIsVisible(false);
          }, 5000);
        },
        false
      );
  }, [isOpen]);

  const gotoPrevious = () =>
    currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

  const gotoNext = () =>
    currentImageIndex + 1 < images.length &&
    setCurrentIndex(currentImageIndex + 1);

  return (
    <Lightbox
      isOpen={isOpen}
      onPrev={gotoPrevious}
      onNext={gotoNext}
      onClose={onClose}
      images={images}
      style={{ background: '#fff', zIndex: '9999' }}
      className={isVisible ? 'visible' : ''}
      currentIndex={currentImageIndex}
      singleClickToZoom
      renderFooter={() => <Footer images={images} />}
      renderHeader={() => (
        <Header
          images={images}
          currentIndex={currentImageIndex}
          onClose={onClose as React.MouseEventHandler<HTMLDivElement>}
        />
      )}
      renderPrevButton={() => (
        <ArrowButton position="left" onClick={gotoPrevious} />
      )}
      renderNextButton={() => (
        <ArrowButton position="right" onClick={gotoNext} />
      )}
    />
  );
};

export default MobileLightbox;
