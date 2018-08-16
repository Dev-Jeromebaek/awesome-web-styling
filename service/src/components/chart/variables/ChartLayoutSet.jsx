const maxH = 1;
const initGrid = () => {
  gridSet = {
    tempArea: [],
    nextFillGrid: {
      x: 0,
      y: 0,
    },
    returnGrid: {
      w: 0,
      h: 1,
      x: 0,
      y: 0,
      maxH,
    },
  };
};

let gridSet = initGrid;

const newLine = widthSize => {
  gridSet.returnGrid.x = 0;
  gridSet.returnGrid.y = gridSet.nextFillGrid.y + 1;
  gridSet.nextFillGrid.x = gridSet.returnGrid.x + widthSize;
  gridSet.nextFillGrid.y = gridSet.returnGrid.y;
};

const setGridLayout = info => {
  const { code: graphType } = info.graphSubType;

  let { x, y } = gridSet.nextFillGrid;
  if (graphType === 'LINEAR_GRAPH') {
    // 2x1 크기일 경우
    gridSet.returnGrid.w = 2;
    if (x === 3) {
      // 들어갈 공간 x, 채울 공간 x
      newLine(2);
    } else if (x === 2) {
      // 들어갈 공간 x, 채울 공간 o
      gridSet.tempArea.push({
        x: gridSet.nextFillGrid.x,
        y: gridSet.nextFillGrid.y,
      });
      newLine(2);
    } else {
      // 들어갈 공간 o, 채울 공간 o
      gridSet.returnGrid.x = x;
      gridSet.nextFillGrid.x = gridSet.returnGrid.x + 2;
    }
  } else {
    // 1x1 크기일 경우
    gridSet.returnGrid.w = 1;
    if (gridSet.tempArea.length === 0) {
      // 채울 공간이 없는 경우
      if (x === 3) {
        // x: 0, y: y+1
        newLine(1);
      } else {
        // x: x+1, y: y
        gridSet.returnGrid.x = x;
        gridSet.returnGrid.y = y;
        gridSet.nextFillGrid.x = gridSet.returnGrid.x + 1;
      }
    } else {
      // 채울 공간이 있는 경우
      const area = gridSet.tempArea.shift();
      gridSet.returnGrid.x = area.x;
      gridSet.returnGrid.y = area.y;
    }
  }
  const returnValue = { ...gridSet.returnGrid };
  return returnValue;
};

module.exports = {
  setGridLayout,
  initGrid,
};
