import React from 'react';

import classes from '../SelectMode.module.scss';
import { motion } from 'framer-motion';

const Mode: React.FC<{
  icon: string;
  text: string;
  theme: string;
  onClick?: () => void;
}> = ({ icon, text, theme, onClick, ...props }) => {
  return (
    <motion.li
      variants={{
        hidden: {
          x: 100,
          opacity: 0,
        },
        visible: {
          opacity: 1,
          x: 0,
        },
      }}
      {...props}
      className={`${classes.mode} ${classes[theme]}`}
    >
      <button onClick={onClick}>{text}</button>
      <div className={classes['img-container']}>
        <img src={icon} alt="robot" />
      </div>
    </motion.li>
  );
};

export default Mode;
