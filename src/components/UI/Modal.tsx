import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import React, { ReactNode } from 'react';

const Modal: React.FC<{ children?: ReactNode; onClose: () => void }> = ({
  children,
  onClose,
}) => {
  return (
    <motion.div
      className="fixed z-10 top-0 left-0 w-full h-screen bg-backdrop_color"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 400 }}
        animate={{ y: 0 }}
        exit={{ y: 400 }}
        className="fixed z-20 top-0 left-0 right-0 bottom-0 m-auto h-fit w-fit bg-primary_blue p-10 border-2 border-white rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          onClick={onClose}
          className="absolute -top-5 -right-5 z-20 p-2 bg-secondary_purple rounded-full border-2 border-white text-white cursor-pointer"
        >
          <X />
        </span>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
