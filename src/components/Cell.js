import React from "react";
import "./Cell.css";

const Cell = ({
  cellInfo,
  onTopBorderClick,
  onLeftBorderClick,
  ignoreTop,
  ignoreLeft,
  ...props
}) => {
  const topBorderClicked = (e) => {
    if (!cellInfo.top) onTopBorderClick(cellInfo);
  };

  const leftBorderClicked = (e) => {
    if (!cellInfo.left) onLeftBorderClick(cellInfo);
  };

  // const clickHandler = (e) => {
  //   let rect = e.target.getBoundingClientRect();
  //   let x = e.clientX - rect.left; //x position within the element.
  //   let y = e.clientY - rect.top;

  //   var height = e.target.clientHeight;
  //   var width = e.target.clientWidth;
  //   console.log(x, y, e.target.clientWidth, e.target.clientHeight);

  //   if (-1 < x && x < 5 && -1 < y && y < height + 1) {
  //     flag = 1;
  //     e.target.className = "mycell left-clicked";
  //     console.log("left", x, y);
  //   } else if (3 < x && x < width + 1 && -1 < y && y < 5) {
  //     flag = 2;
  //     e.target.className = "mycell top-clicked";
  //     console.log("top", x, y);
  //   } else if (3 < x && x < width + 1 && y > height - 1) {
  //     e.target.className = "mycell bottom-clicked";
  //     console.log("bottom", x, y);
  //     flag = 3;
  //   } else if (x > width - 3 && 3 < y && y < height + 1) {
  //     e.target.className = "mycell right-clicked";
  //     console.log("right", x, y);
  //     flag = 4;
  //   } else {
  //     console.log("nothing", x, y);
  //   }
  // };

  return (
    <div className="cell">
      <div className="dot"></div>
      <div
        className="top-border"
        style={{
          backgroundColor:
            cellInfo.top === 1 ? "red" : cellInfo.top === 2 ? "blue" : "",
          visibility: ignoreTop ? "hidden" : "",
        }}
        onClick={(e) => topBorderClicked(e)}
      ></div>
      <div
        className="left-border"
        style={{
          backgroundColor:
            cellInfo.left === 1 ? "red" : cellInfo.left === 2 ? "blue" : "",
          visibility: ignoreLeft ? "hidden" : "",
        }}
        onClick={(e) => leftBorderClicked(e)}
      ></div>
      <div
        className="middle"
        style={{ visibility: ignoreTop || ignoreLeft ? "hidden" : "" }}
      >
        {cellInfo.cell}
      </div>
    </div>
  );
};
export default Cell;
