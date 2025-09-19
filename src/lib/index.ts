export function generateSolvableBoard(size: number): boolean[] {
  // while (true) {
  //   let arr = generateRandomBoard(size);
  //   let toggles = generateToggleMatrix(size);
  //   let solution = solveLinearSystem(toggles, arr);
  //   if (solution != "unsolvable") {
  //     return arr;
  //   }
  // }
  let arr = generateBlankBoard(size);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (Math.random() < 0.5) {
        toggleSquare(arr, size, i, j);
      }
      // res.push(true);
    }
  }
  return arr;
}

export function toggleSquare(
  board: boolean[],
  size: number,
  x: number,
  y: number,
) {
  board[y * size + x] = !board[y * size + x];
  if (x != 0) {
    board[y * size + x - 1] = !board[y * size + x - 1];
  }
  if (x != size - 1) {
    board[y * size + x + 1] = !board[y * size + x + 1];
  }
  if (y != 0) {
    board[(y - 1) * size + x] = !board[(y - 1) * size + x];
  }
  if (y != size - 1) {
    board[(y + 1) * size + x] = !board[(y + 1) * size + x];
  }
}

// function generateRandomBoard(size: number): boolean[] {
//   let res: boolean[] = [];
//   for (let i = 0; i < size; i++) {
//     for (let j = 0; j < size; j++) {
//       res.push(Math.random() < 0.5);
//       // res.push(true);
//     }
//   }
//   return res;
// }

function generateBlankBoard(size: number): boolean[] {
  let res: boolean[] = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      res.push(false);
    }
  }
  return res;
}

export function solveLinearSystem(
  matrix: boolean[][],
  vector: boolean[],
): boolean[] | "unsolvable" {
  const size = matrix.length;
  let m = matrix;
  for (let [i, val] of vector.entries()) {
    m[i].push(val);
  }
  for (let i = 0; i < size; i++) {
    let trueIndex;
    for (let j = i; j < size; j++) {
      if (m[j][i]) {
        trueIndex = j;
        break;
      }
    }
    if (trueIndex == undefined) {
      for (let j = i; j < size; j++) {
        if (m[j].includes(true)) {
          console.log(
            "this system is not solvable. 1 in every " +
              Math.pow(2, size - i) +
              " random boards are solvable.",
          );
          return "unsolvable";
        }
      }
      // TODO find the solution with the least button presses.
      // console.log("this system is solvable " + Math.pow(2, size - i) + " ways.");
      break;
    }
    swapRows(m, i, trueIndex);
    for (let j = 0; j < size; j++) {
      if (i == j) continue; // don't add to self :)
      if (m[j][i]) {
        addRows(m, i, j);
      }
    }
  }

  let res: boolean[] = [];
  for (let i = 0; i < size; i++) {
    res.push(m[i][size]);
  }
  return res;
}

function swapRows(matrix: boolean[][], index1: number, index2: number) {
  const tmp = matrix[index1];
  matrix[index1] = matrix[index2];
  matrix[index2] = tmp;
}

function addRows(matrix: boolean[][], index1: number, index2: number) {
  for (let i = 0; i < matrix[index1].length; i++) {
    if (matrix[index1][i]) {
      // 1... flip the bit in index2
      matrix[index2][i] = !matrix[index2][i];
    }
  }
}

export function generateToggleMatrix(size: number): boolean[][] {
  let res: boolean[][] = [];
  for (let x1 = 0; x1 < size; x1++) {
    for (let y1 = 0; y1 < size; y1++) {
      let element: boolean[] = [];
      for (let x2 = 0; x2 < size; x2++) {
        for (let y2 = 0; y2 < size; y2++) {
          // probably could clean this up...
          if (x1 == x2 && (y1 == y2 - 1 || y1 == y2 || y1 == y2 + 1)) {
            element.push(true);
          } else if (y1 == y2 && (x1 == x2 - 1 || x1 == x2 || x1 == x2 + 1)) {
            element.push(true);
          } else {
            element.push(false);
          }
          // element.push("(" + x2 + "," + y2 + ")");
        }
      }
      res.push(element);
    }
  }
  return res;
}
