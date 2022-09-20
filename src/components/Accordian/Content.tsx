import { motion } from 'framer-motion';
import * as React from 'react';

interface Props {
  title: string;
  i?: number;
}

export const ContentLink: React.FC<Props> = ({ title }) => (
  <motion.li
    variants={{
      collapsed: { opacity: 0, transition: { duration: 0.3 } },
      open: { opacity: 1, transition: { duration: 0.3, delay: 0.2 } },
    }}
  >
    <a>{title}</a>
  </motion.li>
);
export const ContentText: React.FC<Props> = ({ title, i }) => (
  <motion.p
    variants={{
      collapsed: { opacity: 0, transition: { duration: 0.3 } },
      open: { opacity: 1, transition: { duration: 0.3, delay: 0.2 } },
    }}
  >
    {i && i > 1 ? title : <strong>{title}</strong>}
  </motion.p>
);
