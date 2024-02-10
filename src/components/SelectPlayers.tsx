import { useDispatch, useSelector } from 'react-redux';
import Modal from './UI/Modal';
import { RootState } from '../store';
import { FormEvent, useState } from 'react';

import { sceneActions } from '../store/scene-slice';
import { gameSliceActions } from '../store/game-slice';

interface SelectPlayersType {
  onClose: () => void;
}

export default function SelectPlayers(props: SelectPlayersType) {
  const dispatch = useDispatch();
  const icons = useSelector((state: RootState) => state.menu);
  const players = useSelector((state: RootState) => state.game.players);

  const [playersObj, setPlayersObj] = useState({ ...players });

  function handlePlayerNames(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setPlayersObj((prevObj: any) => {
      return {
        ...prevObj,
        [id]: value,
      };
    });
  }

  function handleStart(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(gameSliceActions.setPlayers(playersObj));
    dispatch(gameSliceActions.switchGameMode('multiplayer'));
    dispatch(sceneActions.gameMode());
  }

  return (
    <Modal onClose={props.onClose}>
      <form onSubmit={handleStart}>
        <div className="relative flex flex-col mb-7">
          <label
            className="absolute right-1 top-0 bottom-0 my-auto h-fit text-2xl w-fit text-white"
            htmlFor="X"
          >
            <img className="w-10 h-10" src={icons['X']} alt="X" />
          </label>
          <input
            className="px-4 py-2 pr-11 text-lg focus:outline-none bg-transparent border-2 border-white rounded-xl text-white"
            id="X"
            type="text"
            value={playersObj['X']}
            onChange={handlePlayerNames}
          />
        </div>
        <div className="relative flex flex-col mb-5">
          <label
            className="absolute right-1 top-0 bottom-0 my-auto h-fit text-2xl w-fit text-white"
            htmlFor="O"
          >
            <img className="w-10 h-10" src={icons['O']} alt="O" />
          </label>
          <input
            className="px-4 py-2 pr-11 text-lg focus:outline-none bg-transparent border-2 border-white rounded-xl text-white"
            id="O"
            type="text"
            value={playersObj['O']}
            onChange={handlePlayerNames}
          />
        </div>
        <button className="px-4 py-2 text-white bg-secondary_purple rounded-xl md:hover:scale-110 duration-300">
          Start
        </button>
      </form>
    </Modal>
  );
}
