import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// ChartJS.defaults.color = "#ffffff";
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ userData }) => {
  const pieBackgroundColor = {
    id: "pieBackgroundColor",
    beforeDraw: (chart) => {
      const { ctx, width, height } = chart;
      ctx.save();
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    },
  };

  const data = {
    labels: ["Active Task", "Completed Task", "Not Completed Task"],
    datasets: [
      {
        data: [
          Number(userData.activeTodo),
          Number(userData.completedStatus),
          Number(userData.notCompletedStatus),
        ],
        backgroundColor: ["#4CAF50", "#F44336", "#2196F3"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "300px", margin: "auto", background: "transparent" }}>
      <Pie data={data} plugins={[pieBackgroundColor]} />
    </div>
  );
};

export default PieChart;
