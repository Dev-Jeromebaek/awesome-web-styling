// Data for Pie Chart
const optionSimplePie = {
  donut: true,
  donutWidth: 120,
  donutSolid: false,
  startAngle: 90,
  showLabel: true,
};

const optionDonutPie = data => {
  let sum = 0;
  data.series.forEach(function(value) {
    sum += value.value;
  });
  return {
    donut: true,
    donutWidth: 60,
    donutSolid: false,
    startAngle: 90,
    showLabel: true,
    labelInterpolationFnc: function(value) {
      return Math.round((value / sum) * 100) + '%';
    },
  };
};

const drawListenerPie = {
  draw: function(data) {
    if (data.type === 'slice') {
      // Get the total path length in order to use for dash array animation
      let pathLength = data.element._node.getTotalLength();

      // Set a dasharray that matches the path length as prerequisite to animate dashoffset
      data.element.attr({
        'stroke-dasharray': pathLength + 'px ' + pathLength + 'px',
      });

      // Create animation definition while also assigning an ID to the animation for later sync usage
      let animationDefinition = {
        'stroke-dashoffset': {
          id: 'anim' + data.index,
          dur: (500 * data.value) / data.totalDataSum,
          from: -pathLength + 'px',
          to: '0px',
          // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
          fill: 'freeze',
        },
      };

      // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
      if (data.index !== 0) {
        animationDefinition['stroke-dashoffset'].begin =
          'anim' + (data.index - 1) + '.end';
      }

      // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
      data.element.attr({
        'stroke-dashoffset': -pathLength + 'px',
      });

      // We can't use guided mode as the animations need to rely on setting begin manually
      // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
      data.element.animate(animationDefinition, false);

      // add (naive) bounce
      if (data.endAngle === 360) {
        let index = data.index;
        let dur = (1000 * data.value) / data.totalDataSum / 2;
        let from = 0;
        let to = -pathLength / 3;

        for (let i = 0; i < 4; i++) {
          data.element.animate(
            {
              'stroke-dashoffset': {
                id: 'anim' + (index + 1),
                dur: dur,
                from: from + 'px',
                to: to + 'px',
                fill: 'freeze',
                begin: 'anim' + index + '.end',
              },
            },
            false,
          );

          index++;
          dur /= 1.75;

          let t = from;
          from = to;
          to = t / 2.5;
        }
      }
    }
  },
};

const createListenerPie = {
  create: function(data) {
    if (data.type === 'slice') {
      // Get the total path length in order to use for dash array animation
      let pathLength = data.element._node.getTotalLength();

      // Set a dasharray that matches the path length as prerequisite to animate dashoffset
      data.element.attr({
        'stroke-dasharray': pathLength + 'px ' + pathLength + 'px',
      });

      // Create animation definition while also assigning an ID to the animation for later sync usage
      let animationDefinition = {
        'stroke-dashoffset': {
          id: 'anim' + data.index,
          dur: (500 * data.value) / data.totalDataSum,
          from: -pathLength + 'px',
          to: '0px',
          // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
          fill: 'freeze',
        },
      };

      // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
      if (data.index !== 0) {
        animationDefinition['stroke-dashoffset'].begin =
          'anim' + (data.index - 1) + '.end';
      }

      // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
      data.element.attr({
        'stroke-dashoffset': -pathLength + 'px',
      });

      // We can't use guided mode as the animations need to rely on setting begin manually
      // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
      data.element.animate(animationDefinition, false);

      // add (naive) bounce
      if (data.endAngle === 360) {
        let index = data.index;
        let dur = (1000 * data.value) / data.totalDataSum / 2;
        let from = 0;
        let to = -pathLength / 3;

        for (let i = 0; i < 4; i++) {
          data.element.animate(
            {
              'stroke-dashoffset': {
                id: 'anim' + (index + 1),
                dur: dur,
                from: from + 'px',
                to: to + 'px',
                fill: 'freeze',
                begin: 'anim' + index + '.end',
              },
            },
            false,
          );

          index++;
          dur /= 1.75;

          let t = from;
          from = to;
          to = t / 2.5;
        }
      }
    }
  },
};

module.exports = {
  optionSimplePie,
  optionDonutPie,
  drawListenerPie,
  createListenerPie,
};
