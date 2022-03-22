import type { NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";
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

import styles from "../styles/Home.module.css";
import {
  groupByDay,
  removeRawRuns,
  addCalculatedSuccessRateStats,
  addCalculatedRuntimeStats,
} from "../src/utils/stats";
import { fectchRuns } from "../src/utils/github";
import { deepClone } from "../src/utils/js";
import RepoInfo from "../src/components/RepoInfo";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Home: NextPage<{
  runtimeStats: any;
  successStats: any;
  repoConfig: ObjectLiteral;
}> = ({ runtimeStats, successStats, repoConfig }) => {
  useEffect(() => {
    console.log(successStats);
    console.log(runtimeStats);
  });

  const { org, repo, workflow, branch } = repoConfig;

  return (
    <div className={styles.container}>
      <Head>
        <title>GitHub Actions statistics</title>
        <meta
          name="description"
          content="Visualized statistics of GitHub Actions CI"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <RepoInfo org={org} repo={repo} workflow={workflow} branch={branch} />

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
                label: "Daily success rate",
                data: Object.keys(successStats)
                  .sort()
                  .map((key) => successStats[key].successRate),
                borderColor: "#c9e3c5",
              },
              {
                label: "7-day moving success rate",
                data: Object.keys(successStats)
                  .sort()
                  .map((key) => successStats[key].movingByDaySuccessRate.seven),
                borderColor: "#33a122",
              },
            ],
          }}
        />

        <p className={styles.description}>CI runtime (seconds) ↘</p>

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
                label: "Average",
                data: Object.keys(runtimeStats)
                  .sort()
                  .map((key) => runtimeStats[key].avgSuccessTime),
                borderColor: "#c7d3f0",
              },
              {
                label: "7-day moving average",
                data: Object.keys(runtimeStats)
                  .sort()
                  .map(
                    (key) => runtimeStats[key].movingByDayAvgSuccessTime.seven
                  ),
                borderColor: "#034efc",
              },
            ],
          }}
        />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://honeypot.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Honeypot
        </a>
      </footer>
    </div>
  );
};

const loadMockData = async () => {
  // Note that everything within data is loaded: https://stackoverflow.com/a/47956054/2771889
  const data = await import(`../data/${process.env.MOCK_DATA}`);
  return Array.from(data);
};

type Runs = ExtractPromiseType<ReturnType<typeof fectchRuns>>;

export const getStaticProps = async () => {
  const runs =
    process.env.USE_MOCK_DATA === "true"
      ? ((await loadMockData()) as Runs)
      : await fectchRuns();

  const sanitizedStats = groupByDay(runs);

  const successStats = removeRawRuns(
    addCalculatedSuccessRateStats(deepClone(sanitizedStats))
  );

  const runtimeStats = removeRawRuns(
    addCalculatedRuntimeStats(deepClone(sanitizedStats))
  );

  return {
    props: {
      runtimeStats,
      successStats,
      repoConfig: {
        org: process.env.REPO_ORG,
        repo: process.env.REPO_NAME,
        workflow: process.env.REPO_WORKFLOW,
        branch: process.env.REPO_BRANCH,
      },
    },
  };
};

export default Home;
