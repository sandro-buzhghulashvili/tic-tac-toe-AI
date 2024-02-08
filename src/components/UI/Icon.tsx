import React from 'react';

import { motion } from 'framer-motion';

interface IconProps extends React.HTMLProps<HTMLImageElement> {
  url: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ url, className }) => {
  return (
    <motion.span
      className={className}
      initial={{ scale: 0.1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1 }}
    >
      <img src={url} alt="icon" />
    </motion.span>
  );
};

export default Icon;
