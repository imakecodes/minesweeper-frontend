import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Header = ({
  cols,
  flags,
  handleCreateNewGame,
  handleSetMines,
  mines,
  rows,
  setCols,
  setRows,
  setUpdateDummyBoard
}) => {
  return (
    <div className="header">
      <div className="settings">
        <input
          className="box"
          onChange={event => setRows(parseInt(event.target.value))}
          type="number"
          value={rows}
        />
        <input
          className="box"
          onChange={event => setCols(parseInt(event.target.value))}
          type="number"
          value={cols}
        />
        <input
          className="box"
          onChange={event => handleSetMines(event)}
          type="number"
          value={mines}
        />
        <button
          className="button box"
          onClick={() => setUpdateDummyBoard(true)}>
          Apply
        </button>
      </div>
      <div className="canvas">
        <div className="flags led-panel box">{flags}</div>
        <div
          className="reset box"
          onMouseDown={event => {
            event.target.innerHTML = '😮';
          }}
          onMouseUp={event => {
            event.target.innerHTML = '🙂';
            handleCreateNewGame(event);
          }}>
          🙂
        </div>
        <div className="timer led-panel box">000</div>
      </div>
    </div>
  );
};

Header.propTypes = {
  cols: PropTypes.number,
  flags: PropTypes.number,
  handleCreateNewGame: PropTypes.func.isRequired,
  handleSetMines: PropTypes.func.isRequired,
  mines: PropTypes.number,
  rows: PropTypes.number,
  setCols: PropTypes.func.isRequired,
  setMines: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
  setUpdateDummyBoard: PropTypes.func.isRequired
};

export default Header;
