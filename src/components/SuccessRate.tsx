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
  return (
    <>
      <p className={styles.description}>CI success rate (%) ↗</p>

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
    </>
  );
};

export default SuccessRate;
