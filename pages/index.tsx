import type { NextPage } from "next";
import Head from "next/head";

import styles from "../styles/Styles.module.css";
import {
  groupByDay,
  removeRawRuns,
  addCalculatedSuccessRateStats,
  addCalculatedRuntimeStats,
} from "../src/utils/stats";
import { fectchRuns } from "../src/utils/github";
import { deepClone } from "../src/utils/js";
import RepoInfo from "../src/components/RepoInfo";
import SuccessRate from "../src/components/SuccessRate";
import Runtime from "../src/components/Runtime";

const Home: NextPage<{
  data: any[];
}> = ({ data }) => {
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
        {data.map((repoData, i) => {
          return (
            <div key={i}>
              <RepoInfo repoConfig={repoData.repoConfig} />
              <SuccessRate successStats={repoData.successStats} />
              <Runtime runtimeStats={repoData.runtimeStats} />
            </div>
          );
        })}
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
  const data = await Promise.all(
    JSON.parse(process.env.CONFIG as string).map(
      async (configEntry: ConfigEntry) => {
        const runs =
          process.env.USE_MOCK_DATA === "true"
            ? ((await loadMockData()) as Runs)
            : await fectchRuns(configEntry);
        const sanitizedStats = groupByDay(runs);
        const successStats = removeRawRuns(
          addCalculatedSuccessRateStats(deepClone(sanitizedStats))
        );
        const runtimeStats = removeRawRuns(
          addCalculatedRuntimeStats(deepClone(sanitizedStats))
        );

        return {
          repoConfig: configEntry,
          successStats,
          runtimeStats,
        };
      }
    )
  );

  return {
    props: {
      data,
    },
  };
};

export default Home;
