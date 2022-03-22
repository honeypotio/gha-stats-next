import type { NextPage } from "next";

import styles from "../../styles/Styles.module.css";

const RepoInfo: NextPage<{
  repoConfig: ConfigEntry;
}> = ({ repoConfig }) => {
  return (
    <h1 className={styles.title}>
      <code className={styles.code}>
        {repoConfig.org}/{repoConfig.repo} {repoConfig.workflow}@
        {repoConfig.branch}
      </code>
    </h1>
  );
};

export default RepoInfo;
