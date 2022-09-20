import { useAnimation } from 'framer-motion';
import type { FC } from 'react';
import React, { useEffect } from 'react';

import useMediaQuery from '@/hooks/useMediaQuery';

import { AccordionItem, AccordionList } from './Accordian.style';
import { ContentLink, ContentText } from './Content';

interface Props {
  title: string;
  links?: string[];
  content?: string[];
  isContact?: boolean;
}
const Accordion: FC<Props> = ({ title, links, content, isContact }) => {
  const control = useAnimation();
  let open = true;
  const matches = useMediaQuery('(min-width: 992px)');
  console.log(matches);
  useEffect(() => {
    if (matches) control.start('open');
    else control.start('collapsed');
  }, [matches]);
  return (
    <>
      <AccordionItem
        onClick={() => {
          if (!matches) {
            if (open) control.start('open');
            else control.start('collapsed');
            open = !open;
          }
        }}
        isContact={isContact}
      >
        <h4>
          <span>{title}</span>
        </h4>

        <AccordionList
          key="content"
          isContact={isContact}
          animate={control}
          initial={matches ? 'open' : 'collapsed'}
          variants={{
            open: { height: 'auto' },
            collapsed: { height: 0 },
          }}
          transition={{
            duration: 0.3,
            delay: 0.2,
          }}
        >
          {links &&
            links.map((link: string, index: number) => (
              <ContentLink key={index} title={link} />
            ))}
          {content &&
            content.map((link: string, index: number) => (
              <ContentText key={index} title={link} i={index} />
            ))}
        </AccordionList>
      </AccordionItem>
    </>
  );
};
export default Accordion;
