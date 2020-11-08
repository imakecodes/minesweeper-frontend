import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Header = ({
  cols,
  elapsedTime,
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
        <div className="form-control">
          <label htmlFor="rows">Rows:</label>
          <input
            className="box"
            id="rows"
            onChange={event => setRows(event)}
            type="number"
            value={rows}
          />
        </div>
        <div className="form-control">
          <label htmlFor="cols">Columns:</label>
          <input
            className="box"
            id="cols"
            onChange={event => setCols(event)}
            type="number"
            value={cols}
          />
        </div>
        <div className="form-control">
          <label htmlFor="mines">Mines:</label>
          <input
            className="box"
            id="mines"
            onChange={event => handleSetMines(event)}
            type="number"
            value={mines}
          />
        </div>
        <div className="form-control">
          <button
            className="button box"
            onClick={() => setUpdateDummyBoard(true)}>
            Apply
          </button>
        </div>
      </div>
      <div className="header-actions">
        <div className="flags led-panel">{flags}</div>
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
        <div className="timer led-panel">{elapsedTime}</div>
      </div>
    </div>
  );
};

Header.propTypes = {
  cols: PropTypes.number,
  elapsedTime: PropTypes.string.isRequired,
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
