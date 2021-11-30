export const statChart = {
  type: "line",
  data: {
    labels: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"],
    datasets: [{
        label: "Number of Moons",
        lineTension: '0',
        backgroundColor: "rgba(54,73,93)",
        borderColor: "#36495d", 
        data: [0, 0, 1, 2, 79, 82, 27, 14],
      },
      {
        label: "Planetary Mass (relative to the Sun x 10^-6)",
        lineTension: '0',
        backgroundColor: "rgba(71, 183, 132)",
        borderColor: "#47b784",
        data: [0.166, 2.081, 3.003, 0.323, 954.792, 285.886, 43.662, 51.514],
      }
    ]
  },
  options: {
  }
};

export default statChart;