// Data for Line Chart
const optionsLine = {
  showArea: false,
  height: '245px',
  axisX: {
    showGrid: false,
  },
  lineSmooth: true,
  showLine: true,
  showPoint: true,
  fullWidth: true,
  chartPadding: {
    right: 30,
  },
};
const optionsArea = {
  low: 0,
  high: 800,
  showArea: true,
  height: '245px',
  axisX: {
    showGrid: true,
  },
  lineSmooth: true,
  showLine: true,
  showPoint: true,
  fullWidth: true,
  chartPadding: {
    right: 50,
  },
};
const responsiveLine = [
  [
    'screen and (min-width:1680px)',
    {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function(value) {
          console.log(value);
          return value;
        },
      },
    },
  ],
  [
    'screen and (max-width: 1680px) and (min-width: 550px)',
    {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function(value) {
          if (value.indexOf(':') > -1) {
            const sliceValue =
              value
                .split('~')[1]
                .split(' ')[2]
                .split(':')[0] + '시';
            return sliceValue;
          } else {
            return value;
          }
        },
      },
    },
  ],
  [
    'screen and (max-width: 550px)',
    {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function(value) {
          if (value.indexOf(':') > -1) {
            const sliceValue =
              value
                .split('~')[1]
                .split(' ')[2]
                .split(':')[0] + '시';
            return sliceValue;
          } else {
            return value;
          }
        },
      },
    },
  ],
];

const createListenerLine = {
  // draw: function(data) {
  create: function(data) {
    if (data.type === 'line' || data.type === 'area') {
      data.element.animate({
        d: {
          begin: 600 * data.index,
          dur: 600,
          from: data.path
            .clone()
            .scale(1, 0)
            .translate(0, data.chartRect.height())
            .stringify(),
          to: data.path.clone().stringify(),
          // easing: Chartist.Svg.Easing.easeOutQuint
        },
      });
    }
  },
};

const drawListenerLine = {
  draw: function(data) {
    if (data.type === 'line' || data.type === 'area') {
      data.element.animate({
        d: {
          begin: 600 * data.index,
          dur: 600,
          from: data.path
            .clone()
            .scale(1, 0)
            .translate(0, data.chartRect.height())
            .stringify(),
          to: data.path.clone().stringify(),
          // easing: Chartist.Svg.Easing.easeOutQuint
        },
      });
    }
  },
};

module.exports = {
  optionsLine,
  optionsArea,
  responsiveLine,
  drawListenerLine,
  createListenerLine,
};
