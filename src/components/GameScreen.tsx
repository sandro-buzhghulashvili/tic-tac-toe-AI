import { useSelector } from 'react-redux';

import { RootState } from '../store';
import Board from './UI/Board';

const initalBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameScreen() {
  const gameMode = useSelector((state: RootState) => state.game);

  let board = initalBoard;
  console.log(gameMode);
  return (
    <>
      <Board board={board} />
    </>
  );
}
