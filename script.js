const Board = (() => {
  const table = new Array(3);
  for (let i = 0; i < 3; ++i) {
    table[i] = new Array(3);
  }

  const update = (row, col, val) => {
    table[Number(row)][Number(col)] = val;
  };

  const checkRow = (ind) => {
    for (let i = 1; i < 3; ++i) {
      if (table[ind][i] != table[ind][i - 1]) {
        return false;
      }
    }
    return table[ind][0] != undefined;
  };

  const checkCol = (ind) => {
    for (let i = 1; i < 3; ++i) {
      if (table[i][ind] != table[i - 1][ind]) {
        return false;
      }
    }
    return table[0][ind] != undefined;
  };

  const checkPrimDiag = () => {
    return (table[1][1] == table[2][2]) && (table[1][1] == table[0][0]) &&
        table[0][0] != undefined;
  };

  const checkSecDiag = () => {
    return (table[0][2] == table[1][1]) && (table[1][1] == table[2][0]) &&
        table[0][2] != undefined;
  };

  const checkFinished = () => {
    for (let i = 0; i < 3; ++i) {
      if (checkRow(i)) {
        return table[i][0];
      }
      if (checkCol(i)) {
        return table[0][i];
      }
    }

    if (checkPrimDiag()) {
      return table[0][0];
    }

    if (checkSecDiag()) {
      return table[0][2];
    }

    return 0;
  };

  const checkDraw = () => {
    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        if (table[i][j] == undefined) {
          return false;
        }
      }
    }

    return true;
  };

  const val = (row, col) => table[Number(row)][Number(col)];

  const reset = () => {
    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        table[i][j] = '';
      }
    }
  };

  return {update, checkFinished, val, reset, checkDraw};
})();

const DisplayController = (() => {
  const table = document.getElementById('table');

  const createTable = () => {
    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        const currCell = createCell(i, j);
        table.appendChild(currCell);
      }
    }
  };

  const createCell = (row, column) => {
    const cell = document.createElement('div');
    cell.className = 'cell unselectable';
    cell.id = row + '' + column;

    cell.addEventListener('click', () => {
      Game.move(row, column);
    });

    return cell;
  };

  const update = (row, column) => {
    const cell = document.getElementById(row + '' + column);
    cell.textContent = Board.val(row, column);
  };

  const winner = (player) => {
    const status = document.getElementById('status');
    status.innerHTML = '<h1>' + player.getName() + ' has won </h1>';
  };

  const draw = () => {
    const status = document.getElementById('status');
    status.innerHTML = '<h1>Draw</h1>';
  };

  const turn = (player) => {
    const status = document.getElementById('status');
    status.innerHTML = '<h1>' + player.getName() + '\'s turn</h1>';
  };

  return {createTable, update, winner, draw, turn};
})();

const Game = (() => {
  let currMove = 0;
  let finished = false;

  const start = () => {
    DisplayController.turn(player(currMove + 1));
    DisplayController.createTable();
  };

  const move = (row, column) => {
    if (!finished &&
        Board.val(row, column) != 'X' && Board.val(row, column) != 'O') {
      ++currMove;
      Board.update(row, column, letter(currMove));
      DisplayController.update(row, column);
      checkFinish();
    }
  };

  const letter = (move) => (move % 2 ? 'X' : 'O');

  const checkFinish = () => {
    const status = Board.checkFinished();
    const draw = Board.checkDraw();

    if (!status && !draw) {
      DisplayController.turn(player(currMove + 1));
    } else if (status) {
      DisplayController.winner(player(currMove));
      finished = true;
    } else {
      DisplayController.draw();
      finished = true;
    }
  };

  const player = (move) => (move % 2 ? player1 : player2);

  return {start, move};
})();

const Player = (user) => {
  const name = user;
  let wins = 0;

  const getName = () => name;

  const won = () => ++wins;

  const getWins = () => wins;

  return {getName, getWins, won};
};

const player1 = Player('John');
const player2 = Player('George');

Game.start();