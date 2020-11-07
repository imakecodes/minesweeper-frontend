import React, { useState, useEffect } from 'react';

import { Board, Header } from 'components';
import { GameService } from 'services';

const gameClient = new GameService();

function App() {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [mines, setMines] = useState(5);
  const [flags, setFlags] = useState(5);
  const [mounted, setMounted] = useState(false);
  const [dummyBoard, setDummyBoard] = useState([]);
  const [updateDummyBoard, setUpdateDummyBoard] = useState(true);

  const handleSetRows = value => {
    // TODO can't be less than 3
    setRows(value);
    setUpdateDummyBoard(true);
  };

  const handleSetCols = value => {
    // TODO can't be less than 3
    setCols(value);
    setUpdateDummyBoard(true);
  };

  const generateDummyBoard = () => {
    const board = [];

    for (let row = 0; row < rows; row++) {
      board.push(
        Array(cols)
          .join(0)
          .split(0)
      );
    }

    setDummyBoard(board);
  };

  const handleSetMines = event => {
    // TODO can't be less than 1
    setMines(parseInt(event.target.value));
    setFlags(parseInt(event.target.value));
    generateDummyBoard();
  };

  useEffect(() => {
    function bootstrap() {
      setMounted(true);
      generateDummyBoard();
    }

    if (!mounted) {
      bootstrap();
    }

    if (updateDummyBoard) {
      setUpdateDummyBoard(false);
      generateDummyBoard();
    }
  });

  const handleCellClick = (row, col) => {
    const cell = document.getElementById(`cell_${row}_${col}`);
    if (cell.classList.contains('flagged')) {
      return;
    }

    if (!cell.classList.contains('revealed')) {
      cell.classList.add('revealed');
    }
  };

  const handleCellContextMenu = (event, row, col) => {
    event.preventDefault();
    const cell = document.getElementById(`cell_${row}_${col}`);
    if (cell.classList.contains('revealed')) {
      return;
    }

    if (cell.classList.contains('flagged')) {
      cell.classList.remove('flagged');
    } else {
      cell.classList.add('flagged');
    }
  };

  const handleCreateNewGame = event => {
    gameClient
      .createNewGame(rows, cols, mines)
      .then(response => console.log(response));
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="app">
      <div className="canvas">
        <Header
          cols={cols}
          flags={flags}
          handleCreateNewGame={handleCreateNewGame}
          handleSetMines={handleSetMines}
          mines={mines}
          rows={rows}
          setCols={handleSetCols}
          setMines={setMines}
          setRows={handleSetRows}
        />
        <Board
          cols={cols}
          dummyBoard={dummyBoard}
          handleCellClick={handleCellClick}
          handleCellContextMenu={handleCellContextMenu}
          rows={rows}
        />
      </div>
    </div>
  );
}

export default App;
