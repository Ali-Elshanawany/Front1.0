import { getSalesByMonth } from "./Data.js";

const dataValues = getSalesByMonth();

// * Find the highest value
const maxValue = Math.max(...dataValues);

// * Assign Diffrent Color For The Highest Value
const backgroundColors = dataValues.map(
    (value) => (value === maxValue ? "red" : "blue") // * Red for the highest, blue for others
);

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
            },
        ],
    },
    options: {
        responsive: true, // * Ensures the chart adjusts to the container size
        plugins: {
            legend: false,
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
};

const ctx = document.getElementById("myChart").getContext("2d");
const chart = new Chart(ctx, config);

// * Without This Action The Chart Won't be Responsive
window.addEventListener("resize", () => {
    chart.resize();
});
