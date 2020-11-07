import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Board = ({ dummyBoard, handleCellClick, handleCellContextMenu }) => {
  return (
    <div className="board">
      {dummyBoard.map((cols, rowId) => (
        <div className="board-row" key={`row_${rowId}`}>
          {cols.map((col, colId) => (
            <div
              className="board-row-cell box"
              id={`cell_${rowId}_${colId}`}
              key={`cell_${rowId}_${colId}`}
              onClick={() => handleCellClick(rowId, colId)}
              onContextMenu={event =>
                handleCellContextMenu(event, rowId, colId)
              }>
              {' '}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

Board.propTypes = {
  cols: PropTypes.number.isRequired,
  dummyBoard: PropTypes.array.isRequired,
  handleCellClick: PropTypes.func.isRequired,
  handleCellContextMenu: PropTypes.func.isRequired,
  rows: PropTypes.number.isRequired
};

export default Board;
