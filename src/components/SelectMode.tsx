import scoreIcon from '../assets/icons/score.png';
import Icon from './UI/Icon';

import robotImg from '../assets/icons/robot.png';
import multiplayerImg from '../assets/icons/multiplayer.png';
import marketImg from '../assets/icons/store.png';
import gamePadImg from '../assets/icons/gamepad.png';

import classes from './SelectMode.module.scss';
import Mode from './UI/Mode';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import Modal from './UI/Modal';
import { useDispatch } from 'react-redux';
import { gameSliceActions } from '../store/game-slice';
import { sceneActions } from '../store/scene-slice';
import SelectPlayers from './SelectPlayers';

export default function SelectMode() {
  const dispatch = useDispatch();
  const [chooseDifficulty, setChooseDifficulty] = useState<boolean>(false);
  const [selectPlayers, setSelectPlayers] = useState<boolean>(false);

  function handleDifficulty() {
    setChooseDifficulty((prevValue) => !prevValue);
  }

  function handleSelectPlayers() {
    setSelectPlayers((prevValue) => !prevValue);
  }

  function handleStart(difficulty: string) {
    dispatch(gameSliceActions.setDifficulty(difficulty));
    dispatch(sceneActions.gameMode());
  }

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
        },
      }}
      exit={{ opacity: 0, y: 200, position: 'fixed' }}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      <AnimatePresence>
        {chooseDifficulty && (
          <Modal onClose={handleDifficulty}>
            <div className="flex flex-col">
              <button
                onClick={() => handleStart('easy')}
                className="py-3 px-5 text-lg mb-5 rounded-2xl text-white bg-green-500"
              >
                EASY
              </button>
              <button
                onClick={() => handleStart('medium')}
                className="py-3 px-5 text-lg mb-5 text-white rounded-2xl bg-orange-400"
              >
                MEDIUM
              </button>
              <button
                onClick={() => handleStart('hard')}
                className="py-3 px-5 text-lg mb-5 text-white rounded-2xl bg-red-600 "
              >
                AI(Minimax algorithm)
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectPlayers && <SelectPlayers onClose={handleSelectPlayers} />}
      </AnimatePresence>
      <div className="flex items-center mb-20">
        <h1 className="text-3xl text-white mr-10">Select Game</h1>
        <div className="relative flex flex-col">
          <Icon
            url={scoreIcon}
            className="absolute -top-12 right-0 mx-auto w-24 h-24"
          />
          <span className="py-2 px-7 inline-block bg-primary_purple text-white border-2 border-white rounded-full">
            100
          </span>
        </div>
      </div>
      <Icon className="absolute -bottom-12 right-0" url={gamePadImg} />

      <motion.ul
        variants={{
          hidden: {},
          visible: {
            x: 0,
            transition: { staggerChildren: 0.3 },
          },
        }}
        className={classes.modes}
      >
        <Mode
          onClick={handleDifficulty}
          icon={robotImg}
          text="Single Player"
          theme="yellow"
        />
        <Mode
          onClick={handleSelectPlayers}
          icon={multiplayerImg}
          text="Two Players"
          theme="purple"
        />
        <Mode icon={marketImg} text="Market Place" theme="blue" />
      </motion.ul>
    </motion.div>
  );
}
