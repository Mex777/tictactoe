const Board = (() => {
  const table = new Array(3);
  let moves = 0;
  for (let i = 0; i < 3; ++i) {
    table[i] = new Array(3);
  }

  const move = (row, col) => {
    ++moves;
    table[Number(row)][Number(col)] = (moves % 2 ? 'X' : 'O');
  };

  const checkRow = (ind) => {
    for (let i = 1; i < 3; ++i) {
      if (table[ind][i] != table[ind][i - 1]) {
        return false;
      }
    }
    return true;
  };

  const checkCol = (ind) => {
    for (let i = 1; i < 3; ++i) {
      if (table[i][ind] != table[i - 1][ind]) {
        return false;
      }
    }
    return true;
  };

  const checkPrimDiag = () => {
    return (table[1][1] == table[2][2]) && (table[1][1] == table[0][0]);
  };

  const checkSecDiag = () => {
    return (table[0][2] == table[1][1]) && (table[1][1] == table[2][0]);
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

    if (moves == 9) {
      return 'draw';
    }

    return 0;
  };

  const val = (row, col) => table[Number(row)][Number(col)];

  const reset = () => {
    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        table[i][j] = '';
      }
    }
  };

  return {move, checkFinished, val, reset};
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
    cell.className = 'cell';
    cell.id = row + '' + column;

    cell.addEventListener('click', () => {
      Board.move(row, column);
      cell.textContent = Board.val(row, column);
    });

    return cell;
  };

  return {createTable};
})();

const Game = (() => {
  DisplayController.createTable();
})();


