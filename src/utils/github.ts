import { Octokit } from "@octokit/rest";

export const fectchRuns = async (repoConfig: ConfigEntry) => {
  const octokit = new Octokit({
    auth: process.env.REPO_ACCESS_TOKEN,
  });

  const workflows = await octokit.rest.actions.listRepoWorkflows({
    owner: repoConfig.org,
    repo: repoConfig.repo,
  });

  const workflowId = workflows.data.workflows.find(
    (workflow) => workflow.name === repoConfig.workflow
  )?.id;

  if (!workflowId) throw "Workflow not found";

  return await octokit.paginate(octokit.actions.listWorkflowRuns, {
    owner: repoConfig.org,
    repo: repoConfig.repo,
    workflow_id: workflowId,
    per_page: 100,
    event: "push",
    branch: repoConfig.branch,
  });
};
