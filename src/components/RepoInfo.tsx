import type { NextPage } from "next";

import styles from "../../styles/Styles.module.css";

const RepoInfo: NextPage<{
  org: string;
  repo: string;
  workflow: string;
  branch: string;
}> = ({ org, repo, workflow, branch }) => {
  return (
    <h1 className={styles.title}>
      <code className={styles.code}>
        {org}/{repo} {workflow}@{branch}
      </code>
    </h1>
  );
};

export default RepoInfo;
