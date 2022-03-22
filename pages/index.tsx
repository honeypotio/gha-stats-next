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
  runtimeStats: any;
  successStats: any;
  repoConfig: ObjectLiteral;
}> = ({ runtimeStats, successStats, repoConfig }) => {
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
        <SuccessRate successStats={successStats} />
        <Runtime runtimeStats={runtimeStats} />
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
