import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store';
import Board from './UI/Board';
import { useEffect, useState } from 'react';
import { gameSliceActions } from '../store/game-slice';
import Modal from './UI/Modal';
import { AnimatePresence, motion } from 'framer-motion';

import sadIcon from '../assets/icons/sad.png';
import winIcon from '../assets/icons/trophy.png';
import drawIcon from '../assets/icons/draw.png';
import { sceneActions } from '../store/scene-slice';

const initalBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveWinner(board: any[]): 'X' | 'O' | 'tie' | null {
  let winner: 'X' | 'O' | 'tie' | null = null;
  let boardIsFilled = true;

  const horizontalItems = [];
  const verticalItems = [];
  const primaryDiagonal = [];
  const secondaryDiagonal = [];
  for (let i = 0; i < board.length; i++) {
    horizontalItems.push(board[i]);
    primaryDiagonal.push(board[i][i]);
    const verticalArr = [];
    for (let j = 0; j < board.length; j++) {
      verticalArr.push(board[j][i]);
      if (i + j === board.length - 1) {
        secondaryDiagonal.push(board[i][j]);
      }
      if (!board[i][j]) {
        boardIsFilled = false;
      }
    }
    verticalItems.push(verticalArr);
  }

  let winnerSymbol = '';

  // const allEqual = (arr: any[]) => arr.every((item) => item && item === arr[0]);
  const allEqual = (arr: any[]): boolean => {
    let firstItem = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (!arr[i] || arr[i] !== firstItem) {
        return false;
      }
    }
    winnerSymbol = firstItem; // Set the winner symbol if all elements are equal
    return true;
  };

  const allItemsEqual = (arr: any[]) => arr.some(allEqual);

  if (
    allEqual(primaryDiagonal) ||
    allEqual(secondaryDiagonal) ||
    allItemsEqual(horizontalItems) ||
    allItemsEqual(verticalItems)
  ) {
    winner = winnerSymbol as 'X' | 'O';
  }

  if (boardIsFilled && !winner) {
    winner = 'tie';
  }

  return winner;
}

function deriveActivePlayer(turns: any) {
  let activePlayer = 'X';
  if (turns.length > 0 && turns[0].player === 'X') {
    activePlayer = 'O';
  }
  return activePlayer;
}

export default function GameScreen() {
  const turns = useSelector((state: RootState) => state.game.turns);
  const dispatch = useDispatch();
  const [activePlayer, setActivePlayer] = useState('X');
  const gameDifficulty = useSelector(
    (state: RootState) => state.game.difficulty
  );
  const gameMode = useSelector((state: RootState) => state.game.mode);
  const scoreboard = useSelector((state: RootState) => state.game.scoreboard);
  const activeIcons = useSelector((state: RootState) => state.menu);
  let players = undefined;
  if (gameMode === 'multiplayer') {
    players = useSelector((state: RootState) => state.game.players);
  }

  let activePlayerOnMultiplayerMode;

  if (players) {
    activePlayerOnMultiplayerMode = deriveActivePlayer(turns);
  }

  console.log(gameMode);

  let board: any[] = [...initalBoard.map((row) => [...row])];

  for (let turn of turns) {
    board[turn.square.row][turn.square.col] = turn.player;
  }

  let winner = deriveWinner(board);

  function easyModeAI() {
    const possibleTurns = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (!board[i][j]) {
          possibleTurns.push({
            player: 'O',
            square: { row: i, col: j },
          });
        }
      }
    }
    const randomTurn =
      possibleTurns[Math.floor(Math.random() * possibleTurns.length)];
    dispatch(gameSliceActions.handleTurn(randomTurn));
    setActivePlayer('X');
  }

  function mediumModeAI() {
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (!board[i][j]) {
          let boardCopy = [...board.map((row) => [...row])];
          boardCopy[i][j] = 'O';
          let score: any = oneLevelMinimax(boardCopy);
          if (score > bestScore) {
            bestScore = score;
            bestMove = { i, j };
          }
        }
      }
    }
    dispatch(
      gameSliceActions.handleTurn({
        player: 'O',
        square: { row: bestMove?.i, col: bestMove?.j },
      })
    );
    setActivePlayer('X');
  }

  function hardModeAI() {
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (!board[i][j]) {
          let boardCopy = [...board.map((row) => [...row])];
          boardCopy[i][j] = 'O';
          let score = minimax(boardCopy, 0, false);
          if (score > bestScore) {
            bestScore = score;
            bestMove = { i, j };
          }
        }
      }
    }
    dispatch(
      gameSliceActions.handleTurn({
        player: 'O',
        square: { row: bestMove?.i, col: bestMove?.j },
      })
    );
    setActivePlayer('X');
  }

  function minimax(board: any[], depth: number, maximizing: boolean): number {
    let result = deriveWinner(board);

    if (result) {
      if (result === 'O') {
        return 1;
      } else if (result === 'X') {
        return -1;
      } else {
        return 0;
      }
    }

    if (maximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
          if (!board[i][j]) {
            let boardCopy = [...board.map((row) => [...row])];
            boardCopy[i][j] = 'O';
            let score = minimax(boardCopy, depth + 1, false);
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let minScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
          if (!board[i][j]) {
            let boardCopy = [...board.map((row) => [...row])];
            boardCopy[i][j] = 'X';
            let score = minimax(boardCopy, depth + 1, true);
            minScore = Math.min(minScore, score);
          }
        }
      }
      return minScore;
    }
  }

  function oneLevelMinimax(board: any[]) {
    let result = deriveWinner(board);

    if (result === 'O') {
      return 1;
    } else {
      return -1;
    }
  }

  function handleSelect(rowIndex: number, colIndex: number) {
    // console.log(activePlayer);
    if (gameMode !== 'multiplayer') {
      dispatch(
        gameSliceActions.handleTurn({
          player: activePlayer,
          square: { row: rowIndex, col: colIndex },
        })
      );

      setActivePlayer('O');
    } else {
      let activePlayer = deriveActivePlayer(turns);
      dispatch(
        gameSliceActions.handleTurn({
          player: activePlayer,
          square: { row: rowIndex, col: colIndex },
        })
      );
    }
  }

  function restartHandler() {
    dispatch(gameSliceActions.resetGame());
    setActivePlayer('X');
  }

  function quitHandler() {
    dispatch(sceneActions.selectMode());
    dispatch(gameSliceActions.resetGame());
    dispatch(gameSliceActions.switchGameMode('single-player'));
    dispatch(gameSliceActions.resetPlayers());
    dispatch(gameSliceActions.resetScore());
  }

  useEffect(() => {
    if (gameMode !== 'multiplayer') {
      if (activePlayer === 'O' && turns.length !== 9 && !winner) {
        if (gameDifficulty === 'easy') {
          easyModeAI();
        } else if (gameDifficulty === 'medium') {
          mediumModeAI();
        } else if (gameDifficulty === 'hard') {
          hardModeAI();
        }
      }
    }
    if (winner && winner !== 'tie') {
      dispatch(gameSliceActions.updateScore(winner));
      console.log(winner);
    }
  }, [activePlayer, activePlayerOnMultiplayerMode]);

  return (
    <>
      <AnimatePresence>
        {winner && (
          <Modal onClose={restartHandler}>
            {players ? (
              winner !== 'tie' ? (
                <div className="px-5 text-center text-white">
                  <p className="text-xl mb-5 text-orange-500 font-bold">
                    {players[winner]} won!
                  </p>
                  <img src={winIcon} alt="sad" className="mb-10 inline-block" />
                  <div className="flex justify-between">
                    <button
                      onClick={quitHandler}
                      className="text-sm w-1/2 mr-5 py-2 px-5 rounded-full bg-orange-500"
                    >
                      Back
                    </button>
                    <button
                      onClick={restartHandler}
                      className="text-sm w-1/2 ml-5 py-2 px-5 rounded-full  bg-orange-500"
                    >
                      Again
                    </button>
                  </div>
                </div>
              ) : (
                <div className="px-5 text-center text-white">
                  <p className="text-xl mb-5 font-bold">Draw</p>
                  <div className="w-fit mx-auto mb-10 p-5 rounded-full bg-sky_blue">
                    <img src={drawIcon} alt="draw" />
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={quitHandler}
                      className="text-sm w-1/2 mr-5 py-2 px-5 rounded-full bg-sky_blue"
                    >
                      Back
                    </button>
                    <button
                      onClick={restartHandler}
                      className="text-sm w-1/2 ml-5 py-2 px-5 rounded-full  bg-sky_blue"
                    >
                      Again
                    </button>
                  </div>
                </div>
              )
            ) : winner === 'X' ? (
              <div className="px-5 text-center text-white">
                <p className="text-xl mb-5 text-orange-500 font-bold">
                  You won!
                </p>
                <img src={winIcon} alt="sad" className="mb-10 inline-block" />
                <div className="flex justify-between">
                  <button
                    onClick={quitHandler}
                    className="text-sm w-1/2 mr-5 py-2 px-5 rounded-full bg-orange-500"
                  >
                    Back
                  </button>
                  <button
                    onClick={restartHandler}
                    className="text-sm w-1/2 ml-5 py-2 px-5 rounded-full  bg-orange-500"
                  >
                    Again
                  </button>
                </div>
              </div>
            ) : winner === 'O' ? (
              <div className="px-5 text-center text-white">
                <p className="text-xl mb-5 text-red-600 font-bold">You Lose!</p>
                <img src={sadIcon} alt="sad" className="mb-10 inline-block" />
                <div className="flex justify-between">
                  <button
                    onClick={quitHandler}
                    className="text-sm w-1/2 mr-5 py-2 px-5 rounded-full bg-red-700"
                  >
                    Back
                  </button>
                  <button
                    onClick={restartHandler}
                    className="text-sm w-1/2 ml-5 py-2 px-5 rounded-full  bg-red-700"
                  >
                    Again
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-5 text-center text-white">
                <p className="text-xl mb-5 font-bold">Draw</p>
                <div className="w-fit mx-auto mb-10 p-5 rounded-full bg-sky_blue">
                  <img src={drawIcon} alt="draw" />
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={quitHandler}
                    className="text-sm w-1/2 mr-5 py-2 px-5 rounded-full bg-sky_blue"
                  >
                    Back
                  </button>
                  <button
                    onClick={restartHandler}
                    className="text-sm w-1/2 ml-5 py-2 px-5 rounded-full  bg-sky_blue"
                  >
                    Again
                  </button>
                </div>
              </div>
            )}
          </Modal>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ scale: 0.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-12 flex items-center justify-between">
          <div className="bg-gameboard_bg w-fit p-4 px-6 flex flex-col items-center rounded-2xl">
            <p className="text-white  max-w-16">
              {players ? players['X'] : 'You'}
            </p>
            <img src={activeIcons['X']} alt="Your icon" />
          </div>
          <div className="text-white">
            <span className="pr-5 border-r-2 border-white">
              {scoreboard['X']}
            </span>
            <span className="pl-5">{scoreboard['O']}</span>
          </div>
          <div className="bg-gameboard_bg w-fit p-4 px-6 flex flex-col items-center rounded-2xl">
            <p className="text-white text-center max-w-16">
              {players ? players['O'] : 'AI'}
            </p>
            <img src={activeIcons['O']} alt="Your icon" />
          </div>
        </div>
        <Board board={board} onSquareClick={handleSelect} />
      </motion.div>
    </>
  );
}
