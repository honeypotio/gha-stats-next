import { NextPage } from "next";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import styles from "../../styles/Styles.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SuccessRate: NextPage<{
  successStats: any;
}> = ({ successStats }) => {
  const currentDataPoints =
    successStats[Object.keys(successStats).sort().slice(-1)[0]];

  return (
    <div style={{ width: "100%", minHeight: "600px" }}>
      <p className={styles.description}>CI success rate (%) ↗ </p>

      <p className={styles.latestValue}>
        7-point average:{" "}
        {Math.round(currentDataPoints.movingByDaySuccessRate.seven)} % | Daily:{" "}
        {Math.round(currentDataPoints.successRate)} %
      </p>

      <Line
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
            },
          },
        }}
        data={{
          labels: Object.keys(successStats).sort(),
          datasets: [
            {
              label: "7-point moving success rate",
              data: Object.keys(successStats)
                .sort()
                .map((key) => successStats[key].movingByDaySuccessRate.seven),
              borderColor: "#33a122",
            },
            {
              label: "Daily success rate",
              data: Object.keys(successStats)
                .sort()
                .map((key) => successStats[key].successRate),
              borderColor: "#c9e3c5",
            },
          ],
        }}
      />
    </div>
  );
};

export default SuccessRate;
