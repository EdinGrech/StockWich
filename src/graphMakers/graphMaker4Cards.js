new Chart(document.getElementById("chartjs-line"), {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [{
        label: "2022 MT(€)",
        fill: true,
        backgroundColor: "transparent",
        borderColor: "#007bff",
        data: [62.00, 61.92, 63.54, 62.51, 61.97, 61.90, 61.68, 61.90, 63.36, 62.95, 62.95,]
      }, {
        label: "2021 MT(€)",
        fill: true,
        backgroundColor: "transparent",
        borderColor: "#adb5bd",
        borderDash: [4, 4],
        data: [53.03, 51.46, 55.71, 55.58, 54.77, 56.35, 57.33, 57.45, 60.04, 62.76, 62.50, 62.26]
      }]
    },
    options: {
      scales: {
        xAxes: [{
          reverse: true,
          gridLines: {
            color: "rgba(0,0,0,0.0.05)"
          }
        }],
        yAxes: [{
          borderDash: [5, 5],
          gridLines: {
            color: "rgba(0,0,0,0)",
            fontColor: "#fff"
          }
        }]
      }
    }
  });

  new Chart(document.getElementById("chartjs-line1"), {
    type: "doughnut",
      data: {
        labels: ["Bread", "Vegrables", "Cheese", "Condoments"],
        datasets: [{
          data: [260, 125, 146, 54],
          backgroundColor: [
            window.theme.primary,
            window.theme.success,
            window.theme.warning,
            "#dee2e6"
          ],
          borderColor: "transparent"
        }]
      },
      options: {
        maintainAspectRatio: false,
        cutoutPercentage: 65,
      }
  });

  new Chart(document.getElementById("chartjs-line2"), {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [{
        label: "2022 EU(€)",
        fill: true,
        backgroundColor: "transparent",
        borderColor: "#007bff",
        data: [330.91, 344.31, 441.35, 457.76, 494.18, 434.93, 376.32, 378.06, 422.11]
      }, {
        label: "2021 EU(€)",
        fill: true,
        backgroundColor: "transparent",
        borderColor: "#adb5bd",
        borderDash: [4, 4],
        data: [237.60, 239.25, 229.55, 234.55, 244.80	, 237.05, 248.97, 275.68, 287.14, 305.68, 332.03, 333.52]
      }]
    },
    options: {
      scales: {
        xAxes: [{
          reverse: true,
          gridLines: {
            color: "rgba(0,0,0,0.0.05)"
          }
        }],
        yAxes: [{
          borderDash: [5, 5],
          gridLines: {
            color: "rgba(0,0,0,0)",
            fontColor: "#fff"
          }
        }]
      }
    }
  });
