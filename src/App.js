import React, { useState, useEffect } from 'react';

import { Board, Header } from 'components';
import { GameService } from 'services';

const gameClient = new GameService();

function App() {
  const [cols, setCols] = useState(10);
  const [dummyBoard, setDummyBoard] = useState([]);
  const [flags, setFlags] = useState(5);
  const [mines, setMines] = useState(5);
  const [rows, setRows] = useState(10);
  const [updateDummyBoard, setUpdateDummyBoard] = useState(true);
  const [activeGame, setActiveGame] = useState(null);

  const handleSetRows = event => {
    const value = parseInt(event.target.value);

    if (value == 0) {
      return;
    }

    setMaxMines();
    setRows(value);
  };

  const handleSetCols = event => {
    const value = parseInt(event.target.value);

    if (value == 0) {
      return;
    }

    setMaxMines();
    setCols(value);
  };

  const setMaxMines = () => {
    const matrixSize = rows * cols;
    if (mines > matrixSize) {
      setMines(matrixSize - 1);
    }
  };

  const generateDummyBoard = () => {
    setDummyBoard([]);
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
    const value = parseInt(event.target.value);
    if (value < 1 || value > 99) {
      return value;
    }
    const matrixSize = rows * cols;
    if (value >= matrixSize) {
      return value;
    }

    setMines(value);
  };

  useEffect(() => {
    function bootstrap() {
      setUpdateDummyBoard(false);
      handleCreateNewGame();
    }

    if (updateDummyBoard) {
      bootstrap();
    }

    if (activeGame && activeGame.win === true) {
      document.getElementsByClassName('reset')[0].innerHTML = '😎';

      // Search for all unrevealed squares to put the flag
      activeGame.board.map((row, rowId) =>
        row.map((col, colId) => {
          if (col === -1) {
            const cell = document.getElementById(`cell_${rowId}_${colId}`);
            cell.classList.add('flagged');
          }
        })
      );
    }

    if (activeGame && activeGame.win === false) {
      // search for all mines on board
      activeGame.board.map((row, rowId) =>
        row.map((col, colId) => {
          if (col === -1) {
            const cell = document.getElementById(`cell_${rowId}_${colId}`);
            cell.classList.add('mined');
          }
        })
      );
    }
  });

  const handleCellClick = (row, col) => {
    if (activeGame.status === 3 || activeGame.win === true) {
      return;
    }
    const cell = document.getElementById(`cell_${row}_${col}`);
    if (
      cell.classList.contains('flagged') ||
      cell.classList.contains('question')
    ) {
      return;
    }

    if (!cell.classList.contains('revealed')) {
      cell.classList.add('busy');
      gameClient.cellClick(row, col, activeGame.id).then(response => {
        cell.classList.add('revealed');
        cell.classList.remove('busy');

        if (response.active_game.board_progress[row][col] === 0) {
          cell.classList.add('empty');
        } else if (response.active_game.board_progress[row][col] > 0) {
          const points = `${response.active_game.board_progress[row][col]}`;
          cell.classList.add('point');
          cell.classList.add(`point-${points}`);
          cell.innerHTML = points;
        } else {
          cell.classList.add('mined');
          cell.classList.add('mined-red');
          document.getElementsByClassName('reset')[0].innerHTML = '👻';
        }

        response.active_game.board_progress.map((row, rowId) =>
          row.map((col, colId) => {
            const element = document.getElementById(`cell_${rowId}_${colId}`);
            if (element.classList.length > 2) {
              return;
            }

            if (col == '-') {
              return;
            }
            element.classList.add('revealed');
            element.classList.add('point');
            element.classList.add(`point-${col}`);
            if (col > 0) {
              element.innerHTML = col;
            }
          })
        );

        setActiveGame(response.active_game);
      });
    }
  };

  const handleCellContextMenu = (event, row, col) => {
    event.preventDefault();
    if (activeGame.status === 3) {
      return;
    }

    const cell = document.getElementById(`cell_${row}_${col}`);
    if (cell.classList.contains('revealed')) {
      return;
    }

    if (cell.classList.contains('question')) {
      cell.classList.remove('question');
    } else if (cell.classList.contains('flagged')) {
      cell.classList.remove('flagged');
      setFlags(flags + 1);
      cell.classList.add('question');
    } else if (flags > 0) {
      cell.classList.add('flagged');
      setFlags(flags - 1);
    }
  };

  const handleCreateNewGame = () => {
    if (rows < 3) {
      setRows(3);
    }

    if (cols < 3) {
      setCols(3);
    }

    gameClient.createNewGame(rows, cols, mines).then(response => {
      setActiveGame(response);
      setFlags(mines);
      document.getElementsByClassName('reset')[0].innerHTML = '🙂';
      generateDummyBoard();
    });
  };

  if (!activeGame) {
    return null;
  }

  return (
    <div className="app">
      <div className="app-col-spacer"> </div>
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
          setUpdateDummyBoard={setUpdateDummyBoard}
        />
        <Board
          cols={cols}
          dummyBoard={dummyBoard}
          handleCellClick={handleCellClick}
          handleCellContextMenu={handleCellContextMenu}
          rows={rows}
        />
      </div>
      <div className="app-col-spacer"> </div>
    </div>
  );
}

export default App;
