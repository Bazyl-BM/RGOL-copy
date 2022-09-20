import { useAnimation } from 'framer-motion';
import type { FC } from 'react';
import React from 'react';
import { Rating } from 'react-simple-star-rating';

import {
  AccordionProductItem,
  AccordionProductList,
  AccordionProductTitle,
} from './AccordianProduct.style';

interface Props {
  title: string;
  starRating?: number;
  content: React.ReactElement;
  desktopOpen?: boolean;
}
const AccordionProduct: FC<Props> = ({
  title,
  starRating,
  content,
  desktopOpen,
}) => {
  const control = useAnimation();
  let open = true;
  return (
    <>
      <AccordionProductItem>
        <a
          onClick={() => {
            if (open) control.start('open');
            else control.start('collapsed');
            open = !open;
          }}
        >
          <div>
            <AccordionProductTitle>{title}</AccordionProductTitle>
            {starRating && (
              <Rating
                ratingValue={starRating * 20}
                readonly
                size={18.5}
                fillColor="#86c042"
              />
            )}
          </div>
        </a>

        <AccordionProductList
          key="content"
          animate={control}
          initial={desktopOpen ? 'open' : 'collapsed'}
          variants={{
            open: {
              height: 'auto',
              display: 'block',
              transition: {
                duration: 0.4,
              },
            },
            collapsed: {
              height: '0px',

              transition: { duration: 0.4 },
            },
            closed: { height: '0' },
          }}
        >
          <div style={{ padding: '0 1rem 1rem' }}>{content}</div>
        </AccordionProductList>
      </AccordionProductItem>
    </>
  );
};
export default AccordionProduct;
