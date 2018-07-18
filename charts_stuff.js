Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.defaultFontFamily = 'Poiret One';
Chart.defaults.global.defaultFontStyle = 'bold'

var ctx = document.getElementById("canvas");
const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      data: [435, 321, 532, 801, 1231, 1098, 732, 321, 451, 482, 513, 397, 435, 321, 532, 801, 1231, 1098, 732, 321, 451, 482, 513, 397, 435, 321, 532, 801, 1231, 1098, 732, 321, 451, 482, 513, 397],
      backgroundColor: '#e63946',
    }
  ]
};

const opt = {
  responsive: false,
  legend: {
    display: false
  },
  elements: {
    line: {
      borderColor: '#e63946',
      borderWidth: 1,
    },
    point: {
      radius: 0
    }
  },
  tooltips: {
    enabled: false
  },
  scales: {
    yAxes: [
      {
        display: false
      }
    ],
    xAxes: [
      {
        display: false
      }
    ]
  }
};
const chart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: opt
});

const ctx2 = document.getElementById('canvas2').getContext('2d');
const chart1 = new Chart(ctx2, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [435, 321, 532, 801, 1231, 1098, 732, 321, 451, 482, 513, 397, 435, 321, 532, 801, 1231, 1098, 732, 321, 451, 482, 513, 397, 435, 321, 532, 801, 1231, 1098, 732, 321, 451, 482, 513, 397],
      }
    ]
  },
  options: {
    responsive: false,
    legend: {
      display: false
    },
    elements: {
      line: {
        borderColor: '#000000',
        borderWidth: 1
      },
      point: {
        radius: 0
      }
    },
    tooltips: {
      enabled: false
    },
    scales: {
      yAxes: [
        {
          display: false
        }
      ],
      xAxes: [
        {
          display: false
        }
      ]
    }
  }
});


const ctx3 = document.getElementById('canvas3').getContext('2d');
const chart2 = new Chart(ctx3, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [435, 321, 532, 801, 1231, 1098, 732, 321, 451, 482, 513, 397, 435, 321, 532, 801, 1231, 1098, 732, 321, 451, 482, 513, 397, 435, 321, 532, 801, 1231, 1098, 732, 321, 451, 482, 513, 397],
        backgroundColor: '#a8dadc'
      }
    ]
  },
  options: {
    responsive: false,
    legend: {
      display: false
    },
    elements: {
      line: {
        borderColor: '#a8dadc',
        borderWidth: 1
      },
      point: {
        radius: 0
      }
    },
    tooltips: {
      enabled: false
    },
    scales: {
      yAxes: [
        {
          display: false
        }
      ],
      xAxes: [
        {
          display: false
        }
      ]
    }
  }
});
