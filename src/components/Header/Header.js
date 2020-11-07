import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Header = ({
  cols,
  flags,
  handleSetMines,
  mines,
  rows,
  setCols,
  setRows
}) => {
  return (
    <div className="header">
      <div className="flags led-panel box">{flags}</div>
      <div className="settings">
        <div className="custom">
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
        </div>
      </div>

      <div
        className="reset box"
        onMouseDown={event => {
          event.target.innerHTML = '😮';
          console.log('onmousedown');
        }}
        onMouseUp={event => {
          event.target.innerHTML = '🙂';
          console.log('onMouseUp');
        }}>
        🙂
      </div>
      <div className="timer led-panel box">000</div>
    </div>
  );
};

Header.propTypes = {
  cols: PropTypes.number,
  flags: PropTypes.number,
  handleSetMines: PropTypes.func.isRequired,
  mines: PropTypes.number,
  rows: PropTypes.number,
  setCols: PropTypes.func.isRequired,
  setMines: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired
};

export default Header;
