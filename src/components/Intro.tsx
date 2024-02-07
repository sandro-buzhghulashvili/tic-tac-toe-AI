import titleImg from '../assets/icons/title.png';
import starSmIcon from '../assets/icons/star-sm.png';
import starLgIcon from '../assets/icons/star-lg.png';
import ufoIcon from '../assets/icons/ufo.png';
import rocketIcon from '../assets/icons/rocket.png';
import Icon from '../components/Icon';
import { motion } from 'framer-motion';

export default function IntroPage() {
  return (
    <div
      className={`relative w-11/12 h-3/4 sm:w-3/4 sm:h-1/2 md:w-1/2 lg:h-3/5 lg:w-1/3 xl:w-1/4 flex flex-col items-center`}
    >
      <motion.img
        initial={{ scale: 0.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
        className="h-fit"
        src={titleImg}
        alt="tic tac toe"
      />
      <Icon className="absolute top-0 left-0" url={starSmIcon} />
      <Icon className="absolute top-20 left-5" url={starSmIcon} />
      <Icon className="absolute top-0 right-0" url={starSmIcon} />
      <Icon className="absolute top-20 right-5" url={starSmIcon} />
      <div className="flex -translate-y-10 justify-between gap-5">
        <Icon url={starLgIcon} />
        <Icon url={starLgIcon} />
        <Icon url={starLgIcon} />
      </div>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="text-xl py-3 px-10 bg-white rounded-full  md:hover:scale-110 duration-300"
      >
        Let's Play
      </motion.button>
      <Icon url={ufoIcon} className="absolute bottom-10 right-0" />
      <Icon url={rocketIcon} className="absolute -bottom-5 -left-5" />
    </div>
  );
}
