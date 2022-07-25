import React from "react";
import "../components/BaseGrid.css";
import { useRef, useEffect, useState } from "react";
import Cell from "../components/Cell";

class CellInfo {
  id = 0;
  top = 0;
  left = 0;
  cell = 0;

  constructor(id = 0, top = 0, left = 0, cell = 0) {
    this.id = id;
    this.top = top;
    this.left = left;
    this.cell = cell;
  }
}

const MAP_COLS = 8;
const MAP_ROWS = 7;

document.documentElement.style.setProperty("--grid-cols", MAP_COLS);
document.documentElement.style.setProperty("--grid-rows", MAP_ROWS);

const BaseGrid = () => {
  // const matrix = [
  //   [
  //     [1, 2, 3],
  //     [1, 2, 3],
  //     [1, 2, 3],
  //   ],
  // ];
  // const [rows, setRows] = useState([
  //   ...new Array(5)
  //     .fill(0)
  //     .map((_, i) => [
  //       ...new Array(5)
  //         .fill(0)
  //         .map((_, j) => new CellInfo(0, 0, 0, (j + 1) * (i + 1))),
  //     ]),
  // ]);

  // const matrix = [
  //     1,2,3,4,5,6,7...
  // ];
  const [rows, setRows] = useState([
    ...new Array(MAP_ROWS * MAP_COLS).fill(0).map((_, i) => new CellInfo(i)),
  ]);
  const [turn, setTurn] = useState(1);
  const [winner, seTWinnner] = useState(0);

  //const rows = [...new Array(5).fill([...new Array(5).fill(new CellInfo())])];

  // for (let i = 0; i < 5; i++) {
  //   const row = [];
  //   for (let j = 0; j < 6; j++) {
  //     row.push(0);
  //   }
  //   rows.push(row);
  // }

  /**
   * @param {CellInfo} e
   */
  const topBorderClickHandler = (e) => {
    const selectedRow = rows.find((row) => row.id === e.id);
    selectedRow.top = turn;
    setRows([...rows]);
    checkWin();
  };
  /**
   *
   * @param {cellInfo} e
   */
  const leftBorderClickHandler = (e) => {
    const selectedRow = rows.find((row) => row.id === e.id);
    selectedRow.left = turn;
    setRows([...rows]);
    checkWin();
  };

  const checkWin = () => {
    let isWinFoundFlag = false;
    for (let i = 0; i < rows.length - MAP_ROWS; i++) {
      if ((i + 1) % MAP_COLS === 0) continue;
      const rightCell = rows[i + 1];
      const bottomCell = rows[i + MAP_COLS];
      const cell = rows[i];

      //  i  [*]  -> i + 1
      // [*]  -   ->

      if (
        rightCell.left &&
        cell.left &&
        cell.top &&
        bottomCell.top &&
        cell.cell === 0
      ) {
        cell.cell = turn;
        isWinFoundFlag = true;
      }
    }

    const gameOverCount = (MAP_COLS - 1) * (MAP_ROWS - 1);
    if (rows.filter((row) => row.cell !== 0).length === gameOverCount) {
      const onePlayer = rows.filter((row) => row.cell === 1).length;
      const twoPlayer = rows.filter((row) => row.cell === 2).length;
      seTWinnner(onePlayer > twoPlayer ? 1 : 2);
      return;
    }
    if (!isWinFoundFlag) setTurn(turn === 1 ? 2 : 1);
  };

  return (
    <>
      <label>turn : {turn}</label>
      {Boolean(winner) && <label>winner : {winner}</label>}
      
      <div className="baseGrid">
        {rows.map((val, i) => (
          <Cell
            key={i}
            cellInfo={val}
            onTopBorderClick={topBorderClickHandler}
            onLeftBorderClick={leftBorderClickHandler}
            ignoreTop={(i + 1) % MAP_COLS === 0}
            ignoreLeft={i >= rows.length - MAP_COLS}
          />
        ))}
      </div>

    </>
  );
};
export default BaseGrid;
