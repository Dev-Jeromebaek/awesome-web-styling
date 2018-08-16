const chartDataSet = (graphDataInfo, setCycle, cycleTitle) => {
  const { graphDataList, graphType, baseType, dataType } = graphDataInfo;
  if (graphDataList.length === 0) {
    return 'non Data';
  } else {
    const names =
      graphType.graphSubType.code === 'PIE_GRAPH'
        ? graphDataList.map(info => {
            return info.pieName;
          })
        : [['X: ' + baseType.title], [`Y: ${dataType.title} (단위: 1000)`]];
    const types = ['info', 'danger', 'warning', 'grape', 'grass', 'sea'];

    let tempArr = [];
    let pieLabelArr = [].concat(graphDataList);
    let labelArr = [].concat(graphDataList);

    let newArr = [];
    if (graphDataList.length < 10) {
      for (let i = 0; i < graphDataList.length; i++) {
        newArr.push(labelArr.shift());
      }
    } else {
      for (let i = 0; i < 10; i++) {
        newArr.push(labelArr.shift());
      }
    }

    const labels =
      graphType.graphSubType.code !== 'PIE_GRAPH'
        ? newArr.map((info, index) => {
            tempArr.push({ meta: info.dataX, value: info.dataY });
            return info.dataX;
          })
        : pieLabelArr.map(info => {
            tempArr.push({ meta: info.pieName, value: info.count });
            return '';
          });

    const series =
      graphType.graphSubType.code === 'BAR_GRAPH'
        ? tempArr.map((arr, index) => {
            let newArr = [];
            for (let j = 0; j < tempArr.length; j++) {
              newArr.push(index === j ? arr : undefined);
            }
            return newArr;
          })
        : tempArr;
    return {
      cycleTime: setCycle,
      minutes: 0,
      data: {
        labels: labels,
        series: series,
      },
      legend: {
        names: names,
        types: types,
      },
      cycleTitle: cycleTitle,
    };
  }
};

module.exports = {
  chartDataSet,
};
