import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';

import classes from '../GameScreen.module.scss';

const Board: React.FC<{ board: any[] }> = ({ board }) => {
  const activeIcons = useSelector((state: RootState) => state.menu);

  console.log(activeIcons);
  console.log(board);
  return (
    <ul className={classes.board}>
      {board.map((row: [], rowIndex: number) => {
        return (
          <li key={rowIndex}>
            <ul className="flex">
              {row.map((col: any, colIndex: number) => {
                return (
                  <li key={colIndex}>
                    <button
                      className={`p-2 mr-3 mb-5 bg-green-500 rounded-3xl flex`}
                    >
                      <img
                        className="w-16 h-16 rounded-3xl"
                        src={activeIcons['X']}
                        alt="icon"
                      />
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
