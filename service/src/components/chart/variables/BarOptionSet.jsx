// Data for Bar Chart
const optionsBar = {
  seriesBarDistance: 10,
  axisX: {
    showGrid: false,
  },
  axisY: {
    labelInterpolationFnc: function(value) {
      const sliceValue = (value / 1000).toFixed(1);
      return sliceValue;
    },
  },
  height: '245px',
};
const responsiveBar = [
  [
    'screen and (min-width:1680px)',
    {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function(value) {
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

const drawListenerBar = {
  draw: function(data) {
    if (data.type === 'bar') {
      data.element.animate({
        y2: {
          begin: 0,
          dur: 500,
          from: data.y1,
          to: data.y2,
        },
      });
    }
  },
};

const createListenerBar = {
  create: function(data) {
    if (data.type === 'bar') {
      data.element.animate({
        y2: {
          begin: 0,
          dur: 500,
          from: data.y1,
          to: data.y2,
        },
      });
    }
  },
};

module.exports = {
  optionsBar,
  responsiveBar,
  drawListenerBar,
  createListenerBar,
};
