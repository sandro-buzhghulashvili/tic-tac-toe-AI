import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';

import classes from '../GameScreen.module.scss';
import { motion } from 'framer-motion';

const Board: React.FC<{
  board: any[];
  onSquareClick: (rowIndex: number, colIndex: number) => void;
}> = ({ board, onSquareClick }) => {
  const activeIcons = useSelector((state: RootState) => state.menu);

  return (
    <ul className={classes.board}>
      {board.map((row: any[], rowIndex: number) => {
        return (
          <li key={rowIndex}>
            <ul className="flex">
              {row.map((col: any, colIndex: number) => {
                const iconKey: 'X' | 'O' = col;
                return (
                  <li key={colIndex}>
                    <button
                      disabled={col}
                      onClick={() => onSquareClick(rowIndex, colIndex)}
                      className={`p-2 my-5 mx-2  ${
                        col ? 'bg-green-300' : 'bg-primary_gray'
                      } duration-300 rounded-3xl flex`}
                    >
                      {col ? (
                        <motion.img
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="w-16 h-16 rounded-3xl"
                          src={activeIcons[iconKey]}
                          alt="icon"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-3xl"></div>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export default Board;
