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
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Runtime: NextPage<{
  runtimeStats: any;
}> = ({ runtimeStats }) => {
  const currentDataPoints =
    runtimeStats[Object.keys(runtimeStats).sort().slice(-1)[0]];

  const formatDate = (seconds: number) => {
    return moment().startOf("day").seconds(seconds).format("mm:ss");
  };

  return (
    <>
      <p className={styles.description}>CI runtime (seconds) ↘</p>

      <p className={styles.latestValue}>
        7-point average:{" "}
        {formatDate(currentDataPoints.movingByDayAvgSuccessTime.seven)} | Daily:{" "}
        {formatDate(currentDataPoints.avgSuccessTime)}
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
          labels: Object.keys(runtimeStats).sort(),
          datasets: [
            {
              label: "7-point moving average",
              data: Object.keys(runtimeStats)
                .sort()
                .map(
                  (key) => runtimeStats[key].movingByDayAvgSuccessTime.seven
                ),
              borderColor: "#034efc",
            },
            {
              label: "Daily average",
              data: Object.keys(runtimeStats)
                .sort()
                .map((key) => runtimeStats[key].avgSuccessTime),
              borderColor: "#c7d3f0",
            },
          ],
        }}
      />
    </>
  );
};

export default Runtime;
