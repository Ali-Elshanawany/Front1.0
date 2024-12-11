import { getSalesByMonth } from "../Data.js";
// import gradient from 'chartjs-plugin-gradient';
const dataValues = getSalesByMonth();
const ctx = document.getElementById("myChart").getContext("2d");

// * Find the highest value
const maxValue = Math.max(...dataValues);

// * Assign Diffrent Color For The Highest Value
const backgroundColors = dataValues.map(
    (value) => (value === maxValue ? "red" : "blue") // * Red for the highest, blue for others
);


// line Customize
// const config = {
//     type: "line",
//     data: {
//         labels: [
//             "Jan",
//             "Feb",
//             "Mar",
//             "Apr",
//             "May",
//             "June",
//             "July",
//             "Aug",
//             "Sep",
//             "Oct",
//             "Nov",
//             "Dec",
//         ],
//         datasets: [
//             {
//                 data: dataValues,
//                 backgroundColor: gradient,
//                 borderColor: "black",
//                 borderWidth: 2,
//                 tension: 0.4,
//                 fill: true,
//                 pointBorderColor: "white",
//                 pointBorderWidth: 2,
//                 pointRadius: 6, // Point size
//                 pointHoverRadius: 8, // Larger size on hover
//             },
//         ],
//     },
//     options: {
//         animation: {
//             duration: 2000, // 2 seconds for animation
//             easing: "easeOutQuart", // Smooth easing effect
//         },
//         responsive: true, // * Ensures the chart adjusts to the container size
//         plugins: {
//             tooltip: {
//                 enabled: true,
//                 callbacks: {
//                     label: function (tooltipItem) {
//                         return `Month: ${tooltipItem.label}, Sales: ${tooltipItem.raw}`;
//                     },
//                 },
//             },
//             legend: false, // Keep legend disabled as before
//         },
//         scales: {
//             y: {
//                 beginAtZero: true,
//                 grid: {
//                     color: "rgba(0, 0, 0, 0.1)", // Light grid lines
//                 },
//             },
//         },
//     },
// };

const config = {
    type: "bar",
    data: {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        datasets: [
            {
                data: dataValues,
                backgroundColor: backgroundColors,
                borderColor: "black",
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                gradient: {
                    backgroundColor: {
                      axis: 'y',
                      colors: {
                        0: 'red',
                        50: 'yellow',
                        100: 'green'
                      }
                    },
                    borderColor: {
                      axis: 'x',
                      colors: {
                        0: 'black',
                        1: 'white',
                        2: 'black',
                        3: 'white'
                      }
                    }
                  },
            },
        ],
    },
    options: {
        animation: {
            duration: 2000, // 2 seconds for animation
            easing: "easeOutQuart", // Smooth easing effect
        },
        responsive: true, // * Ensures the chart adjusts to the container size
        plugins: {
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (tooltipItem) {
                        return `Month: ${tooltipItem.label}, Sales: ${tooltipItem.raw}`;
                    },
                },
            },
            legend: false, 
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: "rgba(0, 0, 0, 0.1)", // Light grid lines
                },
            },
        },
    },
};






const chart = new Chart(ctx, config);

// * Without This Action The Chart Won't be Responsive
window.addEventListener("resize", () => {
    chart.resize();
});
