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

  const handleSetRows = value => {
    if (value < 3 || value > 99) {
      return;
    }
    setRows(value);
  };

  const handleSetCols = value => {
    if (value < 3 || value > 99) {
      return;
    }
    setCols(value);
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
      return;
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
          document.getElementsByClassName('reset')[0].innerHTML = '👻';
        }

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
