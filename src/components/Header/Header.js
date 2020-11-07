import React, { useState } from 'react';
import './styles.scss';

const difficulty = {
  custom: {
    rows: 10,
    cols: 10,
    mines: 5,
    flags: 5
  },
  beginner: {
    rows: 20,
    cols: 20,
    mines: 5,
    flags: 5
  },
  intermediate: {
    rows: 50,
    cols: 50,
    mines: 15,
    flags: 15
  },
  expert: {
    rows: 100,
    cols: 100,
    mines: 50,
    flags: 50
  }
};

const Header = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('beginner');
  const [rows, setRows] = useState(difficulty.beginner.rows);
  const [cols, setCols] = useState(difficulty.beginner.cols);
  const [mines, setMines] = useState(difficulty.beginner.mines);
  const [flags, setFlags] = useState(5);
  const [resetContent] = useState('🙂');

  const handleSetDifficulty = event => {
    setSelectedDifficulty(event.target.value);
    setRows(difficulty[event.target.value].rows);
    setCols(difficulty[event.target.value].cols);
    setMines(difficulty[event.target.value].mines);
    setFlags(difficulty[event.target.value].flags);
  };

  const handleSetMines = event => {
    setMines(parseInt(event.target.value));
    setFlags(parseInt(event.target.value));
  };

  return (
    <div className="header">
      <div className="flags led-panel box">{flags}</div>
      <div className="settings">
        {selectedDifficulty === 'custom' && (
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
        )}
        <select
          className="box"
          onChange={event => handleSetDifficulty(event)}
          value={selectedDifficulty}>
          <option value="custom">Custom</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </select>
      </div>

      <div className="reset box">{resetContent}</div>
      <div className="timer led-panel box">000</div>
    </div>
  );
};

export default Header;
